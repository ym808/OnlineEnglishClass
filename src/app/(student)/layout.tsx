export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import StudentHeader from '@/components/layout/StudentHeader'
import Footer from '@/components/layout/Footer'
import ToastContainer from '@/components/ui/Toast'

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!dbUser || dbUser.role !== 'student') redirect('/login')

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <StudentHeader userName={dbUser.name} />
      <main className="flex-1 max-w-content w-full mx-auto px-4 md:px-12 py-8">{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  )
}
