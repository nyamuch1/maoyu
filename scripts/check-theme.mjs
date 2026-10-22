/* global document, getComputedStyle */
import { chromium } from 'playwright-core'

const base = process.argv[2] ?? 'http://localhost:5173'
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

const header = page.locator('header')
const settings = page.locator('main')

const pickTheme = (label) => header.getByRole('tab', { name: label }).click()
const pickTransition = (label) => settings.getByRole('tab', { name: label }).click()

const snapshot = () =>
  page.evaluate(() => {
    const root = document.documentElement
    const h1 = document.querySelector('h1')
    const navLink = document.querySelector('header nav a')
    const animations = document.getAnimations()

    return {
      dark: root.classList.contains('dark'),
      instant: root.classList.contains('theme-instant'),
      fallbackFade: root.classList.contains('theme-transitioning'),
      vtCircle: root.classList.contains('theme-vt-circle'),
      viewTransitions: animations.filter((animation) =>
        (animation.effect?.pseudoElement ?? '').includes('view-transition'),
      ).length,
      h1Color: h1 ? getComputedStyle(h1).color : null,
      navBg: navLink ? getComputedStyle(navLink).backgroundColor : null,
      navTransition: navLink ? getComputedStyle(navLink).transitionDuration : null,
    }
  })

const INK_LIGHT = 'rgb(34, 28, 51)'
const INK_DARK = 'rgb(243, 240, 255)'
const results = {}

await page.goto(`${base}/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)

/* ---- 淡入淡出：整页快照淡入；DOM 颜色应立刻到位，不再「字体滞后」 ---- */
await pickTransition('淡入淡出')
await pickTheme('深色')
await page.waitForTimeout(70)
results.fadeDuring = await snapshot()
await page.waitForTimeout(700)
results.fadeAfter = await snapshot()
results.fadeColorInstant = results.fadeDuring.h1Color === INK_DARK
results.fadeHasSnapshot = results.fadeDuring.viewTransitions > 0

/* ---- 圆形扩散 ---- */
await pickTransition('圆形扩散')
await pickTheme('浅色')
await page.waitForTimeout(110)
results.circleDuring = await snapshot()
await page.waitForTimeout(800)
results.circleAfter = await snapshot()
results.circleOk =
  results.circleDuring.viewTransitions > 0 &&
  results.circleDuring.vtCircle === true &&
  results.circleAfter.vtCircle === false &&
  results.circleDuring.h1Color === INK_LIGHT

/* ---- 无动画：无快照，且导航链接背景不能有渐变（两次采样一致） ---- */
await pickTransition('无动画')
await pickTheme('深色')
await page.waitForTimeout(30)
results.noneEarly = await snapshot()
await page.waitForTimeout(140)
results.noneLater = await snapshot()
results.noneInstant =
  results.noneEarly.viewTransitions === 0 && results.noneEarly.navBg === results.noneLater.navBg

/* ---- 系统「减少动态效果」：直接切换 ---- */
await page.emulateMedia({ reducedMotion: 'reduce' })
await pickTransition('淡入淡出')
await pickTheme('浅色')
await page.waitForTimeout(60)
results.reducedMotion = await snapshot()
await page.waitForTimeout(400)
results.reducedMotionAfter = await snapshot()

await browser.close()
console.log(JSON.stringify(results, null, 2))
