import { z } from 'zod'

const localizedTextSchema = z.object({
  es: z.string(),
  en: z.string(),
})

const periodSchema = z.object({
  from: z.string(),
  to: z.string(),
})

export const experiencePositionSchema = z.object({
  role: localizedTextSchema,
  project: localizedTextSchema,
  client: localizedTextSchema.optional(),
  period: periodSchema,
  bullets: z.array(localizedTextSchema),
  technologies: z.array(z.string()),
})

const experienceSingleSchema = z.object({
  kind: z.literal('single'),
  role: localizedTextSchema,
  company: localizedTextSchema,
  project: localizedTextSchema,
  client: localizedTextSchema.optional(),
  period: periodSchema,
  location: localizedTextSchema,
  bullets: z.array(localizedTextSchema),
  technologies: z.array(z.string()),
})

const experienceGroupedSchema = z.object({
  kind: z.literal('grouped'),
  company: localizedTextSchema,
  location: localizedTextSchema,
  positions: z.array(experiencePositionSchema).min(1),
})

export const experienceSchema = z.discriminatedUnion('kind', [
  experienceGroupedSchema,
  experienceSingleSchema,
])

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

export const skillProfileIconSchema = z.enum([
  'javascript',
  'react',
  'typescript',
  'testing',
  'uiSystems',
  'agile',
  'git',
  'state',
  'api',
])

export const skillTenureKeySchema = z.enum([
  /** From `frontendCareerSince` through today (continuous product-facing JS career). */
  'javascriptProduct',
  /** Union of roles where technologies list TypeScript. */
  'typescript',
  /** Union of roles where technologies list React. */
  'react',
  /** Jest / RTL / Enzyme on frontend (React or Vue) stacks. */
  'testingFrontend',
  /** Storybook, styled-components, design systems, ODS, etc. */
  'designSystems',
  /** Technologies list Scrum or Agile. */
  'scrumDelivery',
  /** Git, GitHub, Bitbucket, Jenkins (version control & CI). */
  'gitWorkflow',
  /** Redux, Context API, Vuex. */
  'stateManagement',
  /** NestJS, Swagger, Postman (según tecnologías declaradas en experiencias). */
  'restApis',
])

const skillProfileEntrySchema = z.object({
  label: localizedTextSchema,
  /** Optional longer copy (not shown in compact CV layout). */
  tagline: localizedTextSchema.optional(),
  tenureKey: skillTenureKeySchema,
  icon: skillProfileIconSchema,
})

export const cvSchema = z.object({
  profile: z.object({
    name: z.string(),
    roleTag: z.string(),
    /** First professional frontend role (MM/yyyy) — used for JS tenure and quote templates. */
    frontendCareerSince: z.string(),
    city: z.string(),
    phone: z.string(),
    email: z.string().email(),
    linkedin: z.string(),
    quotes: z.array(localizedTextSchema),
    languages: z.array(localizedTextSchema),
    skillProfile: z.array(skillProfileEntrySchema).default([]),
  }),
  education: z.array(educationSchema),
  experiences: z.array(experienceSchema),
  courses: z.array(courseCategorySchema),
})

export type CvData = z.infer<typeof cvSchema>
export type SkillProfileEntry = CvData['profile']['skillProfile'][number]
export type SkillTenureKey = z.infer<typeof skillTenureKeySchema>
export type ExperienceGrouped = z.infer<typeof experienceGroupedSchema>
export type ExperienceSingle = z.infer<typeof experienceSingleSchema>
export type ExperiencePosition = z.infer<typeof experiencePositionSchema>
export type Locale = 'es' | 'en'

export function isGroupedExperience(exp: CvData['experiences'][number]): exp is ExperienceGrouped {
  return exp.kind === 'grouped'
}
