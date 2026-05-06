'use client'

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-600 hover:to-violet-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-px active:scale-[0.98] disabled:opacity-60 disabled:shadow-none',
      secondary: 'bg-white/10 border border-white/20 text-white hover:bg-white/20 active:scale-[0.98]',
      ghost: 'bg-transparent text-white/60 hover:text-white hover:bg-white/10',
      danger: 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 active:scale-[0.98]',
    }

    const sizes = {
      sm: 'text-sm px-4 py-2 gap-1.5',
      md: 'text-sm px-6 py-3 gap-2',
      lg: 'text-base px-8 py-3.5 gap-2',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="sr-only">로딩 중</span>
          </>
        ) : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
