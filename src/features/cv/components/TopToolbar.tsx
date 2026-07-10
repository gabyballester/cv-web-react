import type { Locale } from '../../../domain/cv-schema'
import { t } from '../../../shared/ui-labels'
import './top-toolbar.css'

type Props = {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  onDownloadPdf: () => void | Promise<void>
  onPrintVectorPdf: () => void
  pdfExporting?: boolean
}

export function TopToolbar({
  locale,
  onLocaleChange,
  onDownloadPdf,
  onPrintVectorPdf,
  pdfExporting,
}: Props) {
  const labels = t(locale)
  const esClasses = ['toolbar-btn', locale === 'es' ? 'toolbar-btn--active' : ''].filter(Boolean).join(' ')
  const enClasses = ['toolbar-btn', locale === 'en' ? 'toolbar-btn--active' : ''].filter(Boolean).join(' ')

  return (
    <header className="toolbar no-print">
      <div className="toolbar-left">
        <button
          type="button"
          onClick={() => onLocaleChange('es')}
          className={esClasses}
          aria-pressed={locale === 'es'}
          aria-label={labels.changeLanguageToSpanish}
        >
          ES
        </button>
        <button
          type="button"
          onClick={() => onLocaleChange('en')}
          className={enClasses}
          aria-pressed={locale === 'en'}
          aria-label={labels.changeLanguageToEnglish}
        >
          EN
        </button>
      </div>
      <div className="toolbar-right">
        <button
          type="button"
          className="toolbar-btn"
          onClick={onPrintVectorPdf}
          disabled={pdfExporting}
        >
          {labels.printPdfVector}
        </button>
        <button
          type="button"
          className="toolbar-btn toolbar-btn--primary"
          onClick={() => void onDownloadPdf()}
          disabled={pdfExporting}
          aria-busy={pdfExporting}
        >
          {pdfExporting ? '…' : labels.printPdf}
        </button>
      </div>
    </header>
  )
}
