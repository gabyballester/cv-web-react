import { defineConfig } from '@playwright/test'

const useBundledChromium = process.env.PW_BUNDLED_CHROMIUM === '1'

export default defineConfig({
  testDir: './tests/visual',
  timeout: 60_000,
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report/visual' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    viewport: { width: 1440, height: 2200 },
    colorScheme: 'light',
    locale: 'es-ES',
    timezoneId: 'Europe/Madrid',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...(useBundledChromium ? {} : { channel: 'chrome' }),
  },
  webServer: {
    command: 'pnpm exec vite preview --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
