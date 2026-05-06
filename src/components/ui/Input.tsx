import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  variant?: 'light' | 'dark'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, variant = 'dark', ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const isDark = variant === 'dark'

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className={cn('text-sm font-medium', isDark ? 'text-white/70' : 'text-text')}>
            {label}
            {props.required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-xl border px-4 py-3 text-sm placeholder:transition-colors',
            'focus:outline-none focus:ring-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isDark
              ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/60 focus:ring-blue-500/20'
              : 'bg-white border-border text-text placeholder:text-text-muted focus:border-primary focus:ring-primary/20',
            error && (isDark
              ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20'
              : 'border-error focus:border-error focus:ring-error/20'),
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-400">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className={cn('text-xs', isDark ? 'text-white/40' : 'text-text-muted')}>
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
