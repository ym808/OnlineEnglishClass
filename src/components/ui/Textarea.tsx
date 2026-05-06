import { forwardRef, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  showCount?: boolean
  variant?: 'light' | 'dark'
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, showCount, id, value, maxLength, variant = 'dark', ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const current = typeof value === 'string' ? value.length : 0
    const isDark = variant === 'dark'

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className={cn('text-sm font-medium', isDark ? 'text-white/70' : 'text-text')}>
            {label}
            {props.required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={cn(
            'w-full rounded-xl border px-4 py-3 text-sm resize-none',
            'focus:outline-none focus:ring-2',
            isDark
              ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/60 focus:ring-blue-500/20'
              : 'bg-white border-border text-text placeholder:text-text-muted focus:border-primary focus:ring-primary/20',
            error && 'border-red-500/50',
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        <div className="flex justify-between">
          {error ? <p className="text-xs text-red-400">{error}</p> : <span />}
          {showCount && maxLength && (
            <p className={cn('text-xs', isDark ? 'text-white/30' : 'text-text-muted')}>{current}/{maxLength}</p>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea
