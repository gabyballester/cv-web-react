import type { CvData, Locale } from '../../../domain/cv-schema'
import type { UiLabels } from './cv-document-types'
import { ExperienceBlock } from '../components/blocks'

type Props = {
  locale: Locale
  labels: UiLabels
  allExperiences: CvData['experiences']
  experiences: CvData['experiences']
  onEditExperience: (globalIndex: number) => void
  onEditGroupedPosition: (globalIndex: number, positionIndex: number) => void
}

export function CvMainPage2({
  locale,
  labels,
  allExperiences,
  experiences,
  onEditExperience,
  onEditGroupedPosition,
}: Props) {
  return (
    <section className="cv-content">
      <section>
        {experiences.map((exp) => {
          const globalIdx = allExperiences.indexOf(exp)
          const blockKey =
            exp.kind === 'grouped'
              ? `grouped-${exp.company.es}-p2`
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
