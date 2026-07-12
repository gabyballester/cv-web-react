import { spawn } from 'node:child_process'

const TIMEOUT_MS = Number(process.env.PLAYWRIGHT_INSTALL_TIMEOUT_MS ?? 120_000)
const args = ['exec', 'playwright', 'install', 'chromium']

console.log(`Installing Playwright Chromium (timeout: ${TIMEOUT_MS / 1000}s)...`)

const child = spawn('pnpm', args, {
  stdio: 'inherit',
  shell: true,
})

const timer = setTimeout(() => {
  console.error(
    `\nPlaywright install timed out after ${TIMEOUT_MS / 1000}s.\n` +
      'Tip: visual tests use system Chrome by default; you may not need this step.\n' +
      'Retry with a longer timeout: PLAYWRIGHT_INSTALL_TIMEOUT_MS=300000 pnpm test:visual:install',
  )
  child.kill('SIGTERM')
  setTimeout(() => child.kill('SIGKILL'), 5_000).unref()
}, TIMEOUT_MS)

child.on('exit', (code, signal) => {
  clearTimeout(timer)
  if (signal === 'SIGTERM') {
    process.exit(1)
  }
  process.exit(code ?? 1)
})

child.on('error', (error) => {
  clearTimeout(timer)
  console.error(error)
  process.exit(1)
})
