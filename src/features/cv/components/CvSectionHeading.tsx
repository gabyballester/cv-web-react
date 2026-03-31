import { SectionHeader } from './SectionHeader'
import { SectionTitle } from './SectionTitle'
import './section-heading.css'

type HeadingTag = 'h2' | 'h3'
type HeadingVariant = 'main' | 'sidebar'

type Props = {
  title: string
  as?: HeadingTag
  variant?: HeadingVariant
}

/** Shared heading shell used by both columns. */
export function CvSectionHeading({ title, as = 'h2', variant = 'main' }: Props) {
  return (
    <SectionHeader className="section-header">
      <SectionTitle as={as} variant={variant}>
        {title}
      </SectionTitle>
    </SectionHeader>
  )
}
