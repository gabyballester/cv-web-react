import { addDays, differenceInCalendarDays, endOfMonth, parse } from 'date-fns'
import type { CvData, SkillTenureKey } from '../domain/cv-schema'
import { isOpenPeriodEnd, periodMonthKey } from './date-utils'

type Interval = { start: Date; end: Date }

function parsePeriodStart(from: string): Date | null {
  if (!periodMonthKey(from)) return null
  return parse(from, 'MM/yyyy', new Date())
}

function parsePeriodEnd(to: string): Date | null {
  if (isOpenPeriodEnd(to)) return new Date()
  if (!periodMonthKey(to)) return null
  return endOfMonth(parse(to, 'MM/yyyy', new Date()))
}

function toInterval(from: string, to: string): Interval | null {
  const start = parsePeriodStart(from)
  const end = parsePeriodEnd(to)
  if (!start || !end || end < start) return null
  return { start, end }
}

function techNorm(technologies: string[]) {
  return technologies.map((t) => t.toLowerCase().trim())
}

function eachExperiencePosition(cv: CvData): Array<{ interval: Interval; tech: string[] }> {
  const out: Array<{ interval: Interval; tech: string[] }> = []
  for (const exp of cv.experiences) {
    if (exp.kind === 'grouped') {
      for (const p of exp.positions) {
        const interval = toInterval(p.period.from, p.period.to)
        if (interval) out.push({ interval, tech: techNorm(p.technologies) })
      }
    } else {
      const interval = toInterval(exp.period.from, exp.period.to)
      if (interval) out.push({ interval, tech: techNorm(exp.technologies) })
    }
  }
  return out
}

function hasReact(tech: string[]) {
  return tech.some((t) => t === 'react')
}

function hasVue(tech: string[]) {
  return tech.some((t) => t === 'vue' || t === 'vuejs' || t === 'vue.js')
}

function isFrontendStack(tech: string[]) {
  return hasReact(tech) || hasVue(tech)
}

function hasTypeScript(tech: string[]) {
  return tech.some((t) => t === 'typescript' || t === 'ts')
}

function hasTestingFrontend(tech: string[]) {
  const tests = tech.some(
    (t) => t === 'jest' || t.includes('testing library') || t === 'rtl' || t === 'enzyme',
  )
  return tests && isFrontendStack(tech)
}

function hasDesignSystems(tech: string[]) {
  return tech.some((t) => {
    if (t.includes('storybook')) return true
    if (t.includes('styled components')) return true
    if (t.includes('design system')) return true
    if (t.includes('ods open')) return true
    return false
  })
}

function hasScrumOrAgile(tech: string[]) {
  return tech.some((t) => t === 'scrum' || t === 'agile')
}

function hasGitWorkflow(tech: string[]) {
  return tech.some(
    (t) => t === 'git' || t.includes('bitbucket') || t.includes('github') || t === 'jenkins',
  )
}

function hasStateManagement(tech: string[]) {
  return tech.some((t) => t === 'redux' || t.includes('context') || t === 'vuex')
}

/** NestJS + Postman + Swagger (TMC / APIs). */
function hasRestApis(tech: string[]) {
  return tech.some((t) => t === 'nestjs' || t.includes('swagger') || t === 'postman')
}

function mergeIntervals(intervals: Interval[]): Interval[] {
  if (intervals.length === 0) return []
  const sorted = [...intervals].sort((a, b) => a.start.getTime() - b.start.getTime())
  const out: Interval[] = []
  let cur = sorted[0]
  for (let i = 1; i < sorted.length; i++) {
    const n = sorted[i]
    const curEndPlus = addDays(cur.end, 1)
    if (n.start.getTime() <= curEndPlus.getTime()) {
      cur = {
        start: cur.start,
        end: n.end > cur.end ? n.end : cur.end,
      }
    } else {
      out.push(cur)
      cur = n
    }
  }
  out.push(cur)
  return out
}

function yearsFromIntervals(intervals: Interval[]): number {
  const merged = mergeIntervals(intervals)
  const days = merged.reduce((sum, iv) => sum + differenceInCalendarDays(iv.end, iv.start) + 1, 0)
  return days / 365.25
}

function gatherIntervals(
  cv: CvData,
  predicate: (tech: string[]) => boolean,
): Interval[] {
  return eachExperiencePosition(cv)
    .filter((row) => predicate(row.tech))
    .map((row) => row.interval)
}

/** Business years in product-facing JavaScript roles (first frontend hire → today). */
export function computeJavascriptProductYears(cv: CvData): number {
  const start = parsePeriodStart(cv.header.frontendCareerSince)
  if (!start) return 0
  const end = new Date()
  if (end < start) return 0
  const days = differenceInCalendarDays(end, start) + 1
  return days / 365.25
}

export function computeTenureYears(key: SkillTenureKey, cv: CvData): number {
  switch (key) {
    case 'javascriptProduct':
      return computeJavascriptProductYears(cv)
    case 'typescript':
      return yearsFromIntervals(gatherIntervals(cv, hasTypeScript))
    case 'react':
      return yearsFromIntervals(gatherIntervals(cv, hasReact))
    case 'testingFrontend':
      return yearsFromIntervals(gatherIntervals(cv, hasTestingFrontend))
    case 'designSystems':
      return yearsFromIntervals(gatherIntervals(cv, hasDesignSystems))
    case 'scrumDelivery':
      return yearsFromIntervals(gatherIntervals(cv, hasScrumOrAgile))
    case 'gitWorkflow':
      return yearsFromIntervals(gatherIntervals(cv, hasGitWorkflow))
    case 'stateManagement':
      return yearsFromIntervals(gatherIntervals(cv, hasStateManagement))
    case 'restApis':
      return yearsFromIntervals(gatherIntervals(cv, hasRestApis))
  }
}

export function formatTenureYears(locale: 'es' | 'en', years: number): string {
  const y = Math.round(years * 10) / 10
  const isWhole = Math.abs(y - Math.round(y)) < 0.05
  const base = isWhole ? String(Math.round(y)) : locale === 'es' ? y.toFixed(1).replace('.', ',') : y.toFixed(1)
  if (locale === 'es') return `${base} años`
  return `${base} yrs`
}

/** Whole years for compact sidebar rows (e.g. contact / skills layout). */
export function formatTenureYearsWhole(locale: 'es' | 'en', years: number): string {
  const n = Math.max(0, Math.round(years))
  if (locale === 'es') return n === 1 ? '1 año' : `${n} años`
  return n === 1 ? '1 yr' : `${n} yrs`
}

