'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { lessonRequestSchema } from '@/features/lessons/types'
import type { z } from 'zod'
import { useUI } from '@/store/ui'
import { getMinLessonDate } from '@/lib/utils'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

const LEVEL_OPTIONS = [
  { value: 'beginner', label: '초급' },
  { value: 'intermediate', label: '중급' },
  { value: 'advanced', label: '고급' },
]

type FormValues = z.input<typeof lessonRequestSchema>

export default function LessonRequestForm() {
  const router = useRouter()
  const addToast = useUI((s) => s.addToast)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(lessonRequestSchema),
    defaultValues: { duration_minutes: '60' },
  })

  const goalValue = watch('learning_goal') ?? ''
  const minDate = getMinLessonDate().toISOString().split('T')[0]

  const onSubmit = async (data: FormValues) => {
    const res = await fetch('/api/lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (!res.ok) {
      const msg = json.error ?? '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      addToast({ message: msg, variant: 'error', duration: 4000 })
      return
    }

    addToast({
      message: '수업 신청이 완료되었습니다. 강사 배정 후 안내드립니다.',
      variant: 'success',
      duration: 4000,
    })
    router.push('/lessons')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="희망 날짜"
        type="date"
        min={minDate}
        required
        error={errors.preferred_date?.message}
        {...register('preferred_date')}
      />

      {/* Time slot radio */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text">
          희망 시간대 <span className="text-error">*</span>
        </span>
        <div className="flex gap-4">
          {[
            { value: 'morning', label: '오전' },
            { value: 'afternoon', label: '오후' },
            { value: 'evening', label: '저녁' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" value={opt.value} className="accent-primary" {...register('preferred_time_slot')} />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.preferred_time_slot && <p className="text-xs text-error">{errors.preferred_time_slot.message}</p>}
      </div>

      {/* Duration radio */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-text">
          수업 시간 <span className="text-error">*</span>
        </span>
        <div className="flex gap-4">
          {[
            { value: '30', label: '30분' },
            { value: '60', label: '60분' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" value={opt.value} className="accent-primary" {...register('duration_minutes')} />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.duration_minutes && <p className="text-xs text-error">{errors.duration_minutes.message}</p>}
      </div>

      <Select
        label="영어 수준"
        required
        options={LEVEL_OPTIONS}
        placeholder="선택해 주세요"
        error={errors.english_level?.message}
        {...register('english_level')}
      />

      <Textarea
        label="이번 수업에서 집중하고 싶은 것은?"
        placeholder="예: 비즈니스 이메일 작성 연습을 하고 싶습니다."
        rows={4}
        required
        maxLength={500}
        value={goalValue}
        showCount
        error={errors.learning_goal?.message}
        {...register('learning_goal')}
      />

      <Textarea
        label="특이사항 (선택)"
        placeholder="강사에게 전달할 내용이 있으면 입력해 주세요."
        rows={3}
        maxLength={200}
        showCount
        error={errors.special_requests?.message}
        {...register('special_requests')}
      />

      <Button type="submit" loading={isSubmitting} className="w-full">
        {isSubmitting ? '' : '신청하기'}
      </Button>
    </form>
  )
}
