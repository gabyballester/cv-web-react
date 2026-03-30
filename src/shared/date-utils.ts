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
