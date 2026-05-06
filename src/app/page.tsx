'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import PublicHeader from '@/components/layout/PublicHeader'
import { useT } from '@/store/language'

const STATS = [
  { value: '50+', labelKey: 'instructors' as const },
  { value: '500+', labelKey: 'students' as const },
  { value: '2,000+', labelKey: 'lessons' as const },
  { value: '98%', labelKey: 'satisfaction' as const },
]

const STEPS = [
  { num: '01', icon: '👤', titleKey: 'step1Title' as const, descKey: 'step1Desc' as const },
  { num: '02', icon: '📝', titleKey: 'step2Title' as const, descKey: 'step2Desc' as const },
  { num: '03', icon: '🎓', titleKey: 'step3Title' as const, descKey: 'step3Desc' as const },
]

const FEATURES = [
  { icon: '🏆', titleKey: 'f1Title' as const, descKey: 'f1Desc' as const },
  { icon: '🗓️', titleKey: 'f2Title' as const, descKey: 'f2Desc' as const },
  { icon: '⚡', titleKey: 'f3Title' as const, descKey: 'f3Desc' as const },
  { icon: '🎯', titleKey: 'f4Title' as const, descKey: 'f4Desc' as const },
]

export default function LandingPage() {
  const t = useT()

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0F1E]">
      <PublicHeader transparent />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl" />
          </div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative z-10 max-w-content mx-auto px-4 md:px-12 pt-24 pb-20 text-center w-full">
            {/* Badge */}
            <div className="animate-fade-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/80 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {t.hero.badge}
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up-2 text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
              <span className="block">{t.hero.headline1}</span>
              <span className="block gradient-text animate-gradient bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400">
                {t.hero.headline2}
              </span>
              <span className="block">{t.hero.headline3}</span>
            </h1>

            {/* Subheadline */}
            <p className="animate-fade-up-3 text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
              {t.hero.sub}
            </p>

            {/* CTAs */}
            <div className="animate-fade-up-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-base hover:from-blue-600 hover:to-violet-700 transition-all shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
              >
                {t.hero.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl glass text-white font-medium text-base hover:bg-white/10 transition-all"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            {/* Floating cards */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {STATS.map((s, i) => (
                <div
                  key={s.labelKey}
                  className="glass-card rounded-2xl p-5 text-center"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <p className="text-3xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-white/50 mt-1">{t.stats[s.labelKey]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className="py-28 px-4 bg-[#080D1A]">
          <div className="max-w-content mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">Process</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.howItWorks.title}</h2>
              <p className="text-white/50 text-lg">{t.howItWorks.sub}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {STEPS.map((step, i) => (
                <div key={step.num} className="relative group">
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-blue-500/40 to-transparent z-0" style={{ width: 'calc(100% - 48px)', left: 'calc(100% - 24px)' }} />
                  )}
                  <div className="relative glass-card rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-blue-500/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center text-2xl">
                        {step.icon}
                      </div>
                      <span className="text-5xl font-black text-white/10">{step.num}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{t.howItWorks[step.titleKey]}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{t.howItWorks[step.descKey]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="py-28 px-4 bg-[#0A0F1E] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative max-w-content mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-3">Features</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">{t.features.title}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {FEATURES.map((f) => (
                <div
                  key={f.titleKey}
                  className="group glass-card rounded-3xl p-7 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10"
                >
                  <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{t.features[f.titleKey]}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{t.features[f.descKey]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials strip ── */}
        <section className="py-16 px-4 bg-[#080D1A] overflow-hidden">
          <div className="max-w-content mx-auto">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {[
                { name: 'Kim Jiyeon', flag: '🇰🇷', text: '비즈니스 영어 실력이 확실히 늘었어요. 강사님이 너무 친절해요!', rating: 5 },
                { name: 'Wang Fang', flag: '🇨🇳', text: '上课非常方便，老师很专业，推荐给所有想学英语的人！', rating: 5 },
                { name: 'Maria Santos', flag: '🇵🇭', text: 'The instructors are amazing and the Teams setup is so easy!', rating: 5 },
                { name: 'Park Minjun', flag: '🇰🇷', text: '토익 점수가 한 달 만에 85점 올랐습니다. 강추!', rating: 5 },
                { name: 'Chen Wei', flag: '🇨🇳', text: '预约系统很方便，老师准时，课程质量非常高。', rating: 5 },
              ].map((review, i) => (
                <div key={i} className="flex-shrink-0 w-72 glass-card rounded-2xl p-5">
                  <div className="flex mb-2">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <span key={j} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{review.flag}</span>
                    <span className="text-white/50 text-xs font-medium">{review.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="py-28 px-4 bg-[#0A0F1E] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.cta.title}</h2>
            <p className="text-white/50 text-lg mb-10">{t.cta.sub}</p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-lg hover:from-blue-600 hover:to-violet-700 transition-all shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              {t.cta.button}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#080D1A]">
        <div className="max-w-content mx-auto px-4 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="text-white/40 text-sm">{t.footer.copyright}</span>
          </div>
          <div className="flex gap-6">
            <a href="/terms" className="text-white/40 hover:text-white/70 text-sm transition-colors">{t.footer.terms}</a>
            <a href="/privacy" className="text-white/40 hover:text-white/70 text-sm transition-colors">{t.footer.privacy}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
