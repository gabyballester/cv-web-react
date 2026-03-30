import { z } from 'zod'

const localizedTextSchema = z.object({
  es: z.string(),
  en: z.string(),
})

const periodSchema = z.object({
  from: z.string(),
  to: z.string(),
})

const experienceSchema = z.object({
  role: localizedTextSchema,
  company: localizedTextSchema,
  project: localizedTextSchema,
  period: periodSchema,
  location: localizedTextSchema,
  bullets: z.array(localizedTextSchema),
  technologies: z.array(z.string()),
})

const educationSchema = z.object({
  title: localizedTextSchema,
  center: localizedTextSchema,
  period: periodSchema,
})

const courseSchema = z.object({
  title: z.string(),
  length: z.string(),
  author: z.string(),
})

const courseCategorySchema = z.object({
  name: localizedTextSchema,
  items: z.array(courseSchema),
})

export const cvSchema = z.object({
  profile: z.object({
    name: z.string(),
    roleTag: z.string(),
    city: z.string(),
    phone: z.string(),
    email: z.string().email(),
    linkedin: z.string(),
    quotes: z.array(localizedTextSchema),
    languages: z.array(localizedTextSchema),
  }),
  education: z.array(educationSchema),
  experiences: z.array(experienceSchema),
  courses: z.array(courseCategorySchema),
})

export type CvData = z.infer<typeof cvSchema>
export type Locale = 'es' | 'en'
