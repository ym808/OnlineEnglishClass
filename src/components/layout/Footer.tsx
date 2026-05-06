export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="max-w-content mx-auto px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-text-muted">
        <span>© 2026 SpeakBridge. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="/terms" className="hover:text-text transition-colors">이용약관</a>
          <a href="/privacy" className="hover:text-text transition-colors">개인정보처리방침</a>
        </div>
      </div>
    </footer>
  )
}
