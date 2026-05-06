'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { loginSchema, LoginInput } from '@/features/auth/types'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { useT } from '@/store/language'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams?.get('redirect')
  const [serverError, setServerError] = useState('')
  const t = useT()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setServerError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (!res.ok) {
      setServerError(json.error ?? t.login.error)
      return
    }

    router.push(redirect ?? json.redirect ?? '/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="rounded-lg bg-red-500/20 border border-red-500/30 px-4 py-3 text-sm text-red-400">
          {serverError}
        </div>
      )}

      <Input
        label={t.login.email}
        type="email"
        placeholder={t.login.emailPlaceholder}
        required
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label={t.login.password}
        type="password"
        placeholder={t.login.passwordPlaceholder}
        required
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" loading={isSubmitting} className="w-full">
        {isSubmitting ? '' : t.login.button}
      </Button>
    </form>
  )
}
