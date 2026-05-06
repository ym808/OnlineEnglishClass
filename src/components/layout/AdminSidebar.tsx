'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: '개요', icon: '📊' },
  { href: '/admin/members', label: '회원 관리', icon: '👥' },
  { href: '/admin/instructors', label: '강사 관리', icon: '👨‍🏫' },
  { href: '/admin/bookings', label: '예약 관리', icon: '📅' },
  { href: '/admin/invite', label: '초대 링크', icon: '🔗' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-surface border-r border-border flex flex-col z-30">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <span className="text-lg font-bold text-primary">SpeakBridge</span>
        <span className="ml-2 text-xs text-text-muted font-medium">Admin</span>
      </div>

      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && (pathname ?? '').startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:bg-surface-hover hover:text-text'
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full text-left text-sm text-text-muted hover:text-error transition-colors px-3 py-2"
        >
          로그아웃
        </button>
      </div>
    </aside>
  )
}
