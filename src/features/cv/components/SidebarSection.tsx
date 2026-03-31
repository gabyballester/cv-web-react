import type { ReactNode } from 'react'
import { SectionHeader } from './SectionHeader'
import { SectionTitle } from './SectionTitle'
import '../styles/sidebar.css'

type Props = {
  title: string
  children: ReactNode
  ariaLabel?: string
  className?: string
}

/** Shared sidebar section shell: semantic section + unified sidebar title. */
export function SidebarSection({ title, children, ariaLabel, className }: Props) {
  const classes = ['sidebar-pair-section', className].filter(Boolean).join(' ')
  return (
    <section className={classes} aria-label={ariaLabel ?? title}>
      <SectionHeader className="section-header">
        <SectionTitle as="h2" variant="main">
          {title}
        </SectionTitle>
      </SectionHeader>
      {children}
    </section>
  )
}
