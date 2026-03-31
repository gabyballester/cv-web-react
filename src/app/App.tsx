import { useCallback, useRef, useState } from 'react'
import { CvDocument } from '../features/cv/document/CvDocument'
import { TopToolbar } from '../features/cv/components/TopToolbar'
import { cvFixedConfig } from '../domain/cv-data'
import { useCvStore } from '../stores/cv-store'
import { downloadCvPdf } from '../shared/cv-pdf-export'
import './App.css'

function App() {
  const locale = useCvStore((s) => s.locale)
  const setLocale = useCvStore((s) => s.setLocale)
  const [photoLoadError, setPhotoLoadError] = useState(false)
  const [qrLoadError, setQrLoadError] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)
  const [pdfExporting, setPdfExporting] = useState(false)
  const pdfBusyRef = useRef(false)

  const handleDownloadPdf = useCallback(async () => {
    if (!printRef.current || pdfBusyRef.current) return
    pdfBusyRef.current = true
    setPdfExporting(true)
    try {
      await downloadCvPdf(printRef.current, `cv-gabriel-ballester-${locale}.pdf`)
    } finally {
      pdfBusyRef.current = false
      setPdfExporting(false)
    }
  }, [locale])

  return (
    <div className="app">
      <TopToolbar
        locale={locale}
        onLocaleChange={setLocale}
        onDownloadPdf={handleDownloadPdf}
        pdfExporting={pdfExporting}
      />

      <main className="layout">
        <CvDocument
          printRef={printRef}
          photoSrc={cvFixedConfig.profilePhotoPath}
          linkedInQrPath={cvFixedConfig.linkedInQrPath}
          photoLoadError={photoLoadError}
          qrLoadError={qrLoadError}
          onPhotoError={() => setPhotoLoadError(true)}
          onQrError={() => setQrLoadError(true)}
        />
      </main>
    </div>
  )
}

export default App
