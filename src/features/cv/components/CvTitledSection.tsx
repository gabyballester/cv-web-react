import type { ReactNode } from 'react'
import { CvSectionHeading } from './CvSectionHeading'
import '../styles/sidebar.css'

type Props = {
  title: string
  children: ReactNode
  ariaLabel?: string
  className?: string
}

/** Reusable titled section shell for both CV columns. */
export function CvTitledSection({ title, children, ariaLabel, className }: Props) {
  const classes = ['sidebar-pair-section', className].filter(Boolean).join(' ')
  return (
    <section className={classes} aria-label={ariaLabel ?? title}>
      <CvSectionHeading title={title} as="h3" variant="sidebar" />
      {children}
    </section>
  )
}
