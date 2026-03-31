import type { CvData } from '../../../domain/cv-schema'

/** One course category block from CV JSON */
export type CourseCategory = CvData['courses'][number]

/** Localized UI strings for the CV document (same shape as `t(locale)`). */
export type UiLabels = (typeof import('../../../shared/ui-labels').labels)[keyof typeof import('../../../shared/ui-labels').labels]
