import editableCvData from '../content/cv-content.json'
import { cvSchema, type CvData } from './cv-schema'

// Fixed UI/runtime settings that are not part of editable CV content.
export const cvFixedConfig = {
  profilePhotoPath: '/profile-photo.jpg',
  linkedInQrPath: '/linkedin-qr.png',
  defaultLocale: 'es',
} as const

export const initialCvData: CvData = cvSchema.parse(editableCvData)
