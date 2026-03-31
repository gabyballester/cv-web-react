import { readFileSync } from 'node:fs'

const cssPath = 'src/app/App.css'
const css = readFileSync(cssPath, 'utf8')

const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/)
if (!rootMatch) {
  console.error(`Could not find :root block in ${cssPath}`)
  process.exit(1)
}

const vars = new Map()
const varRegex = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi
for (const match of rootMatch[1].matchAll(varRegex)) {
  vars.set(match[1], match[2].trim())
}

function normalizeHex(value) {
  const raw = value.trim()
  const match = raw.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (!match) return null
  let hex = match[1].toLowerCase()
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((ch) => ch + ch)
      .join('')
  }
  return `#${hex}`
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  return {
    r: Number.parseInt(clean.slice(0, 2), 16),
    g: Number.parseInt(clean.slice(2, 4), 16),
    b: Number.parseInt(clean.slice(4, 6), 16),
  }
}

function srgbToLinear(channel) {
  const c = channel / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function relativeLuminance({ r, g, b }) {
  const rl = srgbToLinear(r)
  const gl = srgbToLinear(g)
  const bl = srgbToLinear(b)
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl
}

function contrastRatio(foregroundHex, backgroundHex) {
  const fgL = relativeLuminance(hexToRgb(foregroundHex))
  const bgL = relativeLuminance(hexToRgb(backgroundHex))
  const lighter = Math.max(fgL, bgL)
  const darker = Math.min(fgL, bgL)
  return (lighter + 0.05) / (darker + 0.05)
}

function resolveToken(tokenName) {
  const value = vars.get(tokenName)
  if (!value) return null
  return normalizeHex(value)
}

const requiredChecks = [
  { fg: 'text', bg: 'white', min: 4.5, usage: 'default body text' },
  { fg: 'text-strong', bg: 'white', min: 4.5, usage: 'section and heading text' },
  { fg: 'muted', bg: 'white', min: 4.5, usage: 'secondary text' },
  { fg: 'muted-strong', bg: 'white', min: 4.5, usage: 'meta text' },
  { fg: 'accent-strong', bg: 'white', min: 4.5, usage: 'links' },
]

const advisoryChecks = [
  { fg: 'white', bg: 'accent-topbar-start', min: 4.5, usage: 'toolbar text (start)' },
  { fg: 'white', bg: 'accent-topbar-mid', min: 4.5, usage: 'toolbar text (middle)' },
  { fg: 'white', bg: 'accent-topbar-end', min: 4.5, usage: 'toolbar text (end)' },
]

function runChecks(list, blocking) {
  const failures = []
  for (const check of list) {
    const fgHex = resolveToken(check.fg)
    const bgHex = resolveToken(check.bg)
    if (!fgHex || !bgHex) {
      const msg = `Missing/unsupported color token: --${check.fg} or --${check.bg}`
      failures.push(msg)
      console.log(`${blocking ? 'FAIL' : 'WARN'}  ${msg}`)
      continue
    }

    const ratio = contrastRatio(fgHex, bgHex)
    const pass = ratio >= check.min
    const result = pass ? 'PASS' : blocking ? 'FAIL' : 'WARN'
    console.log(
      `${result}  ${check.usage.padEnd(28)}  ${check.fg}/${check.bg}  ${ratio.toFixed(2)}:1 (min ${check.min}:1)`,
    )
    if (!pass) {
      failures.push(
        `${check.usage}: --${check.fg} on --${check.bg} = ${ratio.toFixed(2)}:1 (min ${check.min}:1)`,
      )
    }
  }
  return failures
}

console.log('Required contrast checks')
const requiredFailures = runChecks(requiredChecks, true)

console.log('\nAdvisory contrast checks')
const advisoryFailures = runChecks(advisoryChecks, false)

if (advisoryFailures.length > 0) {
  console.log('\nAdvisory items detected (does not fail):')
  for (const item of advisoryFailures) console.log(`- ${item}`)
}

if (requiredFailures.length > 0) {
  console.error('\nBlocking contrast failures:')
  for (const item of requiredFailures) console.error(`- ${item}`)
  process.exit(1)
}

console.log('\nAll required contrast checks passed.')
