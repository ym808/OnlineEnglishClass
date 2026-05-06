import { forwardRef, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
  variant?: 'light' | 'dark'
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, variant = 'dark', ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const isDark = variant === 'dark'

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className={cn('text-sm font-medium', isDark ? 'text-white/70' : 'text-text')}>
            {label}
            {props.required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full rounded-xl border px-4 py-3 text-sm',
            'focus:outline-none focus:ring-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isDark
              ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/60 focus:ring-blue-500/20'
              : 'bg-white border-border text-text focus:border-primary focus:ring-primary/20',
            error && 'border-red-500/50',
            className
          )}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#1a2035]">
              {o.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
export default Select
