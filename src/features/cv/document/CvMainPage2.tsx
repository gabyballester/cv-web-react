import type { CvData, Locale } from '../../../domain/cv-schema'
import type { UiLabels } from './cv-document-types'
import { ExperienceBlock } from '../components/blocks'

type Props = {
  locale: Locale
  labels: UiLabels
  experiences: CvData['experiences']
}

export function CvMainPage2({
  locale,
  labels,
  experiences,
}: Props) {
  return (
    <section className="cv-content cv-content--p2">
      <section className="experience-list-p2">
        {experiences.map((exp) => {
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
            />
          )
        })}
      </section>
    </section>
  )
}
