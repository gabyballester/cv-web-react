import type { CvData, Locale } from '../../../domain/cv-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { BaseModal } from '../../../shared/ui/modal/BaseModal'
import { ModalFieldError } from '../../../shared/ui/modal/ModalFieldError'
import { ModalFormActions } from '../../../shared/ui/modal/ModalFormActions'
import { localize } from '../../../shared/locale-utils'
import { t } from '../../../shared/ui-labels'
import { courseAppendSchema, courseDraftSchema } from './schemas'
import type { CourseAppendValues, CourseDraft } from './types'

type CourseModalProps = {
  locale: Locale
  title: string
  courses: CvData['courses']
  draft: CourseDraft
  mode: 'add' | 'edit'
  onSave: (next: CourseDraft) => void
  onAppendCourse: (next: Pick<CourseDraft, 'title' | 'length' | 'author'>) => void
  onClose: () => void
  saveLabel: string
}

function CourseModalAdd({
  locale,
  title,
  draft,
  onAppendCourse,
  onClose,
  saveLabel,
}: Pick<CourseModalProps, 'locale' | 'title' | 'draft' | 'onAppendCourse' | 'onClose' | 'saveLabel'>) {
  const labels = t(locale)
  const fieldText =
    locale === 'es'
      ? { title: 'Curso', length: 'Duración', author: 'Autor' }
      : { title: 'Course', length: 'Length', author: 'Author' }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseAppendValues>({
    resolver: zodResolver(courseAppendSchema),
    defaultValues: { title: draft.title, length: draft.length, author: draft.author },
  })

  useEffect(() => {
    reset({ title: draft.title, length: draft.length, author: draft.author })
  }, [draft, reset])

  return (
    <BaseModal title={title} closeLabel={labels.close} onClose={onClose}>
      <p className="modal-hint">
        {locale === 'es'
          ? 'El curso se añade al final de la columna de cursos (página 2).'
          : 'The course is appended to the end of the courses column (page 2).'}
      </p>
      <form className="modal-form" onSubmit={handleSubmit(onAppendCourse)}>
        <label className="modal-field">
          <span>{fieldText.title}</span>
          <input
            placeholder={
              locale === 'es'
                ? 'Ej: React - The Complete Guide'
                : 'e.g. React - The Complete Guide'
            }
            aria-invalid={Boolean(errors.title)}
            {...register('title')}
          />
        </label>
        <ModalFieldError message={errors.title?.message} />
        <label className="modal-field">
          <span>{fieldText.length}</span>
          <input placeholder={locale === 'es' ? 'Ej: 48h' : 'e.g. 48h'} {...register('length')} />
        </label>
        <label className="modal-field">
          <span>{fieldText.author}</span>
          <input placeholder={locale === 'es' ? 'Ej: Maximillian Schwarzmüller' : 'e.g. Maximillian Schwarzmüller'} {...register('author')} />
        </label>
        <ModalFormActions saveLabel={saveLabel} cancelLabel={labels.cancel} onCancel={onClose} />
      </form>
    </BaseModal>
  )
}

function CourseModalEdit({
  locale,
  title,
  courses,
  draft,
  onSave,
  onClose,
  saveLabel,
}: Pick<CourseModalProps, 'locale' | 'title' | 'courses' | 'draft' | 'onSave' | 'onClose' | 'saveLabel'>) {
  const labels = t(locale)
  const fieldText =
    locale === 'es'
      ? {
          category: 'Tipología',
          categoryEs: 'Tipología (ES)',
          categoryEn: 'Tipología (EN)',
          title: 'Curso',
          length: 'Duración',
          author: 'Autor',
          newCategory: '+ Nueva tipología',
        }
      : {
          category: 'Category',
          categoryEs: 'Category (ES)',
          categoryEn: 'Category (EN)',
          title: 'Course',
          length: 'Length',
          author: 'Author',
          newCategory: '+ New category',
        }
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseDraft>({
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
        <label className="modal-field">
          <span>{fieldText.category}</span>
          <select {...register('categoryIndex')}>
            {courses.map((category, idx) => (
              <option key={category.name.es} value={String(idx)}>
                {localize(locale, category.name)}
              </option>
            ))}
            <option value="new">{fieldText.newCategory}</option>
          </select>
        </label>
        {categoryIndex === 'new' ? (
          <>
            <label className="modal-field">
              <span>{fieldText.categoryEs}</span>
              <input
                placeholder={locale === 'es' ? 'Ej: Frontend' : 'e.g. Frontend'}
                aria-invalid={Boolean(errors.categoryEs)}
                {...register('categoryEs')}
              />
            </label>
            <ModalFieldError message={errors.categoryEs?.message} />
            <label className="modal-field">
              <span>{fieldText.categoryEn}</span>
              <input
                placeholder="e.g. Frontend"
                aria-invalid={Boolean(errors.categoryEn)}
                {...register('categoryEn')}
              />
            </label>
            <ModalFieldError message={errors.categoryEn?.message} />
          </>
        ) : null}
        <label className="modal-field">
          <span>{fieldText.title}</span>
          <input
            placeholder={
              locale === 'es'
                ? 'Ej: React - The Complete Guide'
                : 'e.g. React - The Complete Guide'
            }
            aria-invalid={Boolean(errors.title)}
            {...register('title')}
          />
        </label>
        <ModalFieldError message={errors.title?.message} />
        <label className="modal-field">
          <span>{fieldText.length}</span>
          <input placeholder={locale === 'es' ? 'Ej: 48h' : 'e.g. 48h'} {...register('length')} />
        </label>
        <label className="modal-field">
          <span>{fieldText.author}</span>
          <input placeholder={locale === 'es' ? 'Ej: Maximillian Schwarzmüller' : 'e.g. Maximillian Schwarzmüller'} {...register('author')} />
        </label>
        <ModalFormActions saveLabel={saveLabel} cancelLabel={labels.cancel} onCancel={onClose} />
      </form>
    </BaseModal>
  )
}

export function CourseModal(props: CourseModalProps) {
  if (props.mode === 'add') {
    return (
      <CourseModalAdd
        locale={props.locale}
        title={props.title}
        draft={props.draft}
        onAppendCourse={props.onAppendCourse}
        onClose={props.onClose}
        saveLabel={props.saveLabel}
      />
    )
  }

  return (
    <CourseModalEdit
      locale={props.locale}
      title={props.title}
      courses={props.courses}
      draft={props.draft}
      onSave={props.onSave}
      onClose={props.onClose}
      saveLabel={props.saveLabel}
    />
  )
}
