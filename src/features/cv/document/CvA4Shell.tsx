import type { ReactNode } from 'react'

type Props = {
  pageLabel: string
  pageAriaLabel: string
  children: ReactNode
}

export function CvA4Shell({ pageLabel, pageAriaLabel, children }: Props) {
  return (
    <article className="a4-page" aria-label={pageAriaLabel}>
      <div className="cv-grid">{children}</div>
      <p className="page-index" aria-hidden="true">
        {pageLabel}
      </p>
    </article>
  )
}
