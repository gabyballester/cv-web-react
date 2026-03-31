import type { ReactNode } from 'react'
import { SidebarPairRow } from './SidebarPairRow'

type Props = {
  main: ReactNode
  trailing?: ReactNode
}

/** One row in sidebar lists (contact, skills): same markup as contact items. */
export function SidebarPairListItem({ main, trailing }: Props) {
  return (
    <li className="cv-sidebar-contact-item">
      <SidebarPairRow main={main} trailing={trailing} />
    </li>
  )
}
