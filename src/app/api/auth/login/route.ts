import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@/features/auth/types'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = loginSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { email, password } = parsed.data
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return NextResponse.json(
      { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 }
    )
  }

  // Check user status
  const dbUser = await prisma.user.findUnique({ where: { id: data.user.id } })

  if (!dbUser) {
    return NextResponse.json({ error: '계정을 찾을 수 없습니다.' }, { status: 404 })
  }

  if (dbUser.status === 'pending') {
    await supabase.auth.signOut()
    return NextResponse.json(
      { error: '계정 승인 대기 중입니다. 승인 완료 후 다시 로그인해 주세요.' },
      { status: 403 }
    )
  }

  if (dbUser.status === 'suspended') {
    await supabase.auth.signOut()
    return NextResponse.json(
      { error: '가입이 반려되었습니다. 문의: support@speakbridge.io' },
      { status: 403 }
    )
  }

  const redirectMap: Record<string, string> = {
    student: '/dashboard',
    instructor: '/instructor/dashboard',
    admin: '/admin',
  }

  return NextResponse.json({
    user: data.user,
    role: dbUser.role,
    redirect: redirectMap[dbUser.role] ?? '/dashboard',
  })
}
