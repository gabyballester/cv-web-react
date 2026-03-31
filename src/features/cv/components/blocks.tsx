import type { CvData, Locale } from '../../../domain/cv-schema'
import { isGroupedExperience } from '../../../domain/cv-schema'
import { groupedCompanyPeriodBounds } from '../../../shared/date-utils'
import { localize, stableText } from '../../../shared/locale-utils'
import { t } from '../../../shared/ui-labels'
import {
  ExperienceBulletList,
  ExperienceCompanyLocationRow,
  ExperienceGroupHeader,
  ExperienceGroupPositionBody,
  ExperienceProjectLine,
  ExperienceRoleDatesRow,
  ExperienceTechnologiesLine,
} from './ExperienceLayoutParts'

function isCompactRole(bullets: { es: string; en: string }[], technologies: string[]) {
  return bullets.length === 0 && technologies.length === 0
}

function isTasksPlaceholder(projectText: string) {
  const normalized = projectText
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\s*\/\s*/g, '/')
  return (
    normalized === 'funciones/tareas:' ||
    normalized === 'funciones / tareas:' ||
    normalized === 'functions/tasks:' ||
    normalized === 'functions / tasks:'
  )
}

function SingleExperienceBody({
  exp,
  locale,
  technologiesLabel,
  compact,
}: {
  exp: Extract<CvData['experiences'][number], { kind: 'single' }>
  locale: Locale
  technologiesLabel: string
  compact: boolean
}) {
  const labels = t(locale)
  const projectText = localize(locale, exp.project).trim()
  const clientText = exp.client ? stableText(exp.client) : ''
  const projectLabel = labels.project
  const clientLabel = labels.client
  const hasNoDetailLines = exp.bullets.length === 0 && exp.technologies.length === 0
  const hideProjectLine = isTasksPlaceholder(projectText) && exp.bullets.length > 0
  const showProjectLabel = !hasNoDetailLines
  return (
    <>
      <div className="experience-entry-head--tight">
        <ExperienceRoleDatesRow
          role={localize(locale, exp.role)}
          periodFrom={exp.period.from}
          periodTo={exp.period.to}
          locale={locale}
        />
        <ExperienceCompanyLocationRow
          companyText={stableText(exp.company)}
          locationText={localize(locale, exp.location)}
        />
      </div>
      {projectText && !hideProjectLine ? (
        <ExperienceProjectLine
          text={projectText}
          projectLabel={projectLabel}
          clientLabel={clientLabel}
          clientText={clientText}
          showProjectLabel={showProjectLabel}
          tight={compact}
        />
      ) : null}
      <ExperienceBulletList items={exp.bullets} locale={locale} />
      <ExperienceTechnologiesLine
        technologiesLabel={technologiesLabel}
        technologies={exp.technologies}
      />
    </>
  )
}

export function ExperienceBlock({
  exp,
  locale,
  technologiesLabel,
}: {
  exp: CvData['experiences'][number]
  locale: Locale
  technologiesLabel: string
}) {
  const labels = t(locale)
  if (isGroupedExperience(exp)) {
    const head = exp.positions[0]
    const companySpan = groupedCompanyPeriodBounds(exp.positions)
    return (
      <div className="item experience-group experience-item experience-entry">
        <ExperienceGroupHeader
          role={localize(locale, head.role)}
          periodFrom={companySpan.from}
          periodTo={companySpan.to}
          locale={locale}
          companyText={stableText(exp.company)}
          locationText={localize(locale, exp.location)}
        />
        <div
          className="experience-group-timeline"
          aria-label={labels.projectsAtCompany}
        >
          {exp.positions.map((pos) => {
            const rowCompact = isCompactRole(pos.bullets, pos.technologies)
            const projectText = localize(locale, pos.project).trim()
            const clientText = pos.client ? stableText(pos.client) : ''
            const projectLabel = labels.project
            const clientLabel = labels.client
            return (
              <div
                className={`experience-group-row${rowCompact ? ' experience-group-row--compact' : ''}`}
                key={`${pos.period.from}-${pos.project.es}`}
              >
                <div className="experience-group-body">
                  <ExperienceGroupPositionBody
                    pos={pos}
                    locale={locale}
                    technologiesLabel={technologiesLabel}
                    projectText={projectText}
                    projectLabel={projectLabel}
                    clientLabel={clientLabel}
                    clientText={clientText}
                    rowCompact={rowCompact}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const compact = isCompactRole(exp.bullets, exp.technologies)
  return (
    <div
      className={`item experience-item experience-entry${compact ? ' experience-entry--compact' : ''}`}
    >
      <SingleExperienceBody
        exp={exp}
        locale={locale}
        technologiesLabel={technologiesLabel}
        compact={compact}
      />
    </div>
  )
}

export function EducationBlock({
  item,
  locale,
}: {
  item: CvData['education'][number]
  locale: Locale
}) {
  return (
    <div className="item education-item">
      <div className="item-head education-head">
        <strong>{localize(locale, item.title)}</strong>
        <span>
          {item.period.from} - {item.period.to}
        </span>
      </div>
      <p className="education-center">{localize(locale, item.center)}</p>
    </div>
  )
}

export function CourseItem({
  title,
  durationLabel,
  length,
  author,
}: {
  title: string
  durationLabel: string
  length: string
  author: string
}) {
  return (
    <article className="course-item-wrap">
      <p className="course-item-title">{title}</p>
      <div className="course-item-meta-stack">
        <span className="course-item-author">{author}</span>
        <span className="course-item-duration">
          {durationLabel}: {length}
        </span>
      </div>
    </article>
  )
}
