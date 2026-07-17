/**
 * Industry workaround for html2canvas: it often fails to paint `<img src="*.svg">`
 * (only first colour band / solid blocks). Rasterize with the browser SVG engine
 * to PNG data URLs before capture, then restore.
 *
 * @see https://stackoverflow.com/questions/71170341/html2canvas-does-not-render-my-svg-element
 * @see modelscope/sirchmunk web/lib/pdfExport.ts (SVG → canvas → PNG replace)
 */

const DEFAULT_RASTER_SCALE = 4
const MIN_CSS_PX = 16

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'sync'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src.slice(0, 80)}`))
    img.src = src
  })
}

async function svgUrlToPngDataUrl(
  url: string,
  cssWidth: number,
  cssHeight: number,
  scale: number,
): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch SVG: ${url}`)
  const svgText = await res.text()
  const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
  const objectUrl = URL.createObjectURL(blob)

  try {
    const image = await loadImage(objectUrl)
    const w = Math.max(MIN_CSS_PX, Math.round(cssWidth * scale))
    const h = Math.max(MIN_CSS_PX, Math.round(cssHeight * scale))
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas 2D unavailable')
    ctx.drawImage(image, 0, 0, w, h)
    return canvas.toDataURL('image/png')
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

function isSvgImg(img: HTMLImageElement): boolean {
  const src = img.currentSrc || img.src || ''
  return /\.svg(\?|#|$)/i.test(src) || src.startsWith('data:image/svg+xml')
}

/**
 * Temporarily replaces SVG `<img>` sources under `root` with PNG data URLs.
 * Returns a restore function (always call in `finally`).
 */
export async function withSvgImgsRasterized(
  root: HTMLElement,
  options?: { scale?: number },
): Promise<() => void> {
  const scale = options?.scale ?? DEFAULT_RASTER_SCALE
  const imgs = [...root.querySelectorAll('img')].filter(isSvgImg)
  const restorers: Array<() => void> = []

  await Promise.all(
    imgs.map(async (img) => {
      const originalSrc = img.getAttribute('src') ?? img.src
      const cssW = img.clientWidth || img.width || MIN_CSS_PX
      const cssH = img.clientHeight || img.height || MIN_CSS_PX
      try {
        const png = await svgUrlToPngDataUrl(img.currentSrc || img.src, cssW, cssH, scale)
        img.src = png
        restorers.push(() => {
          img.src = originalSrc
        })
      } catch {
        // Keep original SVG; capture may still degrade this one asset.
      }
    }),
  )

  return () => {
    for (const restore of restorers) restore()
  }
}
