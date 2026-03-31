import { create } from 'zustand'
import { initialCvData, cvFixedConfig } from '../domain/cv-data'
import type { CvData, Locale } from '../domain/cv-schema'

type CvStore = {
  cvData: CvData
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useCvStore = create<CvStore>((set) => ({
  cvData: initialCvData,
  locale: cvFixedConfig.defaultLocale as Locale,
  setLocale: (locale) => set({ locale }),
}))
