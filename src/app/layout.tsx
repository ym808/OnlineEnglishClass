import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SpeakBridge — 원어민 강사와 1:1 화상 영어',
  description: '수업 신청 한 번이면 끝. 강사 배정부터 Teams 링크까지 모두 알아서 보내드립니다.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
