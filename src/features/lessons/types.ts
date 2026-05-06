import { z } from 'zod'

export const lessonRequestSchema = z.object({
  preferred_date: z.string().refine((val) => {
    const date = new Date(val)
    const minDate = new Date()
    minDate.setDate(minDate.getDate() + 2)
    minDate.setHours(0, 0, 0, 0)
    return date >= minDate
  }, '수업은 최소 48시간 전에 신청해 주세요.'),
  preferred_time_slot: z.enum(['morning', 'afternoon', 'evening'] as const),
  duration_minutes: z.string().refine((v) => v === '30' || v === '60', '수업 시간을 선택해 주세요.'),
  english_level: z.enum(['beginner', 'intermediate', 'advanced'] as const),
  learning_goal: z
    .string()
    .min(10, '학습 목표를 10자 이상 입력해 주세요.')
    .max(500, '500자 이내로 입력해 주세요.'),
  special_requests: z.string().max(200, '200자 이내로 입력해 주세요.').optional(),
})

export type LessonRequestInput = z.infer<typeof lessonRequestSchema>
