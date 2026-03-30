import type { Locale } from '../../../domain/cv-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BaseModal } from '../../../shared/ui/modal/BaseModal'
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
  const { register, handleSubmit, reset } = useForm<EducationDraft>({
    resolver: zodResolver(educationDraftSchema),
    defaultValues: draft,
  })

  useEffect(() => {
    reset(draft)
  }, [draft, reset])

  return (
    <BaseModal title={title} closeLabel={labels.close} onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit(onSave)}>
        <input placeholder="Title ES" {...register('title.es')} />
        <input placeholder="Title EN" {...register('title.en')} />
        <input placeholder="Center ES" {...register('center.es')} />
        <input placeholder="Center EN" {...register('center.en')} />
        <div className="modal-period">
          <input type="month" aria-label="From" {...register('from')} />
          <input type="month" aria-label="To" {...register('to')} />
        </div>
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
