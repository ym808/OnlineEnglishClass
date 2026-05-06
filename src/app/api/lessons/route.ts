import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { lessonRequestSchema } from '@/features/lessons/types'
import type { LessonStatus } from '@prisma/client'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = request.nextUrl
  const status = searchParams.get('status')
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = parseInt(searchParams.get('limit') ?? '20', 10)

  const where = {
    studentId: user.id,
    ...(status ? { status: status as LessonStatus } : {}),
  }

  const [lessons, total] = await Promise.all([
    prisma.lesson.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: { instructor: { select: { name: true } } },
    }),
    prisma.lesson.count({ where }),
  ])

  return NextResponse.json({ lessons, total })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = lessonRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { preferred_date, preferred_time_slot, duration_minutes: durationStr, english_level, learning_goal, special_requests } = parsed.data
  const duration_minutes = parseInt(durationStr, 10)

  // Max 3 pending lessons
  const pendingCount = await prisma.lesson.count({
    where: { studentId: user.id, status: 'pending' },
  })

  if (pendingCount >= 3) {
    return NextResponse.json(
      { error: '현재 대기 중인 신청이 3건입니다. 처리 후 추가 신청이 가능합니다.' },
      { status: 422 }
    )
  }

  const lesson = await prisma.lesson.create({
    data: {
      studentId: user.id,
      preferredDate: new Date(preferred_date),
      preferredTimeSlot: preferred_time_slot as never,
      durationMinutes: duration_minutes,
      englishLevel: english_level as never,
      learningGoal: learning_goal,
      specialRequests: special_requests,
      status: 'pending',
    },
  })

  // TODO: send admin notification email via Resend

  return NextResponse.json({ lesson }, { status: 201 })
}
