import type { CvData, Locale, SkillHighlightEntry } from '../../../domain/cv-schema'
import { computeTenureYears, formatTenureYearsWhole } from '../../../shared/skill-tenure'
import { localize } from '../../../shared/locale-utils'
import { SidebarPairListItem } from './SidebarPairListItem'
import { CvTitledSection } from './CvTitledSection'

function SkillIcon({ id, accent }: { id: SkillHighlightEntry['icon']; accent: string }) {
  const common = {
    viewBox: '0 0 24 24' as const,
    'aria-hidden': true as const,
    focusable: false as const,
    className: 'cv-sidebar-tech-icon-svg',
  }
  switch (id) {
    case 'javascript':
      return (
        <svg {...common} fill="none">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#f7df1e" />
          <path
            fill="#0f172a"
            d="M14.44 18.45c1.39.72 2.54.99 3.69.99 1.54 0 2.65-.72 2.65-1.8 0-.99-.73-1.62-2.52-2.32-2.18-.81-3.51-2.07-3.51-4.05 0-1.89 1.44-3.24 3.66-3.65l1.35-.05-.27 1.62c-1.26-.05-2.19.27-2.88.72-.44.27-.72.68-.72 1.17 0 1.08 1.08 1.53 2.79 2.19 2.32.86 3.6 2.02 3.6 4.14 0 2.07-1.53 3.38-4.23 3.38-1.53 0-3.02-.36-4.14-1.08l.99-1.71zm-7.78.09c.41.23.86.41 1.35.5l-.27 1.62c-1.08-.09-2.07-.5-2.88-1.08l.81-1.04zm-1.53-7.56c1.62-1.08 3.65-1.71 5.67-1.71.5 0 1 .05 1.44.14l-.32 1.89c-.36-.09-.77-.14-1.17-.14-1.44 0-2.92.41-4.14 1.08l-1.48-1.26z"
          />
        </svg>
      )
    case 'react':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2" fill={accent} />
          <ellipse cx="12" cy="12" rx="10.5" ry="4" fill="none" stroke={accent} strokeWidth="1.1" />
          <ellipse
            cx="12"
            cy="12"
            rx="10.5"
            ry="4"
            fill="none"
            stroke={accent}
            strokeWidth="1.1"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10.5"
            ry="4"
            fill="none"
            stroke={accent}
            strokeWidth="1.1"
            transform="rotate(-60 12 12)"
          />
        </svg>
      )
    case 'typescript':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="2.5" fill={accent} opacity="0.95" />
          <path
            fill="#fff"
            d="M15.2 17.2h2v1.1h-6.5v-1.1h2.2V12h-2.2v-1.1h4.5v1.2h-2zm-4.9-6.5c0 .9-.3 1.6-.95 2.18-.6.54-1.48.82-2.6.82-.42 0-.82-.05-1.2-.12v-1.15c.34.12.7.18 1.1.18.52 0 .92-.12 1.22-.36.3-.24.45-.6.45-1.04 0-.38-.1-.68-.32-.9-.22-.22-.58-.38-1.1-.45l-.52-.06c-1-.14-1.72-.4-2.16-.78-.44-.38-.65-.92-.65-1.58 0-.86.28-1.54.85-2.02.58-.48 1.34-.72 2.28-.72.36 0 .82.05 1.38.14v1.1c-.42-.12-.85-.18-1.28-.18-.44 0-.8.1-1.06.32-.26.22-.4.52-.4.88 0 .36.1.64.32.82.22.16.58.3 1.1.38l.52.08c1 .14 1.72.42 2.16.8.44.38.68.9.68 1.57z"
          />
        </svg>
      )
    case 'testing':
      return (
        <svg {...common}>
          <path
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            d="M7 18l3-6m4 6l-3-6m-1 5h2M12 5v3"
          />
          <path fill="none" stroke={accent} strokeWidth="1.25" d="M6 6h12l-1 9H7L6 6z" />
        </svg>
      )
    case 'uiSystems':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="5" rx="1" fill={accent} opacity="0.9" />
          <rect x="4" y="11" width="10" height="4" rx="1" fill={accent} opacity="0.55" />
          <rect x="16" y="11" width="4" height="9" rx="1" fill={accent} opacity="0.7" />
          <rect x="4" y="17" width="10" height="3" rx="1" fill={accent} opacity="0.45" />
        </svg>
      )
    case 'agile':
      return (
        <svg {...common}>
          <path
            fill="none"
            stroke={accent}
            strokeWidth="1.35"
            strokeLinecap="round"
            d="M12 5a7 7 0 1 1-6.5 9.5M12 5v4m0-4h3"
          />
          <circle cx="12" cy="16" r="1.2" fill={accent} />
        </svg>
      )
    case 'git':
      return (
        <svg {...common} fill="none">
          <circle cx="6.5" cy="14" r="2.2" fill={accent} />
          <circle cx="17.5" cy="6" r="2.2" fill={accent} />
          <circle cx="17.5" cy="18" r="2.2" fill={accent} />
          <path
            stroke={accent}
            strokeWidth="1.35"
            strokeLinecap="round"
            d="M8.4 13.2 13 8.5M14.8 8.2l2.6 8.6M14.8 17.8l2.6-8.6"
          />
        </svg>
      )
    case 'state':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="4" rx="1" fill={accent} opacity="0.92" />
          <rect x="4" y="10" width="16" height="4" rx="1" fill={accent} opacity="0.65" />
          <rect x="4" y="15" width="16" height="4" rx="1" fill={accent} opacity="0.42" />
        </svg>
      )
    case 'api':
      return (
        <svg {...common} fill="none">
          <path
            stroke={accent}
            strokeWidth="1.35"
            strokeLinecap="round"
            d="M7.5 10a3.5 3.5 0 0 0 0 4M16.5 10a3.5 3.5 0 0 1 0 4"
          />
          <path fill={accent} d="M11 11.5h2v2h-2z" />
        </svg>
      )
  }
}

const ACCENTS: Record<SkillHighlightEntry['icon'], string> = {
  javascript: '#ca8a04',
  react: '#61dafb',
  typescript: '#3178c6',
  testing: '#a21caf',
  uiSystems: '#059669',
  agile: '#ea580c',
  git: '#f05032',
  state: '#764abc',
  api: '#0d9488',
}

type Props = {
  cvData: CvData
  locale: Locale
  title: string
}

/** Same list + `SidebarPairListItem` pattern as contact (main left, trail right). */
export function SkillHighlights({ cvData, locale, title }: Props) {
  const items = cvData.header.skillHighlights
  if (items.length === 0) return null

  return (
    <CvTitledSection title={title}>
      <ul className="cv-sidebar-contact-list">
        {items.map((row) => {
          const years = computeTenureYears(row.tenureKey, cvData)
          const accent = ACCENTS[row.icon]
          return (
            <SidebarPairListItem
              key={`${row.tenureKey}-${row.label.es}`}
              main={
                <span className="cv-sidebar-pair-main-inline">
                  <span className="cv-sidebar-tech-icon-wrap" style={{ color: accent }}>
                    <SkillIcon id={row.icon} accent={accent} />
                  </span>
                  <span className="cv-sidebar-pair-label">{localize(locale, row.label)}</span>
                </span>
              }
              trailing={
                <span className="cv-sidebar-pair-trail-text">
                  {formatTenureYearsWhole(locale, years)}
                </span>
              }
            />
          )
        })}
      </ul>
    </CvTitledSection>
  )
}
