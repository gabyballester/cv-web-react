import type { Locale } from '../domain/cv-schema'

export const labels = {
  es: {
    education: 'Formación',
    experience: 'Experiencia laboral',
    courses: 'Cursos destacados',
    languages: 'Idiomas',
    technologies: 'Tecnologías y herramientas',
    addExperience: 'Añadir experiencia',
    addEducation: 'Añadir formación',
    addCourse: 'Añadir curso',
    printPdf: 'Descargar PDF A4',
    profile: 'Perfil',
    manageExperiences: 'Gestionar experiencias',
    manageEducation: 'Gestionar formación',
    manageCourses: 'Gestionar cursos',
    edit: 'Editar',
    save: 'Guardar',
    cancel: 'Cancelar',
    close: 'Cerrar',
    comingSoon: 'Próximamente',
    duration: 'Duración',
  },
  en: {
    education: 'Education',
    experience: 'Work experience',
    courses: 'Highlighted courses',
    languages: 'Languages',
    technologies: 'Technologies and tools',
    addExperience: 'Add experience',
    addEducation: 'Add education',
    addCourse: 'Add course',
    printPdf: 'Download A4 PDF',
    profile: 'Profile',
    manageExperiences: 'Manage experiences',
    manageEducation: 'Manage education',
    manageCourses: 'Manage courses',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    comingSoon: 'Coming soon',
    duration: 'Length',
  },
} as const

export function t(locale: Locale) {
  return labels[locale]
}
