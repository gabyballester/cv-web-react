import type { Locale } from '../domain/cv-schema'

export function localize(locale: Locale, value: { es: string; en: string }) {
  return value[locale]
}

/** For non-translatable fields stored in localized shape (company/client). */
export function stableText(value: { es: string; en: string }) {
  return value.es?.trim() || value.en?.trim() || ''
}

/** Normalizes open-ended period labels (e.g. Present ↔ Actualidad) for the active locale. */
export function localizePeriodToken(locale: Locale, value: string) {
  if (locale === 'es' && value === 'Present') return 'Actualidad'
  if (locale === 'en' && value === 'Actualidad') return 'Present'
  return value
}
