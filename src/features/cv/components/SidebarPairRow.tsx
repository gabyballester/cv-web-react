import type { ReactNode } from 'react'

type Props = {
  /** Primary content (e.g. text, or icon + label). */
  main: ReactNode
  /** Right column: icon, tenure, etc. Omit for a single full-width column (e.g. idiomas). */
  trailing?: ReactNode
  className?: string
}

/** Two-column sidebar row: main (left) + trailing (right). Shared by contact rows and skill rows. */
export function SidebarPairRow({ main, trailing, className }: Props) {
  const base = ['cv-sidebar-pair-row', className].filter(Boolean).join(' ')
  if (trailing == null) {
    return (
      <div className={`${base} cv-sidebar-pair-row--single`}>
        <div className="cv-sidebar-pair-row__main">{main}</div>
      </div>
    )
  }
  return (
    <div className={base}>
      <div className="cv-sidebar-pair-row__main">{main}</div>
      <div className="cv-sidebar-pair-row__trail">{trailing}</div>
    </div>
  )
}
