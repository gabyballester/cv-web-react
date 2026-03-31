import type { jsPDF as JsPdfType } from 'jspdf'

const A4_WIDTH_INCH = 8.27
const PDF_TARGET_DPI = 220
const MIN_RENDER_SCALE = 2
const MAX_RENDER_SCALE = 3
const JPEG_QUALITY = 0.94

function getPdfRenderScale(elementWidthPx: number) {
  if (elementWidthPx <= 0) return MIN_RENDER_SCALE
  const targetWidthPx = A4_WIDTH_INCH * PDF_TARGET_DPI
  const dpiScale = targetWidthPx / elementWidthPx
  const dprScale = typeof window !== 'undefined' ? (window.devicePixelRatio ?? 1) : 1
  return Math.min(MAX_RENDER_SCALE, Math.max(MIN_RENDER_SCALE, dpiScale, dprScale))
}

function addImageContainA4(
  pdf: JsPdfType,
  canvas: HTMLCanvasElement,
  imgData: string,
  mime: 'JPEG' | 'PNG',
) {
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()
  const imgRatio = canvas.width / canvas.height
  const pageRatio = pageW / pageH

  let drawW = pageW
  let drawH = pageH
  if (imgRatio > pageRatio) {
    drawH = pageW / imgRatio
  } else {
    drawW = pageH * imgRatio
  }

  const x = (pageW - drawW) / 2
  const y = (pageH - drawH) / 2
  pdf.addImage(imgData, mime, x, y, drawW, drawH)
}

/**
 * Renders each `.a4-page` inside `paperStack` as one A4 PDF page and triggers download.
 */
export async function downloadCvPdf(paperStack: HTMLElement, filename: string) {
  const pages = paperStack.querySelectorAll<HTMLElement>('.a4-page')
  if (pages.length === 0) return

  if (document.fonts?.ready) {
    await document.fonts.ready.catch(() => undefined)
  }

  const { default: html2canvas } = await import('html2canvas')
  // Lazy-load jsPDF to keep initial bundle lighter for normal CV viewing.
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })

  for (let i = 0; i < pages.length; i++) {
    const el = pages[i]
    const scale = getPdfRenderScale(el.offsetWidth)
    const canvas = await html2canvas(el, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: el.offsetWidth,
      height: el.offsetHeight,
    })

    // JPEG keeps file size practical while retaining good readability for A4 exports.
    const imgData = canvas.toDataURL('image/jpeg', JPEG_QUALITY)

    if (i > 0) pdf.addPage()
    addImageContainA4(pdf, canvas, imgData, 'JPEG')
  }

  pdf.save(filename)
}
