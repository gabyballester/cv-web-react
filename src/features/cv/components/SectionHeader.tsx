import type { ReactNode } from 'react'

type Props = {
  className?: string
  children: ReactNode
}

/** Reusable section header container (title + optional action). */
export function SectionHeader({ className, children }: Props) {
  const classes = ['cv-section-header', className].filter(Boolean).join(' ')
  return <div className={classes}>{children}</div>
}
