import { NextRequest, NextResponse } from 'next/server'
import { signupSchema } from '@/features/auth/types'
import { createAdminClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

const ageGroupMap: Record<string, string> = {
  '10s': 's10s',
  '20s': 's20s',
  '30s': 's30s',
  '40s': 's40s',
  '50plus': 's50plus',
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = signupSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { name, email, password, phone, age_group, english_level, learning_purpose } = parsed.data

  const supabase = await createAdminClient()

  // Create Supabase auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { name, role: 'student' },
    email_confirm: true,
  })

  if (authError) {
    if (authError.message.includes('already registered') || authError.message.includes('already been registered')) {
      return NextResponse.json({ error: { email: '이미 가입된 이메일입니다.' } }, { status: 409 })
    }
    return NextResponse.json({ error: authError.message }, { status: 500 })
  }

  const userId = authData.user.id

  // Persist to our DB via Prisma
  try {
    await prisma.user.create({
      data: {
        id: userId,
        email,
        name,
        role: 'student',
        phone,
        status: 'active',
        studentProfile: {
          create: {
            ageGroup: ageGroupMap[age_group] as never,
            englishLevel: english_level as never,
            learningPurpose: learning_purpose,
          },
        },
      },
    })
  } catch (err) {
    // Rollback auth user if DB write fails
    await supabase.auth.admin.deleteUser(userId)
    console.error('DB write failed after auth create', err)
    return NextResponse.json({ error: '가입 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }

  // Sign in the new user to get a session
  const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (sessionError || !sessionData.session) {
    return NextResponse.json({ error: '가입은 완료되었습니다. 로그인 페이지에서 로그인해 주세요.' }, { status: 201 })
  }

  return NextResponse.json({ user: sessionData.user }, { status: 201 })
}
