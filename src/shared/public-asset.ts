/** Public folder path that respects Vite `base` (e.g. GitHub Pages project subpath). */
export function publicAsset(path: string) {
  const normalized = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${normalized}`
}
