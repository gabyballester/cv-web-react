import type { Page } from '@playwright/test'

/** Wait for the CV shell without `networkidle` (can hang on static SPAs). */
export async function gotoCvReady(page: Page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.locator('.a4-page').first().waitFor({ state: 'visible' })
  await page.evaluate(async () => {
    await document.fonts.ready
  })
}
