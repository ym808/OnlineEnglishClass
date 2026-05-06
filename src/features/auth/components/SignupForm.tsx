'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signupSchema } from '@/features/auth/types'
import type { z } from 'zod'
import { useUI } from '@/store/ui'
import { useT } from '@/store/language'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'

type FormValues = z.input<typeof signupSchema>

export default function SignupForm() {
  const router = useRouter()
  const addToast = useUI((s) => s.addToast)
  const t = useT()

  const ageOptions = [
    { value: '10s', label: t.signup.age10s },
    { value: '20s', label: t.signup.age20s },
    { value: '30s', label: t.signup.age30s },
    { value: '40s', label: t.signup.age40s },
    { value: '50plus', label: t.signup.age50plus },
  ]

  const purposeOptions = [
    { value: 'travel', label: t.signup.purposeTravel },
    { value: 'business', label: t.signup.purposeBusiness },
    { value: 'study', label: t.signup.purposeStudy },
    { value: 'daily', label: t.signup.purposeDaily },
    { value: 'exam', label: t.signup.purposeExam },
  ]

  const levelOptions = [
    { value: 'beginner', label: t.signup.levelBeginner },
    { value: 'intermediate', label: t.signup.levelIntermediate },
    { value: 'advanced', label: t.signup.levelAdvanced },
  ]

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { learning_purpose: [] },
  })

  const onSubmit = async (data: FormValues) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (!res.ok) {
      if (json.error?.email) {
        setError('email', { message: json.error.email })
      } else {
        addToast({ message: t.signup.errorMessage, variant: 'error', duration: 4000 })
      }
      return
    }

    addToast({ message: t.signup.successMessage, variant: 'success', duration: 4000 })
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label={t.signup.nameLabel}
        placeholder={t.signup.namePlaceholder}
        required
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        label={t.signup.emailLabel}
        type="email"
        placeholder={t.signup.emailPlaceholder}
        required
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label={t.signup.passwordLabel}
        type="password"
        placeholder={t.signup.passwordPlaceholder}
        required
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        label={t.signup.confirmPasswordLabel}
        type="password"
        required
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Input
        label={t.signup.phoneLabel}
        placeholder={t.signup.phonePlaceholder}
        required
        error={errors.phone?.message}
        {...register('phone')}
      />
      <Select
        label={t.signup.ageGroupLabel}
        required
        options={ageOptions}
        placeholder={t.signup.ageGroupPlaceholder}
        error={errors.age_group?.message}
        {...register('age_group')}
      />

      {/* English level radio */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-white/70">
          {t.signup.englishLevelLabel} <span className="text-red-400">*</span>
        </span>
        <div className="flex gap-4">
          {levelOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer text-white/80">
              <input
                type="radio"
                value={opt.value}
                className="accent-blue-500"
                {...register('english_level')}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.english_level && <p className="text-xs text-red-400">{errors.english_level.message}</p>}
      </div>

      {/* Learning purpose checkboxes */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-white/70">
          {t.signup.learningPurposeLabel} <span className="text-red-400">*</span>
        </span>
        <div className="flex flex-wrap gap-3">
          {purposeOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer text-white/80">
              <input
                type="checkbox"
                value={opt.value}
                className="accent-blue-500"
                {...register('learning_purpose')}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.learning_purpose && (
          <p className="text-xs text-red-400">{errors.learning_purpose.message}</p>
        )}
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full">
        {isSubmitting ? '' : t.signup.button}
      </Button>
    </form>
  )
}
