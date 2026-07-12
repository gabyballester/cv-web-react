import { expect, test } from '@playwright/test'
import { gotoCvReady } from './helpers'

test('photo card keeps stable layout between ES and EN', async ({ page }) => {
  await gotoCvReady(page)

  const card = page.locator('.sidebar-cv-photo-card').first()
  await expect(card).toBeVisible()
  const esBox = await card.boundingBox()
  expect(esBox).not.toBeNull()

  const enToggle = page.locator('.toolbar-left button').nth(1)
  await expect(enToggle).toBeVisible()
  await enToggle.click()
  await expect
    .poll(async () => page.evaluate(() => document.documentElement.lang))
    .toBe('en')

  const enBox = await card.boundingBox()
  expect(enBox).not.toBeNull()

  const tolerance = 1
  expect(Math.abs((esBox?.width ?? 0) - (enBox?.width ?? 0))).toBeLessThanOrEqual(tolerance)
  expect(Math.abs((esBox?.height ?? 0) - (enBox?.height ?? 0))).toBeLessThanOrEqual(tolerance)
})
