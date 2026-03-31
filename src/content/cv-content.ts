import type { CvData } from '../domain/cv-schema'
import { cvCourses } from './cv-courses'
import { cvEducation } from './cv-education'
import { cvExperiences } from './cv-experiences'
import { cvProfile } from './cv-profile'

export const cvContent = {
  profile: cvProfile,
  education: cvEducation,
  experiences: cvExperiences,
  courses: cvCourses,
} satisfies CvData
