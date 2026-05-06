'use client'

export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import LoginForm from '@/features/auth/components/LoginForm'
import Link from 'next/link'
import { useT } from '@/store/language'

export default function LoginPage() {
  const t = useT()

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-violet-900/40" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-white">SpeakBridge</span>
        </div>

        {/* Quote */}
        <div className="relative space-y-6">
          <blockquote className="text-3xl font-bold text-white leading-tight">
            &ldquo;{t.login.quote}&rdquo;
          </blockquote>
          <p className="text-white/50 text-lg leading-relaxed">
            {t.login.quoteSub}
          </p>
          <div className="flex items-center gap-4 pt-2">
            {['🇰🇷', '🇺🇸', '🇨🇳', '🇵🇭'].map((flag) => (
              <span key={flag} className="text-2xl">{flag}</span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 gap-4">
          {[
            { v: '50+', l: t.stats.instructors },
            { v: '500+', l: t.stats.students },
            { v: '98%', l: t.stats.satisfaction },
          ].map((s) => (
            <div key={s.l} className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-2xl font-black text-white">{s.v}</p>
              <p className="text-xs text-white/40 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-lg font-bold text-white">SpeakBridge</span>
        </Link>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{t.login.greeting}</h1>
            <p className="text-white/50">{t.login.greetingSub}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>

          <p className="text-center mt-6 text-white/40 text-sm">
            {t.login.noAccount}{' '}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              {t.login.signupLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
