export const dynamic = 'force-dynamic'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-text">페이지를 찾을 수 없습니다</h1>
        <p className="mt-2 text-text-muted">요청하신 페이지가 존재하지 않습니다.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
