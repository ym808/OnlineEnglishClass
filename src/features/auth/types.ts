import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(1, '이름을 입력해 주세요.').max(50),
  email: z.string().email('올바른 이메일 형식을 입력해 주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.').max(128),
  confirmPassword: z.string(),
  phone: z.string().regex(/^01[0-9]-\d{3,4}-\d{4}$/, '올바른 전화번호 형식을 입력해 주세요.'),
  age_group: z.enum(['10s', '20s', '30s', '40s', '50plus'] as const),
  english_level: z.enum(['beginner', 'intermediate', 'advanced'] as const),
  learning_purpose: z
    .array(z.enum(['travel', 'business', 'study', 'daily', 'exam'] as const))
    .min(1, '학습 목적을 1개 이상 선택해 주세요.'),
}).refine((d) => d.password === d.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
})

export type SignupInput = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해 주세요.'),
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const instructorSignupSchema = z.object({
  token: z.string().min(1),
  name: z.string().min(1, '이름을 입력해 주세요.').max(50),
  email: z.string().email('올바른 이메일 형식을 입력해 주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.').max(128),
  confirmPassword: z.string(),
  nationality: z.string().min(1, '국적을 입력해 주세요.').max(50),
  native_language: z.string().min(1, '모국어를 입력해 주세요.').max(50),
  experience_years: z.coerce.number().int().min(0).max(50),
  specialties: z
    .array(z.enum(['business', 'ielts_toeic', 'conversation', 'kids', 'pronunciation'] as const))
    .min(1, '전문 분야를 1개 이상 선택해 주세요.'),
  bio: z.string().min(10, '자기소개를 10자 이상 입력해 주세요.').max(1000),
}).refine((d) => d.password === d.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
})

export type InstructorSignupInput = z.infer<typeof instructorSignupSchema>
