'use client'

import { useState, useRef, useEffect } from 'react'
import { LOCALES } from '@/i18n/translations'
import { useLanguage } from '@/store/language'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark'
}

export default function LanguageSwitcher({ variant = 'light' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
          variant === 'dark'
            ? 'text-white/80 hover:text-white hover:bg-white/10'
            : 'text-text-muted hover:text-text hover:bg-surface-hover border border-border'
        )}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <svg className={cn('w-3 h-3 transition-transform', open && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-36 bg-surface border border-border rounded-xl shadow-xl overflow-hidden z-50">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLocale(l.code); setOpen(false) }}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors',
                locale === l.code
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-text hover:bg-surface-hover'
              )}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
              {locale === l.code && (
                <svg className="ml-auto w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
