import { create } from 'zustand'
import { initialCvData, cvFixedConfig } from '../domain/cv-data'
import type { CvData, Locale } from '../domain/cv-schema'

type CvStore = {
  cvData: CvData
  locale: Locale
  setCvData: (next: CvData | ((prev: CvData) => CvData)) => void
  setLocale: (locale: Locale) => void
}

export const useCvStore = create<CvStore>((set) => ({
  cvData: initialCvData,
  locale: cvFixedConfig.defaultLocale as Locale,
  setCvData: (next) =>
    set((s) => ({
      cvData: typeof next === 'function' ? (next as (p: CvData) => CvData)(s.cvData) : next,
    })),
  setLocale: (locale) => set({ locale }),
}))
