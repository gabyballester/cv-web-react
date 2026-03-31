import type { CvData } from '../../../domain/cv-schema'

function isCleverpySingle(exp: CvData['experiences'][number]): boolean {
  return (
    exp.kind === 'single' &&
    (exp.company.es.toLowerCase().includes('cleverpy') ||
      exp.company.en.toLowerCase().includes('cleverpy'))
  )
}

/** Página 2: Cleverpy/Idrica siempre el primer bloque al imprimir (mismo orden en `cvData` para el editor). */
export function orderSecondPageExperiencesForPrint(
  slice: CvData['experiences'],
): CvData['experiences'] {
  const i = slice.findIndex(isCleverpySingle)
  if (i <= 0) return slice
  const next = slice.slice()
  const [first] = next.splice(i, 1)
  return [first, ...next]
}
