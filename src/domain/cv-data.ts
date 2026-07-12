import { cvContent } from '../content/cv-content'
import { publicAsset } from '../shared/public-asset'
import { cvSchema, type CvData } from './cv-schema'

// Fixed UI/runtime settings that are not part of editable CV content.
export const cvFixedConfig = {
  profilePhotoPath: publicAsset('profile-photo.jpg'),
  linkedInQrPath: publicAsset('linkedin-qr.png'),
  defaultLocale: 'es',
} as const

export const initialCvData: CvData = cvSchema.parse(cvContent)
