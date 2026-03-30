import type { Locale } from '../../../domain/cv-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BaseModal } from '../../../shared/ui/modal/BaseModal'
import { ModalFieldError } from '../../../shared/ui/modal/ModalFieldError'
import { ModalFormActions } from '../../../shared/ui/modal/ModalFormActions'
import { t } from '../../../shared/ui-labels'
import { educationDraftSchema } from './schemas'
import type { EducationDraft } from './types'

type EducationModalProps = {
  locale: Locale
  title: string
  draft: EducationDraft
  onSave: (next: EducationDraft) => void
  onClose: () => void
  saveLabel: string
}

export function EducationModal({
  locale,
  title,
  draft,
  onSave,
  onClose,
  saveLabel,
}: EducationModalProps) {
  const labels = t(locale)
  const fieldText =
    locale === 'es'
      ? {
          titleEs: 'Título (ES)',
          titleEn: 'Title (EN)',
          centerEs: 'Centro (ES)',
          centerEn: 'Center (EN)',
          from: 'Desde',
          to: 'Hasta',
        }
      : {
          titleEs: 'Title (ES)',
          titleEn: 'Title (EN)',
          centerEs: 'Center (ES)',
          centerEn: 'Center (EN)',
          from: 'From',
          to: 'To',
        }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationDraft>({
    resolver: zodResolver(educationDraftSchema),
    defaultValues: draft,
  })

  useEffect(() => {
    reset(draft)
  }, [draft, reset])

  return (
    <BaseModal title={title} closeLabel={labels.close} onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit(onSave)}>
        <label className="modal-field">
          <span>{fieldText.titleEs}</span>
          <input
            placeholder={
              locale === 'es'
                ? 'Ej: Bootcamp Full Stack JavaScript Developer'
                : 'e.g. Bootcamp Full Stack JavaScript Developer'
            }
            aria-invalid={Boolean(errors.title?.es)}
            {...register('title.es')}
          />
        </label>
        <ModalFieldError message={errors.title?.es?.message} />
        <label className="modal-field">
          <span>{fieldText.titleEn}</span>
          <input
            placeholder="e.g. Bootcamp Full Stack JavaScript Developer"
            aria-invalid={Boolean(errors.title?.en)}
            {...register('title.en')}
          />
        </label>
        <ModalFieldError message={errors.title?.en?.message} />
        <label className="modal-field">
          <span>{fieldText.centerEs}</span>
          <input placeholder={locale === 'es' ? 'Ej: Geekshubs Academy, Valencia, España' : 'e.g. Geekshubs Academy, Valencia, Spain'} {...register('center.es')} />
        </label>
        <label className="modal-field">
          <span>{fieldText.centerEn}</span>
          <input placeholder="e.g. Geekshubs Academy, Valencia, Spain" {...register('center.en')} />
        </label>
        <div className="modal-period">
          <label className="modal-field">
            <span>{fieldText.from}</span>
            <input type="month" aria-label={fieldText.from} {...register('from')} />
          </label>
          <label className="modal-field">
            <span>{fieldText.to}</span>
            <input type="month" aria-label={fieldText.to} {...register('to')} />
          </label>
        </div>
        <ModalFormActions saveLabel={saveLabel} cancelLabel={labels.cancel} onCancel={onClose} />
      </form>
    </BaseModal>
  )
}
