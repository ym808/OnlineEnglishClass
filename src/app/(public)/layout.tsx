import ToastContainer from '@/components/ui/Toast'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {children}
      <ToastContainer />
    </div>
  )
}
