import type { RefObject } from 'react'

/** Asset/UI flags for the printable read-only CV. */
export type CvDocumentActions = {
  printRef: RefObject<HTMLDivElement | null>
  photoSrc: string
  linkedInQrPath: string
  photoLoadError: boolean
  qrLoadError: boolean
  onPhotoError: () => void
  onQrError: () => void
}
