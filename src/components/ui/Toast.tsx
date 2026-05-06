'use client'

import { useEffect } from 'react'
import { useUI } from '@/store/ui'
import { cn } from '@/lib/utils'

const variantStyles = {
  success: 'bg-[#DCFCE7] border-success text-[#166534]',
  error: 'bg-[#FEE2E2] border-error text-[#991B1B]',
  warning: 'bg-[#FEF9C3] border-warning text-[#854D0E]',
  info: 'bg-[#DBEAFE] border-secondary text-[#1E40AF]',
}

function ToastItem({ id, message, variant, duration }: {
  id: string
  message: string
  variant: 'success' | 'error' | 'warning' | 'info'
  duration: number
}) {
  const removeToast = useUI((s) => s.removeToast)

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), duration)
    return () => clearTimeout(timer)
  }, [id, duration, removeToast])

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 min-w-[280px] max-w-sm rounded-lg border px-4 py-3 text-sm shadow-md',
        variantStyles[variant]
      )}
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={() => removeToast(id)}
        className="shrink-0 opacity-60 hover:opacity-100"
        aria-label="닫기"
      >
        ✕
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const toasts = useUI((s) => s.toasts)

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2" aria-label="알림">
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} />
      ))}
    </div>
  )
}
