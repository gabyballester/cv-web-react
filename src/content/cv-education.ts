import type { CvData } from '../domain/cv-schema'
import { l, period } from './cv-content-helpers'

export const cvEducation = [
  {
    title: l("Bootcamp Full Stack JavaScript Developer", "Bootcamp Full Stack JavaScript Developer"),
    center: l("Geekshubs Academy (Grupo Alfatec), Valencia, España", "Geekshubs Academy (Grupo Alfatec), Valencia, Spain"),
    period: period("10/2018", "01/2019")
  },
  {
    title: l("Certificado de Profesionalidad (DAW)", "Professional Certificate (DAW)"),
    center: l("AULA CAMPUS, Burjassot (Valencia), España", "AULA CAMPUS, Burjassot (Valencia), Spain"),
    period: period("01/2018", "07/2018")
  },
  {
    title: l("Administración de Sistemas Informáticos (ASIR)", "Computer Systems Management (ASIR)"),
    center: l("IES Serpis, Valencia, España", "IES Serpis, Valencia, Spain"),
    period: period("09/2002", "04/2004")
  },
  {
    title: l("Técnico Superior Administrativo y Comercial (FP2)", "Administrative and Commercial Technician (FP2)"),
    center: l("IES Cabanyal, Valencia, España", "IES Cabanyal, Valencia, Spain"),
    period: period("09/1994", "06/1999")
  }
] satisfies CvData['education']
