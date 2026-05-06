import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Locale, translations } from '@/i18n/translations'

type Translation = (typeof translations)[Locale]

interface LanguageState {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translation
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      locale: 'ko',
      setLocale: (locale) => set({ locale, t: translations[locale] }),
      t: translations.ko,
    }),
    {
      name: 'speakbridge-language',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.t = translations[state.locale]
        }
      },
    }
  )
)

export function useT() {
  return useLanguage((s) => s.t)
}
