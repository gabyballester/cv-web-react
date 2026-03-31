import type { ReactNode } from 'react'

type Props = {
  pageLabel: string
  children: ReactNode
}

export function CvA4Shell({ pageLabel, children }: Props) {
  return (
    <article className="a4-page">
      <div className="cv-grid">{children}</div>
      <p className="page-index">{pageLabel}</p>
    </article>
  )
}
