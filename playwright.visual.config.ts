import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/visual',
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
  },
  webServer: {
    command: 'pnpm run build && pnpm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 180_000,
  },
})
