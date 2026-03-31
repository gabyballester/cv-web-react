import type { ReactNode } from 'react'

type HeadingTag = 'h2' | 'h3' | 'h4'
type TitleVariant = 'main' | 'sidebar' | 'category'

type Props = {
  as: HeadingTag
  variant: TitleVariant
  className?: string
  children: ReactNode
}

/** Semantic heading with unified CV visual variants. */
export function SectionTitle({ as: Tag, variant, className, children }: Props) {
  const classes = ['cv-section-title', `cv-section-title--${variant}`, className]
    .filter(Boolean)
    .join(' ')
  return <Tag className={classes}>{children}</Tag>
}
