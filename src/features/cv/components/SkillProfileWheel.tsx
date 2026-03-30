import type { Locale, SkillProfileEntry } from '../../../domain/cv-schema'
import { localize } from '../../../shared/locale-utils'

const WHEEL_COLORS = [
  '#61dafb',
  '#3178c6',
  '#c026d3',
  '#059669',
  '#ea580c',
  '#6366f1',
] as const

function skillWheelIcon(id: SkillProfileEntry['icon']) {
  const common = { viewBox: '0 0 24 24', 'aria-hidden': true as const, focusable: false }
  switch (id) {
    case 'react':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="4.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="4.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            transform="rotate(-60 12 12)"
          />
        </svg>
      )
    case 'typescript':
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="2" fill="currentColor" opacity="0.18" />
          <path
            fill="currentColor"
            d="M15.3 17.4h2.1v1.1h-6.5v-1.1h2.3v-5.2h-2.3v-1.1h4.4v1.1h-2zm-5-6.7c0 .98-.33 1.75-.98 2.33-.64.56-1.55.84-2.72.84-.44 0-.86-.05-1.25-.14v-1.2c.35.13.73.19 1.14.19.55 0 .98-.13 1.3-.38.31-.26.47-.62.47-1.08 0-.4-.11-.71-.34-.94-.22-.23-.59-.39-1.12-.46l-.54-.07c-1.05-.14-1.8-.4-2.26-.8-.45-.4-.67-.95-.67-1.64 0-.9.3-1.6.89-2.1.6-.5 1.4-.75 2.4-.75.38 0 .86.05 1.44.14v1.14a4.3 4.3 0 0 0-1.32-.22c-.46 0-.83.11-1.1.34-.28.22-.42.53-.42.92 0 .38.11.66.33.85.22.18.6.32 1.13.41l.53.08c1.04.16 1.8.44 2.27.83.47.4.71.94.71 1.64z"
          />
        </svg>
      )
    case 'testing':
      return (
        <svg {...common}>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            d="M7 18l3-6m4 6l-3-6m-1 5h2M12 5v3"
          />
          <path fill="none" stroke="currentColor" strokeWidth="1.3" d="M6 6h12l-1 9H7L6 6z" />
        </svg>
      )
    case 'uiSystems':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="5" rx="1" fill="currentColor" opacity="0.85" />
          <rect x="4" y="11" width="10" height="4" rx="1" fill="currentColor" opacity="0.55" />
          <rect x="16" y="11" width="4" height="9" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="4" y="17" width="10" height="3" rx="1" fill="currentColor" opacity="0.4" />
        </svg>
      )
    case 'agile':
      return (
        <svg {...common}>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            d="M12 5a7 7 0 1 1-6.5 9.5M12 5v4m0-4h3"
          />
          <circle cx="12" cy="16" r="1.3" fill="currentColor" />
        </svg>
      )
    case 'architecture':
      return (
        <svg {...common}>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
            d="M12 4l7 4v8l-7 4-7-4V8l7-4zM12 12v8M5 8l7 4 7-4M12 12L5 8"
          />
        </svg>
      )
  }
}

function formatYears(locale: Locale, years: number) {
  const n = Number.isInteger(years) ? years : Number(years.toFixed(1))
  if (locale === 'es') return `~${n} años`
  return `~${n} yrs`
}

function formatShare(locale: Locale, fraction: number) {
  const pct = Math.round(fraction * 100)
  if (locale === 'es') return `${pct} %`
  return `${pct}%`
}

type Props = {
  items: SkillProfileEntry[]
  locale: Locale
  title: string
  footnote: string
}

export function SkillProfileWheel({ items, locale, title, footnote }: Props) {
  if (items.length === 0) return null

  const total = items.reduce((s, row) => s + row.yearsProfessional, 0)
  if (total <= 0) return null

  let acc = 0
  const gradientParts: string[] = []
  items.forEach((item, i) => {
    const start = (acc / total) * 100
    acc += item.yearsProfessional
    const end = (acc / total) * 100
    const c = WHEEL_COLORS[i % WHEEL_COLORS.length]
    gradientParts.push(`${c} ${start.toFixed(3)}% ${end.toFixed(3)}%`)
  })
  const conicBackground = `conic-gradient(from -90deg, ${gradientParts.join(', ')})`

  return (
    <section className="skill-wheel" aria-label={title}>
      <h3 className="sidebar-section-title skill-wheel-title">{title}</h3>
      <div className="skill-wheel-chart-wrap">
        <div className="skill-wheel-chart" style={{ background: conicBackground }} />
        <div className="skill-wheel-hole" aria-hidden="true" />
      </div>
      <ul className="skill-wheel-legend">
        {items.map((row, i) => (
          <li key={`${row.label.es}-${row.icon}`} className="skill-wheel-legend-row">
            <span
              className="skill-wheel-swatch"
              style={{ background: WHEEL_COLORS[i % WHEEL_COLORS.length] }}
            />
            <span className="skill-wheel-icon-cell" style={{ color: WHEEL_COLORS[i % WHEEL_COLORS.length] }}>
              {skillWheelIcon(row.icon)}
            </span>
            <span className="skill-wheel-legend-text">
              <span className="skill-wheel-legend-label">{localize(locale, row.label)}</span>
              <span className="skill-wheel-legend-meta">
                <strong>{formatYears(locale, row.yearsProfessional)}</strong>
                <span className="skill-wheel-legend-sep"> · </span>
                <span>{formatShare(locale, row.yearsProfessional / total)}</span>
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="skill-wheel-footnote">{footnote}</p>
    </section>
  )
}
