'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import SignupForm from '@/features/auth/components/SignupForm'
import { useT } from '@/store/language'

export default function SignupPage() {
  const t = useT()

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-4 py-16">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold text-white">SpeakBridge</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">{t.signup.title}</h1>
          <p className="text-white/50">{t.signup.sub}</p>
        </div>

        {/* Form card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <SignupForm />
        </div>

        <p className="text-center mt-6 text-white/40 text-sm">
          {t.signup.hasAccount}{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            {t.signup.loginLink}
          </Link>
        </p>
      </div>
    </div>
  )
}
