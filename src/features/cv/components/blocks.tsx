import type { CvData, Locale } from '../../../domain/cv-schema'
import { localize } from '../../../shared/locale-utils'

export function ExperienceBlock({
  exp,
  locale,
  technologiesLabel,
  onEdit,
}: {
  exp: CvData['experiences'][number]
  locale: Locale
  technologiesLabel: string
  onEdit?: () => void
}) {
  return (
    <div className="item experience-item" key={`${exp.company.es}-${exp.period.from}`}>
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
      <div className="item-head">
        <strong>{localize(locale, exp.role)}</strong>
        <span>
          {exp.period.from} - {exp.period.to}
        </span>
      </div>
      <p className="meta">{localize(locale, exp.company)}</p>
      <p>{localize(locale, exp.project)}</p>
      <ul>
        {exp.bullets.map((b) => (
          <li key={b.es}>{localize(locale, b)}</li>
        ))}
      </ul>
      <p className="meta">
        {technologiesLabel}: {exp.technologies.join(' | ')}
      </p>
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
    <div className="item experience-item">
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
      <div className="item-head">
        <strong>{localize(locale, item.title)}</strong>
        <span>{item.period.from} - {item.period.to}</span>
      </div>
      <p>{localize(locale, item.center)}</p>
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
