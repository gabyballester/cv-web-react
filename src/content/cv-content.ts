import type { CvData } from '../domain/cv-schema'
import { cvCourses } from './cv-courses'
import { cvEducation } from './cv-education'
import { cvExperiences } from './cv-experiences'
import { cvHeader } from './cv-header'

export const cvContent = {
  header: cvHeader,
  education: cvEducation,
  experiences: cvExperiences,
  courses: cvCourses,
} satisfies CvData
