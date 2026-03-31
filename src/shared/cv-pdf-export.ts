import type { jsPDF as JsPdfType } from 'jspdf'

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
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: el.offsetWidth,
      height: el.offsetHeight,
    })

    const imgData = canvas.toDataURL('image/jpeg', 0.92)

    if (i > 0) pdf.addPage()
    addImageContainA4(pdf, canvas, imgData, 'JPEG')
  }

  pdf.save(filename)
}
