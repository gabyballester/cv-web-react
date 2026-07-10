import type { jsPDF as JsPdfType } from 'jspdf'

const MM_PER_INCH = 25.4
const CSS_REFERENCE_DPI = 96
const PDF_TARGET_DPI = 220
const JPEG_QUALITY = 0.94

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297
const A4_PADDING_TOP_MM = 8.5
const A4_PADDING_BOTTOM_MM = 11

const MM_TO_CSS_PX = CSS_REFERENCE_DPI / MM_PER_INCH
const A4_WIDTH_CSS_PX = Math.round(A4_WIDTH_MM * MM_TO_CSS_PX)
const A4_HEIGHT_CSS_PX = Math.round(A4_HEIGHT_MM * MM_TO_CSS_PX)
const A4_CONTENT_HEIGHT_CSS_PX = Math.round(
  (A4_HEIGHT_MM - A4_PADDING_TOP_MM - A4_PADDING_BOTTOM_MM) * MM_TO_CSS_PX,
)

const PDF_RENDER_SCALE = PDF_TARGET_DPI / CSS_REFERENCE_DPI

function applyPrintLikePageStyles(page: HTMLElement) {
  page.style.width = `${A4_WIDTH_CSS_PX}px`
  page.style.height = `${A4_HEIGHT_CSS_PX}px`
  page.style.minHeight = `${A4_HEIGHT_CSS_PX}px`
  page.style.maxHeight = `${A4_HEIGHT_CSS_PX}px`
  page.style.boxShadow = 'none'
  page.style.margin = '0'
  page.style.overflow = 'hidden'

  const grid = page.querySelector<HTMLElement>('.cv-grid')
  if (grid) {
    grid.style.height = `${A4_CONTENT_HEIGHT_CSS_PX}px`
    grid.style.maxHeight = `${A4_CONTENT_HEIGHT_CSS_PX}px`
  }
}

function addImageFullA4(pdf: JsPdfType, imgData: string) {
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()
  pdf.addImage(imgData, 'JPEG', 0, 0, pageW, pageH, undefined, 'FAST')
}

/**
 * Renders each `.a4-page` inside `paperStack` as one A4 PDF page and triggers download.
 * Captures at full A4 size (even on narrow viewports) with JPEG compression for a practical file size.
 */
export async function downloadCvPdf(paperStack: HTMLElement, filename: string) {
  const pages = paperStack.querySelectorAll<HTMLElement>('.a4-page')
  if (pages.length === 0) return

  if (document.fonts?.ready) {
    await document.fonts.ready.catch(() => undefined)
  }

  const { default: html2canvas } = await import('html2canvas')
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true })

  for (let i = 0; i < pages.length; i++) {
    const el = pages[i]
    const canvas = await html2canvas(el, {
      scale: PDF_RENDER_SCALE,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: A4_WIDTH_CSS_PX,
      height: A4_HEIGHT_CSS_PX,
      onclone: (_doc, clonedPage) => {
        applyPrintLikePageStyles(clonedPage)
      },
    })

    const imgData = canvas.toDataURL('image/jpeg', JPEG_QUALITY)

    if (i > 0) pdf.addPage()
    addImageFullA4(pdf, imgData)
  }

  pdf.save(filename)
}
