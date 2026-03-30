import type { Locale } from '../../../domain/cv-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { BaseModal } from '../../../shared/ui/modal/BaseModal'
import { ModalFieldError } from '../../../shared/ui/modal/ModalFieldError'
import { ModalFormActions } from '../../../shared/ui/modal/ModalFormActions'
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
  const fieldText =
    locale === 'es'
      ? {
          roleEs: 'Rol (ES)',
          roleEn: 'Role (EN)',
          companyEs: 'Empresa (ES)',
          companyEn: 'Company (EN)',
          projectEs: 'Proyecto (ES)',
          projectEn: 'Project (EN)',
          technologies: 'Tecnologías',
          from: 'Desde',
          to: 'Hasta',
          bulletEs: 'Bullet (ES)',
          bulletEn: 'Bullet (EN)',
          addBullet: '+ Añadir bullet',
          remove: 'Eliminar',
        }
      : {
          roleEs: 'Role (ES)',
          roleEn: 'Role (EN)',
          companyEs: 'Company (ES)',
          companyEn: 'Company (EN)',
          projectEs: 'Project (ES)',
          projectEn: 'Project (EN)',
          technologies: 'Technologies',
          from: 'From',
          to: 'To',
          bulletEs: 'Bullet (ES)',
          bulletEn: 'Bullet (EN)',
          addBullet: '+ Add bullet',
          remove: 'Remove',
        }
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceDraft>({
    resolver: zodResolver(experienceDraftSchema),
    defaultValues: draft,
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bullets',
  })

  useEffect(() => {
    reset(draft)
  }, [draft, reset])

  return (
    <BaseModal title={title} closeLabel={labels.close} onClose={onClose}>
      <form className="modal-form" onSubmit={handleSubmit(onSave)}>
        <label className="modal-field">
          <span>{fieldText.roleEs}</span>
          <input
            placeholder={locale === 'es' ? 'Ej: Frontend React Software Engineer' : 'e.g. Frontend React Software Engineer'}
            aria-invalid={Boolean(errors.role?.es)}
            {...register('role.es')}
          />
        </label>
        <ModalFieldError message={errors.role?.es?.message} />
        <label className="modal-field">
          <span>{fieldText.roleEn}</span>
          <input placeholder="e.g. Frontend React Software Engineer" aria-invalid={Boolean(errors.role?.en)} {...register('role.en')} />
        </label>
        <ModalFieldError message={errors.role?.en?.message} />
        <label className="modal-field">
          <span>{fieldText.companyEs}</span>
          <input placeholder={locale === 'es' ? 'Ej: Capgemini' : 'e.g. Capgemini'} {...register('company.es')} />
        </label>
        <label className="modal-field">
          <span>{fieldText.companyEn}</span>
          <input placeholder="e.g. Capgemini" {...register('company.en')} />
        </label>
        <label className="modal-field">
          <span>{fieldText.projectEs}</span>
          <input placeholder={locale === 'es' ? 'Ej: Proyecto: Onboarding - Openbank' : 'e.g. Project: Onboarding - Openbank'} {...register('project.es')} />
        </label>
        <label className="modal-field">
          <span>{fieldText.projectEn}</span>
          <input placeholder="e.g. Project: Onboarding - Openbank" {...register('project.en')} />
        </label>

        {fields.map((field, index) => (
          <div key={field.id} className="modal-bullet-card">
            <label className="modal-field">
              <span>
                {fieldText.bulletEs} #{index + 1}
              </span>
              <textarea
                placeholder={
                  locale === 'es'
                    ? 'Describe impacto, responsabilidad y resultado.'
                    : 'Describe impact, responsibility, and result.'
                }
                {...register(`bullets.${index}.es`)}
              />
            </label>
            <label className="modal-field">
              <span>
                {fieldText.bulletEn} #{index + 1}
              </span>
              <textarea
                placeholder="Describe impact, responsibility, and result."
                {...register(`bullets.${index}.en`)}
              />
            </label>
            <button
              type="button"
              className="modal-inline-button"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              {fieldText.remove}
            </button>
          </div>
        ))}
        <ModalFieldError message={errors.bullets?.message as string | undefined} />
        <button
          type="button"
          className="modal-inline-button"
          onClick={() => append({ es: '', en: '' })}
        >
          {fieldText.addBullet}
        </button>

        <label className="modal-field">
          <span>{fieldText.technologies}</span>
          <input placeholder="React, TypeScript, Jest, RTL, Storybook" {...register('technologies')} />
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
