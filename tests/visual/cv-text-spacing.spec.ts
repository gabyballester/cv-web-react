import { expect, test } from '@playwright/test'

test('WCAG text spacing override keeps content usable', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.evaluate(async () => {
    await document.fonts.ready
  })

  // Simulate user text-spacing overrides from WCAG 1.4.12.
  await page.addStyleTag({
    content: `
      .a4-page {
        height: auto !important;
        max-height: none !important;
        overflow: visible !important;
      }
      .cv-grid {
        height: auto !important;
        max-height: none !important;
        overflow: visible !important;
      }
      .a4-page * {
        letter-spacing: 0.12em !important;
        word-spacing: 0.16em !important;
        line-height: 1.5 !important;
      }
      .a4-page p,
      .a4-page li {
        margin-bottom: 2em !important;
      }
    `,
  })

  const pages = page.locator('.a4-page')
  await expect(pages).toHaveCount(2)

  const hasHorizontalOverflow = await page.evaluate(() => {
    const root = document.documentElement
    return root.scrollWidth > root.clientWidth + 1
  })
  expect(hasHorizontalOverflow).toBe(false)

  const contentClipped = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLElement>('.a4-page')).some((el) => {
      const style = window.getComputedStyle(el)
      return style.overflow === 'hidden' && el.scrollHeight > el.clientHeight + 1
    }),
  )
  expect(contentClipped).toBe(false)
})
