export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { LessonStatusBadge } from '@/components/ui/Badge'
import { formatDateTime } from '@/lib/utils'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [dbUser, lessons] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.lesson.findMany({
      where: { studentId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { instructor: { select: { name: true } } },
    }),
  ])

  if (!dbUser) redirect('/login')

  const counts = {
    pending: lessons.filter((l) => l.status === 'pending').length,
    confirmed: lessons.filter((l) => l.status === 'confirmed').length,
    completed: lessons.filter((l) => l.status === 'completed').length,
  }

  const nextLesson = lessons.find((l) => l.status === 'confirmed')

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div>
        <h1 className="text-2xl font-bold text-text">안녕하세요, {dbUser.name}님!</h1>
        <p className="text-text-muted mt-1">오늘도 영어 실력을 키워보세요.</p>
      </div>

      {/* Next confirmed lesson */}
      {nextLesson ? (
        <Card className="border-l-4 border-l-primary">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">다음 수업</p>
              <p className="text-lg font-semibold text-text">
                {nextLesson.confirmedAt ? formatDateTime(nextLesson.confirmedAt) : '일정 미정'}
              </p>
              {nextLesson.instructor && (
                <p className="text-sm text-text-muted mt-0.5">강사: {nextLesson.instructor.name}</p>
              )}
            </div>
            {nextLesson.teamsMeetingUrl && (
              <a
                href={nextLesson.teamsMeetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
              >
                Teams 참가
              </a>
            )}
          </div>
        </Card>
      ) : null}

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '대기 중', count: counts.pending, status: 'pending' },
          { label: '확정', count: counts.confirmed, status: 'confirmed' },
          { label: '완료', count: counts.completed, status: 'completed' },
        ].map((item) => (
          <Link key={item.status} href={`/lessons?status=${item.status}`}>
            <Card hover className="text-center py-4">
              <p className="text-2xl font-bold text-text">{item.count}</p>
              <p className="text-sm text-text-muted mt-1">{item.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* CTA or lesson list */}
      {lessons.length === 0 ? (
        <Card className="flex flex-col items-center py-12 gap-4">
          <p className="text-lg font-semibold text-text">아직 신청한 수업이 없습니다.</p>
          <p className="text-sm text-text-muted">지금 바로 첫 수업을 신청해 보세요</p>
          <Button>
            <Link href="/lessons/new">첫 수업 신청하기</Link>
          </Button>
        </Card>
      ) : (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">최근 수업</h2>
          <Link href="/lessons/new">
            <Button size="sm">새 수업 신청하기</Button>
          </Link>
        </div>
      )}

      {/* Recent lessons */}
      {lessons.length > 0 && (
        <div className="space-y-3">
          {lessons.slice(0, 5).map((lesson) => (
            <Card key={lesson.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-text">
                  {lesson.preferredDate.toLocaleDateString('ko-KR')} ({lesson.preferredTimeSlot === 'morning' ? '오전' : lesson.preferredTimeSlot === 'afternoon' ? '오후' : '저녁'})
                </p>
                {lesson.instructor && (
                  <p className="text-xs text-text-muted">강사: {lesson.instructor.name}</p>
                )}
              </div>
              <LessonStatusBadge status={lesson.status} />
            </Card>
          ))}
          <div className="text-center pt-2">
            <Link href="/lessons" className="text-sm text-primary hover:underline">
              전체 수업 보기 →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
