export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { LessonStatusBadge } from '@/components/ui/Badge'
import type { LessonStatus } from '@prisma/client'

const TABS = [
  { label: '전체', value: 'all' },
  { label: '대기 중', value: 'pending' },
  { label: '확정', value: 'confirmed' },
  { label: '완료', value: 'completed' },
  { label: '취소', value: 'cancelled' },
]

const EMPTY_MESSAGES: Record<string, { heading: string; sub?: string }> = {
  all: { heading: '아직 수업 신청 내역이 없습니다', sub: '지금 바로 첫 수업을 신청해 보세요' },
  pending: { heading: '대기 중인 수업이 없습니다' },
  confirmed: { heading: '확정된 수업이 없습니다', sub: '신청서를 제출하면 강사 배정 후 확정됩니다' },
  completed: { heading: '완료된 수업이 없습니다' },
  cancelled: { heading: '취소된 수업이 없습니다' },
}

const SLOT_LABELS: Record<string, string> = {
  morning: '오전',
  afternoon: '오후',
  evening: '저녁',
}

interface PageProps {
  searchParams: { status?: string; page?: string }
}

export default async function LessonsPage({ searchParams }: PageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const status = searchParams.status ?? 'all'
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const limit = 20

  const where = {
    studentId: user.id,
    ...(status !== 'all' ? { status: status as LessonStatus } : {}),
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

  const totalPages = Math.ceil(total / limit)
  const empty = EMPTY_MESSAGES[status] ?? EMPTY_MESSAGES.all

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">내 수업</h1>
        <Link href="/lessons/new">
          <Button size="sm">새 수업 신청</Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {TABS.map((tab) => (
          <Link
            key={tab.value}
            href={`/lessons?status=${tab.value}`}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              status === tab.value
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:text-text'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Lesson list */}
      {lessons.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-3 text-center">
          <p className="text-lg font-semibold text-text">{empty.heading}</p>
          {empty.sub && <p className="text-sm text-text-muted">{empty.sub}</p>}
          {status === 'all' && (
            <Link href="/lessons/new">
              <Button className="mt-2">수업 신청하기</Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-text">
                      {lesson.preferredDate.toLocaleDateString('ko-KR')}
                    </p>
                    <span className="text-xs text-text-muted">
                      {SLOT_LABELS[lesson.preferredTimeSlot]} · {lesson.durationMinutes}분
                    </span>
                  </div>
                  {lesson.instructor && (
                    <p className="text-xs text-text-muted">강사: {lesson.instructor.name}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <LessonStatusBadge status={lesson.status} />
                  {lesson.status === 'confirmed' && lesson.teamsMeetingUrl && (
                    <a
                      href={lesson.teamsMeetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Teams 참가 →
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/lessons?status=${status}&page=${p}`}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    p === page
                      ? 'bg-primary text-white'
                      : 'bg-surface border border-border text-text-muted hover:bg-surface-hover'
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
