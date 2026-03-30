import { z } from 'zod'

const requiredText = z.string().trim().min(1)

export const experienceDraftSchema = z.object({
  role: z.object({ es: requiredText, en: requiredText }),
  company: z.object({ es: z.string(), en: z.string() }),
  project: z.object({ es: z.string(), en: z.string() }),
  bullets: z
    .array(z.object({ es: z.string(), en: z.string() }))
    .min(1, 'At least one bullet is required'),
  technologies: z.string(),
  from: z.string(),
  to: z.string(),
})

export const educationDraftSchema = z.object({
  title: z.object({ es: requiredText, en: requiredText }),
  center: z.object({ es: z.string(), en: z.string() }),
  from: z.string(),
  to: z.string(),
})

export const courseAppendSchema = z.object({
  title: requiredText,
  length: z.string(),
  author: z.string(),
})

export const courseDraftSchema = z
  .object({
    categoryIndex: requiredText,
    categoryEs: z.string(),
    categoryEn: z.string(),
    title: requiredText,
    length: z.string(),
    author: z.string(),
  })
  .superRefine((value, ctx) => {
    if (value.categoryIndex === 'new' && !value.categoryEs.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Category ES is required',
        path: ['categoryEs'],
      })
    }
    if (value.categoryIndex === 'new' && !value.categoryEn.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Category EN is required',
        path: ['categoryEn'],
      })
    }
  })
