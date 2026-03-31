import type { RefObject } from 'react'

/** Callbacks and asset/UI flags for the printable CV (everything except editable JSON + locale). */
export type CvDocumentActions = {
  printRef: RefObject<HTMLDivElement | null>
  photoSrc: string
  linkedInQrPath: string
  photoLoadError: boolean
  qrLoadError: boolean
  onPhotoError: () => void
  onQrError: () => void
  onOpenCourseModal: () => void
  onOpenEducationModal: () => void
  onOpenExperienceModal: () => void
  onEditCourse: (categoryIndex: number, itemIndex: number) => void
  onEditEducation: (index: number) => void
  onEditExperience: (globalIndex: number) => void
  onEditGroupedPosition: (globalIndex: number, positionIndex: number) => void
}
