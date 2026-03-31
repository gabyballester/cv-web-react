import { SectionHeader } from './SectionHeader'
import { SectionTitle } from './SectionTitle'
import './section-heading.css'

type Props = {
  title: string
}

/** Shared heading shell used by both columns. */
export function CvSectionHeading({ title }: Props) {
  return (
    <SectionHeader className="section-header">
      <SectionTitle as="h2" variant="main">
        {title}
      </SectionTitle>
    </SectionHeader>
  )
}
