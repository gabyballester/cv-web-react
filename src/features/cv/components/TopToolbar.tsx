import type { Locale } from '../../../domain/cv-schema'
import { t } from '../../../shared/ui-labels'

type Props = {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  onDownloadPdf: () => void | Promise<void>
  pdfExporting?: boolean
}

export function TopToolbar({ locale, onLocaleChange, onDownloadPdf, pdfExporting }: Props) {
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
        <button type="button" onClick={() => void onDownloadPdf()} disabled={pdfExporting}>
          {pdfExporting ? '…' : labels.printPdf}
        </button>
      </div>
    </header>
  )
}
