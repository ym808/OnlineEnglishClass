'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useT } from '@/store/language'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

interface PublicHeaderProps {
  transparent?: boolean
}

export default function PublicHeader({ transparent = false }: PublicHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useT()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isTransparent = transparent && !scrolled

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isTransparent
          ? 'bg-transparent'
          : 'bg-[#0A0F1E]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
      )}
    >
      <div className="max-w-content mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">SpeakBridge</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <LanguageSwitcher variant="dark" />
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            {t.nav.login}
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-600 hover:to-violet-700 transition-all shadow-lg shadow-blue-500/25"
          >
            {t.nav.signup}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setDrawerOpen(true)}
          aria-label="메뉴 열기"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#0D1424] border-l border-white/10 flex flex-col p-6 gap-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">메뉴</span>
              <button onClick={() => setDrawerOpen(false)} className="text-white/60 hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <LanguageSwitcher variant="dark" />
            <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white py-2" onClick={() => setDrawerOpen(false)}>
              {t.nav.login}
            </Link>
            <Link
              href="/signup"
              className="flex items-center justify-center px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white"
              onClick={() => setDrawerOpen(false)}
            >
              {t.nav.signup}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
