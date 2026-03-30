import type { Locale } from '../domain/cv-schema'

export function localize(locale: Locale, value: { es: string; en: string }) {
  return value[locale]
}
