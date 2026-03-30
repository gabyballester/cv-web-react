import { format, parse } from 'date-fns'

const MONTH_INPUT_PATTERN = /^\d{4}-\d{2}$/
const CV_PERIOD_PATTERN = /^(\d{2})\/(\d{4})$/

export function toMonthInputValue(value: string) {
  if (MONTH_INPUT_PATTERN.test(value)) return value

  const match = value.match(CV_PERIOD_PATTERN)
  if (!match) return ''

  const parsed = parse(value, 'MM/yyyy', new Date())
  if (Number.isNaN(parsed.getTime())) return ''
  return format(parsed, 'yyyy-MM')
}

export function toDisplayPeriod(value: string) {
  if (!value.trim()) return 'N/A'
  if (!MONTH_INPUT_PATTERN.test(value)) return value

  const parsed = parse(value, 'yyyy-MM', new Date())
  if (Number.isNaN(parsed.getTime())) return value
  return format(parsed, 'MM/yyyy')
}

const OPEN_PERIOD_END = new Set(['Present', 'Actualidad'])

export function isOpenPeriodEnd(value: string) {
  return OPEN_PERIOD_END.has(value)
}

/** Sort key for MM/yyyy display strings; null if not parseable. */
export function periodMonthKey(value: string): number | null {
  const match = value.match(CV_PERIOD_PATTERN)
  if (!match) return null
  const month = parseInt(match[1], 10)
  const year = parseInt(match[2], 10)
  return year * 12 + month
}

export function groupedCompanyPeriodBounds(
  positions: ReadonlyArray<{ period: { from: string; to: string } }>,
): { from: string; to: string } {
  if (positions.length === 0) return { from: '', to: 'Present' }

  let minFrom = positions[0].period.from
  let minKey = periodMonthKey(minFrom) ?? Infinity

  let anyOpen = false
  let maxEndKey = -Infinity
  let maxEndRaw = positions[0].period.to

  for (const p of positions) {
    const fk = periodMonthKey(p.period.from)
    if (fk != null && fk < minKey) {
      minKey = fk
      minFrom = p.period.from
    }
    if (isOpenPeriodEnd(p.period.to)) {
      anyOpen = true
    } else {
      const tk = periodMonthKey(p.period.to)
      if (tk != null && tk > maxEndKey) {
        maxEndKey = tk
        maxEndRaw = p.period.to
      }
    }
  }

  return { from: minFrom, to: anyOpen ? 'Present' : maxEndRaw }
}
