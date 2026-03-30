import type { Locale } from '../../../domain/cv-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BaseModal } from '../../../shared/ui/modal/BaseModal'
import { t } from '../../../shared/ui-labels'
import { experienceDraftSchema } from './schemas'
import type { ExperienceDraft } from './types'

type ExperienceModalProps = {
  locale: Locale
  title: string
  draft: ExperienceDraft
  onClose: () => void
  onSave: (next: ExperienceDraft) => void
  saveLabel: string
}

export function ExperienceModal({
  locale,
  title,
  draft,
  onClose,
  onSave,
  saveLabel,
}: ExperienceModalProps) {
  const labels = t(locale)
  const { register, handleSubmit, reset } = useForm<ExperienceDraft>({
    resolver: zodResolver(experienceDraftSchema),
    defaultValues: draft,
  })

  useEffect(() => {
    reset(draft)
  }, [draft, reset])

  return (
    <BaseModal title={title} closeLabel={labels.close} onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit(onSave)}>
        <input placeholder="Role ES" {...register('role.es')} />
        <input placeholder="Role EN" {...register('role.en')} />
        <input placeholder="Company ES" {...register('company.es')} />
        <input placeholder="Company EN" {...register('company.en')} />
        <input placeholder="Project ES" {...register('project.es')} />
        <input placeholder="Project EN" {...register('project.en')} />
        <textarea placeholder="Bullet ES" {...register('bullet.es')} />
        <textarea placeholder="Bullet EN" {...register('bullet.en')} />
        <input placeholder="Tech comma separated" {...register('technologies')} />
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
