import type { CvData, Locale } from '../../../domain/cv-schema'
import { t } from '../../../shared/ui-labels'
import { localize } from '../../../shared/locale-utils'

type ExperienceDraft = {
  role: { es: string; en: string }
  company: { es: string; en: string }
  project: { es: string; en: string }
  bullet: { es: string; en: string }
  technologies: string
  from: string
  to: string
}

type EducationDraft = {
  title: { es: string; en: string }
  center: { es: string; en: string }
  from: string
  to: string
}

type CourseDraft = {
  categoryIndex: string
  categoryEs: string
  categoryEn: string
  title: string
  length: string
  author: string
}

export function ExperienceModal({
  locale,
  title,
  draft,
  onDraftChange,
  onClose,
  onSave,
  saveLabel,
}: {
  locale: Locale
  title: string
  draft: ExperienceDraft
  onDraftChange: (next: ExperienceDraft) => void
  onClose: () => void
  onSave: () => void
  saveLabel: string
}) {
  const labels = t(locale)
  return (
    <div className="modal-overlay no-print" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{title}</h3>
          <button type="button" onClick={onClose}>
            {labels.close}
          </button>
        </div>
        <div className="modal-form">
          <input
            placeholder="Role ES"
            value={draft.role.es}
            onChange={(e) =>
              onDraftChange({ ...draft, role: { ...draft.role, es: e.target.value } })
            }
          />
          <input
            placeholder="Role EN"
            value={draft.role.en}
            onChange={(e) =>
              onDraftChange({ ...draft, role: { ...draft.role, en: e.target.value } })
            }
          />
          <input
            placeholder="Company ES"
            value={draft.company.es}
            onChange={(e) =>
              onDraftChange({ ...draft, company: { ...draft.company, es: e.target.value } })
            }
          />
          <input
            placeholder="Company EN"
            value={draft.company.en}
            onChange={(e) =>
              onDraftChange({ ...draft, company: { ...draft.company, en: e.target.value } })
            }
          />
          <input
            placeholder="Project ES"
            value={draft.project.es}
            onChange={(e) =>
              onDraftChange({ ...draft, project: { ...draft.project, es: e.target.value } })
            }
          />
          <input
            placeholder="Project EN"
            value={draft.project.en}
            onChange={(e) =>
              onDraftChange({ ...draft, project: { ...draft.project, en: e.target.value } })
            }
          />
          <textarea
            placeholder="Bullet ES"
            value={draft.bullet.es}
            onChange={(e) =>
              onDraftChange({ ...draft, bullet: { ...draft.bullet, es: e.target.value } })
            }
          />
          <textarea
            placeholder="Bullet EN"
            value={draft.bullet.en}
            onChange={(e) =>
              onDraftChange({ ...draft, bullet: { ...draft.bullet, en: e.target.value } })
            }
          />
          <input
            placeholder="Tech comma separated"
            value={draft.technologies}
            onChange={(e) => onDraftChange({ ...draft, technologies: e.target.value })}
          />
          <div className="modal-period">
            <input
              type="month"
              aria-label="From"
              value={draft.from}
              onChange={(e) => onDraftChange({ ...draft, from: e.target.value })}
            />
            <input
              type="month"
              aria-label="To"
              value={draft.to}
              onChange={(e) => onDraftChange({ ...draft, to: e.target.value })}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onSave}>
            {saveLabel}
          </button>
          <button type="button" onClick={onClose}>
            {labels.cancel}
          </button>
        </div>
      </div>
    </div>
  )
}

export function EducationModal({
  locale,
  title,
  draft,
  onDraftChange,
  onSave,
  onClose,
  saveLabel,
}: {
  locale: Locale
  title: string
  draft: EducationDraft
  onDraftChange: (next: EducationDraft) => void
  onSave: () => void
  onClose: () => void
  saveLabel: string
}) {
  const labels = t(locale)
  return (
    <div className="modal-overlay no-print" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{title}</h3>
          <button type="button" onClick={onClose}>
            {labels.close}
          </button>
        </div>
        <div className="modal-form">
          <input
            placeholder="Title ES"
            value={draft.title.es}
            onChange={(e) =>
              onDraftChange({ ...draft, title: { ...draft.title, es: e.target.value } })
            }
          />
          <input
            placeholder="Title EN"
            value={draft.title.en}
            onChange={(e) =>
              onDraftChange({ ...draft, title: { ...draft.title, en: e.target.value } })
            }
          />
          <input
            placeholder="Center ES"
            value={draft.center.es}
            onChange={(e) =>
              onDraftChange({ ...draft, center: { ...draft.center, es: e.target.value } })
            }
          />
          <input
            placeholder="Center EN"
            value={draft.center.en}
            onChange={(e) =>
              onDraftChange({ ...draft, center: { ...draft.center, en: e.target.value } })
            }
          />
          <div className="modal-period">
            <input
              type="month"
              aria-label="From"
              value={draft.from}
              onChange={(e) => onDraftChange({ ...draft, from: e.target.value })}
            />
            <input
              type="month"
              aria-label="To"
              value={draft.to}
              onChange={(e) => onDraftChange({ ...draft, to: e.target.value })}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onSave}>
            {saveLabel}
          </button>
          <button type="button" onClick={onClose}>
            {labels.cancel}
          </button>
        </div>
      </div>
    </div>
  )
}

export function CourseModal({
  locale,
  title,
  courses,
  draft,
  onDraftChange,
  onSave,
  onClose,
  saveLabel,
}: {
  locale: Locale
  title: string
  courses: CvData['courses']
  draft: CourseDraft
  onDraftChange: (next: CourseDraft) => void
  onSave: () => void
  onClose: () => void
  saveLabel: string
}) {
  const labels = t(locale)
  return (
    <div className="modal-overlay no-print" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{title}</h3>
          <button type="button" onClick={onClose}>
            {labels.close}
          </button>
        </div>
        <div className="modal-form">
          <select
            value={draft.categoryIndex}
            onChange={(e) => onDraftChange({ ...draft, categoryIndex: e.target.value })}
          >
            {courses.map((category, idx) => (
              <option key={category.name.es} value={String(idx)}>
                {localize(locale, category.name)}
              </option>
            ))}
            <option value="new">+ New category</option>
          </select>
          {draft.categoryIndex === 'new' ? (
            <>
              <input
                placeholder="Category ES"
                value={draft.categoryEs}
                onChange={(e) => onDraftChange({ ...draft, categoryEs: e.target.value })}
              />
              <input
                placeholder="Category EN"
                value={draft.categoryEn}
                onChange={(e) => onDraftChange({ ...draft, categoryEn: e.target.value })}
              />
            </>
          ) : null}
          <input
            placeholder="Course title"
            value={draft.title}
            onChange={(e) => onDraftChange({ ...draft, title: e.target.value })}
          />
          <input
            placeholder="Length"
            value={draft.length}
            onChange={(e) => onDraftChange({ ...draft, length: e.target.value })}
          />
          <input
            placeholder="Author"
            value={draft.author}
            onChange={(e) => onDraftChange({ ...draft, author: e.target.value })}
          />
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onSave}>
            {saveLabel}
          </button>
          <button type="button" onClick={onClose}>
            {labels.cancel}
          </button>
        </div>
      </div>
    </div>
  )
}
