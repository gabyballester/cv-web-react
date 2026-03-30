import type { CvData, Locale } from '../../../domain/cv-schema'
import { isGroupedExperience } from '../../../domain/cv-schema'
import { groupedCompanyPeriodBounds } from '../../../shared/date-utils'
import { localize } from '../../../shared/locale-utils'

function localizePeriodToken(locale: Locale, value: string) {
  if (locale === 'es' && value === 'Present') return 'Actualidad'
  if (locale === 'en' && value === 'Actualidad') return 'Present'
  return value
}

function SingleExperienceBody({
  exp,
  locale,
  technologiesLabel,
}: {
  exp: Extract<CvData['experiences'][number], { kind: 'single' }>
  locale: Locale
  technologiesLabel: string
}) {
  return (
    <>
      <div className="item-head">
        <strong>{localize(locale, exp.role)}</strong>
        <span>
          {exp.period.from} - {localizePeriodToken(locale, exp.period.to)}
        </span>
      </div>
      <p className="meta experience-company-lines">{localize(locale, exp.company)}</p>
      <p className="experience-project-line">{localize(locale, exp.project)}</p>
      {exp.bullets.length > 0 ? (
        <ul>
          {exp.bullets.map((b) => (
            <li key={b.es}>{localize(locale, b)}</li>
          ))}
        </ul>
      ) : null}
      {exp.technologies.length > 0 ? (
        <p className="meta">
          {technologiesLabel}: {exp.technologies.join(' | ')}
        </p>
      ) : null}
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
        <div className="experience-group-header">
          <div className="item-head">
            <strong>{localize(locale, head.role)}</strong>
            <span>
              {companySpan.from} - {localizePeriodToken(locale, companySpan.to)}
            </span>
          </div>
          <p className="meta experience-group-company">{localize(locale, exp.company)}</p>
          <p className="meta experience-group-location">{localize(locale, exp.location)}</p>
        </div>
        <div className="experience-group-timeline" aria-label="Roles at company">
          {exp.positions.map((pos, positionIndex) => (
            <div className="experience-group-row" key={`${pos.period.from}-${pos.project.es}`}>
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
                <div className="item-head experience-group-project-row">
                  <p className="experience-group-project">{localize(locale, pos.project)}</p>
                  <span>
                    {pos.period.from} - {localizePeriodToken(locale, pos.period.to)}
                  </span>
                </div>
                {pos.bullets.length > 0 ? (
                  <ul>
                    {pos.bullets.map((b) => (
                      <li key={b.es}>{localize(locale, b)}</li>
                    ))}
                  </ul>
                ) : null}
                {pos.technologies.length > 0 ? (
                  <p className="meta">
                    {technologiesLabel}: {pos.technologies.join(' | ')}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="item experience-item experience-entry">
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
      <SingleExperienceBody exp={exp} locale={locale} technologiesLabel={technologiesLabel} />
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
      <p className="course-item-meta">
        <span className="course-meta-label">{durationLabel}:</span> {length}
      </p>
      <p className="course-item-author">{author}</p>
    </article>
  )
}
