import type { CvData, Locale } from '../../../domain/cv-schema'
import type { UiLabels } from './cv-document-types'
import { EducationBlock, ExperienceBlock } from '../components/blocks'

type Props = {
  cvData: CvData
  locale: Locale
  labels: UiLabels
  experiences: CvData['experiences']
  experienceIndexOffset: number
  onOpenEducationModal: () => void
  onOpenExperienceModal: () => void
  onEditEducation: (index: number) => void
  onEditExperience: (globalIndex: number) => void
  onEditGroupedPosition: (globalIndex: number, positionIndex: number) => void
}

export function CvMainPage1({
  cvData,
  locale,
  labels,
  experiences,
  experienceIndexOffset,
  onOpenEducationModal,
  onOpenExperienceModal,
  onEditEducation,
  onEditExperience,
  onEditGroupedPosition,
}: Props) {
  return (
    <section className="cv-content">
      <header className="hero">
        <div className="hero-banner" />
        <h1>{cvData.profile.name}</h1>
        <p className="role-tag">{cvData.profile.roleTag}</p>
      </header>
      <section className="editable-section education-section">
        <div className="section-header">
          <h2>{labels.education}</h2>
          <button type="button" className="section-plus no-print" onClick={onOpenEducationModal}>
            +
          </button>
        </div>
        {cvData.education.map((item, eduIdx) => (
          <EducationBlock
            key={item.title.es}
            item={item}
            locale={locale}
            onEdit={() => onEditEducation(eduIdx)}
          />
        ))}
      </section>
      <section className="editable-section">
        <div className="section-header">
          <h2>{labels.experience}</h2>
          <button type="button" className="section-plus no-print" onClick={onOpenExperienceModal}>
            +
          </button>
        </div>
        {experiences.map((exp, idx) => {
          const globalIdx = experienceIndexOffset + idx
          const blockKey =
            exp.kind === 'grouped'
              ? `grouped-${exp.company.es}`
              : `single-${exp.company.es}-${exp.period.from}`
          return (
            <ExperienceBlock
              key={blockKey}
              exp={exp}
              locale={locale}
              technologiesLabel={labels.technologies}
              onEdit={exp.kind === 'single' ? () => onEditExperience(globalIdx) : undefined}
              onEditGroupedPosition={
                exp.kind === 'grouped'
                  ? (positionIndex) => onEditGroupedPosition(globalIdx, positionIndex)
                  : undefined
              }
            />
          )
        })}
      </section>
    </section>
  )
}
