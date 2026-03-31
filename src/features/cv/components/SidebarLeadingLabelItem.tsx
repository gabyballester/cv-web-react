import type { ReactNode } from 'react'
import { SidebarPairListItem } from './SidebarPairListItem'

type Props = {
  leading: ReactNode
  label: ReactNode
}

/** Reusable sidebar list item: leading visual (icon/flag) + text label. */
export function SidebarLeadingLabelItem({ leading, label }: Props) {
  return (
    <SidebarPairListItem
      main={
        <span className="cv-sidebar-pair-main-inline">
          {leading}
          <span className="cv-sidebar-pair-label">{label}</span>
        </span>
      }
    />
  )
}
