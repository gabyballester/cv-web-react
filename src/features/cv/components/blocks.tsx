import type { CvData, Locale } from '../../../domain/cv-schema'
import { isGroupedExperience } from '../../../domain/cv-schema'
import { groupedCompanyPeriodBounds } from '../../../shared/date-utils'
import { localize } from '../../../shared/locale-utils'
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
  const projectText = localize(locale, exp.project).trim()
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
          companyText={localize(locale, exp.company)}
          locationText={localize(locale, exp.location)}
        />
      </div>
      {projectText ? <ExperienceProjectLine text={projectText} tight={compact} /> : null}
      <ExperienceBulletList items={exp.bullets} locale={locale} />
      <ExperienceTechnologiesLine technologiesLabel={technologiesLabel} technologies={exp.technologies} />
    </>
  )
}

export function ExperienceBlock({
  exp,
  locale,
  technologiesLabel,
  onEdit,
  onEditGroupedPosition,
}: {
  exp: CvData['experiences'][number]
  locale: Locale
  technologiesLabel: string
  onEdit?: () => void
  onEditGroupedPosition?: (positionIndex: number) => void
}) {
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
          companyText={localize(locale, exp.company)}
          locationText={localize(locale, exp.location)}
        />
        <div
          className="experience-group-timeline"
          aria-label={locale === 'es' ? 'Proyectos en la misma empresa' : 'Projects at the same company'}
        >
          {exp.positions.map((pos, positionIndex) => {
            const rowCompact = isCompactRole(pos.bullets, pos.technologies)
            const projectText = localize(locale, pos.project).trim()
            const showConnector = positionIndex < exp.positions.length - 1
            return (
              <div
                className={`experience-group-row${rowCompact ? ' experience-group-row--compact' : ''}`}
                key={`${pos.period.from}-${pos.project.es}`}
              >
                <div className="experience-group-body">
                  {onEditGroupedPosition ? (
                    <button
                      type="button"
                      className="edit-chip no-print"
                      onClick={() => onEditGroupedPosition(positionIndex)}
                      aria-label="Edit position"
                    >
                      ✎
                    </button>
                  ) : null}
                  <ExperienceGroupPositionBody
                    pos={pos}
                    locale={locale}
                    technologiesLabel={technologiesLabel}
                    projectText={projectText}
                    rowCompact={rowCompact}
                    showConnector={showConnector}
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
      {onEdit ? (
        <button
          type="button"
          className="edit-chip no-print"
          onClick={onEdit}
          aria-label="Edit experience"
        >
          ✎
        </button>
      ) : null}
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
  onEdit,
}: {
  item: CvData['education'][number]
  locale: Locale
  onEdit?: () => void
}) {
  return (
    <div className="item education-item">
      {onEdit ? (
        <button
          type="button"
          className="edit-chip no-print"
          onClick={onEdit}
          aria-label="Edit education"
        >
          ✎
        </button>
      ) : null}
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
  onEdit,
}: {
  title: string
  durationLabel: string
  length: string
  author: string
  onEdit?: () => void
}) {
  return (
    <article className="course-item-wrap">
      {onEdit ? (
        <button
          type="button"
          className="edit-chip no-print course-edit-chip"
          onClick={onEdit}
          aria-label="Edit course"
        >
          ✎
        </button>
      ) : null}
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
