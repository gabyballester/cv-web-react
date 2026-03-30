import type { Locale } from '../../../domain/cv-schema'
import { t } from '../../../shared/ui-labels'

type Props = {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  onPrint: () => void
}

export function TopToolbar({ locale, onLocaleChange, onPrint }: Props) {
  const labels = t(locale)
  return (
    <header className="toolbar no-print">
      <div className="toolbar-left">
        <button
          type="button"
          onClick={() => onLocaleChange('es')}
          className={locale === 'es' ? 'active' : ''}
        >
          ES
        </button>
        <button
          type="button"
          onClick={() => onLocaleChange('en')}
          className={locale === 'en' ? 'active' : ''}
        >
          EN
        </button>
      </div>
      <div className="toolbar-right">
        <button type="button" onClick={onPrint}>
          {labels.printPdf}
        </button>
      </div>
    </header>
  )
}
