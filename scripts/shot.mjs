/* global document */
import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright-core'

const OUT = 'shots'
mkdirSync(OUT, { recursive: true })

const base = process.argv[2] ?? 'http://localhost:5173'
const PAGES = ['tokens', 'buttons', 'selection', 'form', 'table', 'feedback']

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

const errors = []
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text())
})
page.on('pageerror', (error) => errors.push(String(error)))

/* ---------------- 1. 路由可达性 ---------------- */
const report = []
for (const path of ['/', '/components', ...PAGES.map((p) => `/components/${p}`), '/not-a-page']) {
  const response = await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(250)
  const heading = await page.locator('h1').first().textContent()
  report.push({
    path,
    status: response?.status(),
    url: new URL(page.url()).pathname,
    heading: heading?.trim(),
  })
}
writeFileSync(`${OUT}/routes.json`, JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 1))

/* ---------------- 2. 主题三档 ---------------- */
const themeChecks = []
const htmlClass = () => page.evaluate(() => document.documentElement.className)
const storedMode = () => page.evaluate(() => localStorage.getItem('maoyusu-theme'))

await page.goto(`${base}/components/buttons`, { waitUntil: 'networkidle' })
themeChecks.push({ step: 'initial', stored: await storedMode(), html: await htmlClass() })

await page.getByRole('tab', { name: '深色' }).click()
await page.waitForTimeout(250)
themeChecks.push({ step: 'click-dark', stored: await storedMode(), html: await htmlClass() })

await page.reload({ waitUntil: 'networkidle' })
themeChecks.push({ step: 'reload', stored: await storedMode(), html: await htmlClass() })

await page.emulateMedia({ colorScheme: 'dark' })
await page.getByRole('tab', { name: '跟随系统' }).click()
await page.waitForTimeout(250)
themeChecks.push({ step: 'system+dark-os', stored: await storedMode(), html: await htmlClass() })

await page.emulateMedia({ colorScheme: 'light' })
await page.waitForTimeout(300)
themeChecks.push({ step: 'system+light-os', stored: await storedMode(), html: await htmlClass() })

writeFileSync(`${OUT}/theme-checks.json`, JSON.stringify(themeChecks, null, 2))
console.log(JSON.stringify(themeChecks, null, 1))

/* ---------------- 3. 截图：浅色 / 深色 ---------------- */
const setTheme = async (mode) => {
  await page.locator('header').getByRole('tab', { name: mode }).click()
  await page.waitForTimeout(300)
}

for (const theme of [
  { key: 'light', mode: '浅色' },
  { key: 'dark', mode: '深色' },
]) {
  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  await setTheme(theme.mode)
  await page.waitForTimeout(200)
  await page.screenshot({ path: `${OUT}/home-${theme.key}.png` })

  for (const slug of PAGES) {
    await page.goto(`${base}/components/${slug}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(250)
    await page.screenshot({ path: `${OUT}/page-${theme.key}-${slug}.png`, fullPage: true })
  }

  await page.goto(`${base}/not-a-page`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(200)
  await page.screenshot({ path: `${OUT}/page-${theme.key}-404.png` })
}

/* ---------------- 4. 移动端 ---------------- */
await page.goto(`${base}/`, { waitUntil: 'networkidle' })
await setTheme('浅色')
await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(300)
await page.screenshot({ path: `${OUT}/mobile-home.png` })

await page.goto(`${base}/components/buttons`, { waitUntil: 'networkidle' })
await page.waitForTimeout(300)
await page.screenshot({ path: `${OUT}/mobile-buttons.png` })

await browser.close()
console.log('console errors:', errors.length ? errors : 'none')
