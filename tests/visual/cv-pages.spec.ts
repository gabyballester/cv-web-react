import { expect, test } from '@playwright/test'

test('visual regression for both A4 CV pages', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.evaluate(async () => {
    await document.fonts.ready
  })

  const cvPages = page.locator('.a4-page')
  await expect(cvPages).toHaveCount(2)

  await expect(cvPages.nth(0)).toHaveScreenshot('cv-page-1.png', {
    animations: 'disabled',
    caret: 'hide',
    scale: 'css',
  })
  await expect(cvPages.nth(1)).toHaveScreenshot('cv-page-2.png', {
    animations: 'disabled',
    caret: 'hide',
    scale: 'css',
  })
})
