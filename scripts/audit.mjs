/* global document, window */
import { chromium } from 'playwright-core'

/**
 * 冒烟审计：路由可达性、页面标题、桌面/移动端横向溢出、控制台报错。
 * 用法：先 pnpm dev，再 node scripts/audit.mjs [baseUrl]
 */
const base = process.argv[2] ?? 'http://localhost:5173'

const ROUTES = [
  '/',
  '/components/buttons',
  '/layouts',
  '/errors',
  '/admin',
  '/admin/settings',
  '/admin/messages',
  '/community',
  '/community/t/1042',
  '/shop',
  '/shop/products/1042',
  '/shop/checkout',
  '/blog',
  '/blog/design-tokens',
  '/docs',
  '/docs/theme',
  '/landing',
  '/pricing',
  '/login',
  '/error/502',
  '/no-such-page',
]

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

const problems = []
page.on('console', (message) => {
  if (message.type() === 'error') problems.push(`console error: ${message.text()}`)
})
page.on('pageerror', (error) => problems.push(`page error: ${String(error)}`))
page.on('response', (response) => {
  if (response.status() >= 400) problems.push(`HTTP ${response.status()}: ${response.url()}`)
})

const desktop = []
for (const path of ROUTES) {
  const started = Date.now()
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(200)
  const info = await page.evaluate(() => ({
    title: document.title,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    activeNav: document.querySelectorAll('[aria-current="page"]').length,
  }))
  if (info.overflow > 1) problems.push(`desktop overflow ${info.overflow}px: ${path}`)
  if (!info.title.includes('maoyusu')) problems.push(`missing title: ${path} (${info.title})`)
  desktop.push({ path, ms: Date.now() - started, ...info })
}

// /docs 应该重定向到默认章节，否则侧栏没有高亮项
await page.goto(`${base}/docs`, { waitUntil: 'networkidle' })
if (!new URL(page.url()).pathname.startsWith('/docs/')) {
  problems.push('/docs 没有重定向到默认章节')
}

const mobile = []
await page.setViewportSize({ width: 390, height: 844 })
for (const path of ROUTES) {
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(160)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  )
  if (overflow > 1) problems.push(`mobile overflow ${overflow}px: ${path}`)
  mobile.push({ path, overflow })
}

await browser.close()

console.log('desktop:', JSON.stringify(desktop, null, 1))
console.log('mobile overflow:', JSON.stringify(mobile.filter((item) => item.overflow > 1)))
console.log(problems.length ? `PROBLEMS:\n${problems.join('\n')}` : 'OK: 没有发现问题')
process.exitCode = problems.length ? 1 : 0
