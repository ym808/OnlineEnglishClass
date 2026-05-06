'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface StudentHeaderProps {
  userName?: string
}

export default function StudentHeader({ userName }: StudentHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-border">
      <div className="max-w-content mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold text-primary">
          SpeakBridge
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium text-text-muted hover:text-text transition-colors">
            대시보드
          </Link>
          <Link href="/lessons" className="text-sm font-medium text-text-muted hover:text-text transition-colors">
            내 수업
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3 relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center"
          >
            {userName?.[0]?.toUpperCase() ?? 'U'}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-44 bg-surface border border-border rounded-card shadow-lg py-1">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-text hover:bg-surface-hover"
                onClick={() => setDropdownOpen(false)}
              >
                프로필
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-text hover:bg-surface-hover"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text-muted"
          onClick={() => setDrawerOpen(true)}
          aria-label="메뉴 열기"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-surface shadow-xl flex flex-col p-6 gap-4">
            <button onClick={() => setDrawerOpen(false)} className="self-end text-text-muted">✕</button>
            <Link href="/dashboard" className="text-sm font-medium text-text" onClick={() => setDrawerOpen(false)}>대시보드</Link>
            <Link href="/lessons" className="text-sm font-medium text-text" onClick={() => setDrawerOpen(false)}>내 수업</Link>
            <Link href="/profile" className="text-sm font-medium text-text" onClick={() => setDrawerOpen(false)}>프로필</Link>
            <button onClick={handleLogout} className="text-left text-sm font-medium text-error">로그아웃</button>
          </div>
        </div>
      )}
    </header>
  )
}
