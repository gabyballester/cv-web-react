import type { CvData, Locale } from '../../../domain/cv-schema'
import type { UiLabels } from './cv-document-types'
import { EducationBlock, ExperienceBlock } from '../components/blocks'
import { SectionHeader } from '../components/SectionHeader'
import { SectionTitle } from '../components/SectionTitle'

type Props = {
  cvData: CvData
  locale: Locale
  labels: UiLabels
  experiences: CvData['experiences']
}

export function CvMainPage1({
  cvData,
  locale,
  labels,
  experiences,
}: Props) {
  return (
    <section className="cv-content">
      <header className="hero">
        <div className="hero-banner" />
        <h1>{cvData.profile.name}</h1>
        <p className="role-tag">{cvData.profile.roleTag}</p>
      </header>
      <section className="education-section">
        <SectionHeader className="section-header">
          <SectionTitle as="h2" variant="main">
            {labels.education}
          </SectionTitle>
        </SectionHeader>
        {cvData.education.map((item) => (
          <EducationBlock key={item.title.es} item={item} locale={locale} />
        ))}
      </section>
      <section>
        <SectionHeader className="section-header">
          <SectionTitle as="h2" variant="main">
            {labels.experience}
          </SectionTitle>
        </SectionHeader>
        {experiences.map((exp) => {
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
            />
          )
        })}
      </section>
    </section>
  )
}
