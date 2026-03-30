export type ExperienceDraft = {
  role: { es: string; en: string }
  company: { es: string; en: string }
  project: { es: string; en: string }
  bullets: Array<{ es: string; en: string }>
  technologies: string
  from: string
  to: string
}

export type EducationDraft = {
  title: { es: string; en: string }
  center: { es: string; en: string }
  from: string
  to: string
}

export type CourseDraft = {
  categoryIndex: string
  categoryEs: string
  categoryEn: string
  title: string
  length: string
  author: string
}

export type CourseAppendValues = Pick<CourseDraft, 'title' | 'length' | 'author'>
