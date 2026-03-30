import type { CvData, Locale } from '../../../domain/cv-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { BaseModal } from '../../../shared/ui/modal/BaseModal'
import { localize } from '../../../shared/locale-utils'
import { t } from '../../../shared/ui-labels'
import { courseDraftSchema } from './schemas'
import type { CourseDraft } from './types'

type CourseModalProps = {
  locale: Locale
  title: string
  courses: CvData['courses']
  draft: CourseDraft
  onSave: (next: CourseDraft) => void
  onClose: () => void
  saveLabel: string
}

export function CourseModal({
  locale,
  title,
  courses,
  draft,
  onSave,
  onClose,
  saveLabel,
}: CourseModalProps) {
  const labels = t(locale)
  const { register, control, handleSubmit, reset } = useForm<CourseDraft>({
    resolver: zodResolver(courseDraftSchema),
    defaultValues: draft,
  })
  const categoryIndex = useWatch({ control, name: 'categoryIndex' })

  useEffect(() => {
    reset(draft)
  }, [draft, reset])

  return (
    <BaseModal title={title} closeLabel={labels.close} onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit(onSave)}>
        <select {...register('categoryIndex')}>
          {courses.map((category, idx) => (
            <option key={category.name.es} value={String(idx)}>
              {localize(locale, category.name)}
            </option>
          ))}
          <option value="new">+ New category</option>
        </select>
        {categoryIndex === 'new' ? (
          <>
            <input placeholder="Category ES" {...register('categoryEs')} />
            <input placeholder="Category EN" {...register('categoryEn')} />
          </>
        ) : null}
        <input placeholder="Course title" {...register('title')} />
        <input placeholder="Length" {...register('length')} />
        <input placeholder="Author" {...register('author')} />
        <div className="modal-actions">
          <button type="submit">{saveLabel}</button>
          <button type="button" onClick={onClose}>
            {labels.cancel}
          </button>
        </div>
      </form>
    </BaseModal>
  )
}
