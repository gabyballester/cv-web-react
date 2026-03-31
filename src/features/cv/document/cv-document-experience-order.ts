import type { CvData } from '../../../domain/cv-schema'

function isCleverpySingle(exp: CvData['experiences'][number]): boolean {
  return (
    exp.kind === 'single' &&
    (exp.company.es.toLowerCase().includes('cleverpy') ||
      exp.company.en.toLowerCase().includes('cleverpy'))
  )
}

/** Keep Cleverpy as first experience on page 2. */
export function orderSecondPageExperiencesForPrint(
  slice: CvData['experiences'],
): CvData['experiences'] {
  const i = slice.findIndex(isCleverpySingle)
  if (i <= 0) return slice
  const next = slice.slice()
  const [first] = next.splice(i, 1)
  return [first, ...next]
}
