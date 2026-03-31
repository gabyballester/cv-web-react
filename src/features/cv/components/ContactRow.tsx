import type { ReactNode } from 'react'
import { SidebarPairListItem } from './SidebarPairListItem'

export type ContactIconKind = 'location' | 'phone' | 'mobile' | 'linkedin'

function ContactTrailIcon({ kind }: { kind: ContactIconKind }) {
  const base = 'contact-icon'
  switch (kind) {
    case 'location':
      return (
        <span className={`${base} contact-icon-location`} aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
        </span>
      )
    case 'phone':
      return (
        <span className={`${base} contact-icon-phone`} aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.45.55 1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.85 22 2 13.15 2 2a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.36.56 3.45a1 1 0 0 1-.24 1l-2.2 2.35Z" />
          </svg>
        </span>
      )
    case 'mobile':
      return (
        <span className={`${base} contact-icon-mobile`} aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 18a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM8 5v11h8V5H8Z" />
          </svg>
        </span>
      )
    case 'linkedin':
      return (
        <span className={`${base} contact-icon-linkedin`} aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M6.6 8.7A1.7 1.7 0 1 1 6.6 5.3a1.7 1.7 0 0 1 0 3.4ZM5.2 10h2.8v8.8H5.2V10Zm4.5 0h2.7v1.2h.04c.37-.7 1.3-1.4 2.67-1.4 2.86 0 3.39 1.82 3.39 4.2v4.8h-2.8v-4.25c0-1.01-.02-2.32-1.46-2.32-1.46 0-1.68 1.09-1.68 2.25v4.32H9.7V10Z" />
          </svg>
        </span>
      )
  }
}

type ContactRowProps = {
  icon: ContactIconKind
  children: ReactNode
}

export function ContactRow({ icon, children }: ContactRowProps) {
  return (
    <SidebarPairListItem main={children} trailing={<ContactTrailIcon kind={icon} />} />
  )
}
