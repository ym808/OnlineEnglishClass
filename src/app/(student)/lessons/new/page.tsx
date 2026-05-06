import LessonRequestForm from '@/features/lessons/components/LessonRequestForm'
import Card from '@/components/ui/Card'

export default function NewLessonPage() {
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">수업 신청</h1>
        <p className="text-sm text-text-muted mt-1">
          강사는 관리자가 배정합니다. 배정 완료 후 이메일로 안내드립니다.
        </p>
      </div>
      <Card>
        <LessonRequestForm />
      </Card>
    </div>
  )
}
