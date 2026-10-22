import { useCallback, useEffect, useState } from 'react'
import {
  CIRCLE_EASING,
  DEFAULT_SPEED,
  FADE_EASING,
  SPEED_DURATION,
  type ThemeSpeed,
} from '../config/motion.ts'

export type { ThemeSpeed }

/** 手动指定 light / dark，或 system 跟随操作系统 */
export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'
/** 主题切换动画：淡入淡出 / 圆形扩散（View Transitions）/ 无动画 */
export type ThemeTransition = 'fade' | 'circle' | 'none'
/** 圆形扩散的圆心（一般取切换按钮中心） */
export type ThemeOrigin = { x: number; y: number }

const MODE_KEY = 'maoyusu-theme'
const TRANSITION_KEY = 'maoyusu-theme-transition'
const SPEED_KEY = 'maoyusu-theme-speed'

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system'
  const saved = window.localStorage.getItem(MODE_KEY)
  if (saved === 'light' || saved === 'dark' || saved === 'system') return saved
  return 'system'
}

function readTransition(): ThemeTransition {
  if (typeof window === 'undefined') return 'fade'
  const saved = window.localStorage.getItem(TRANSITION_KEY)
  if (saved === 'fade' || saved === 'circle' || saved === 'none') return saved
  return 'fade'
}

function readSpeed(): ThemeSpeed {
  if (typeof window === 'undefined') return DEFAULT_SPEED
  const saved = window.localStorage.getItem(SPEED_KEY)
  if (saved === 'fast' || saved === 'normal' || saved === 'slow') return saved
  return DEFAULT_SPEED
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** 真正落地主题：只改 <html> 的 class 与 color-scheme */
function commitTheme(next: ResolvedTheme) {
  const root = document.documentElement
  root.classList.toggle('dark', next === 'dark')
  root.style.colorScheme = next
}

/**
 * 立即切换：切换的瞬间禁用所有过渡。
 * 有些元素常驻了 transition-colors（导航、链接、按钮），
 * 不禁用的话它们的颜色变化会被自己那 150ms 的过渡拖慢。
 */
function commitThemeInstant(next: ResolvedTheme) {
  const root = document.documentElement
  root.classList.add('theme-instant')
  // 强制回流：确保“禁用过渡”先生效，再改颜色
  void root.offsetHeight
  commitTheme(next)

  // 两帧后恢复，避免长期关掉交互动画
  requestAnimationFrame(() => {
    requestAnimationFrame(() => root.classList.remove('theme-instant'))
  })
}

type ViewTransitionLike = { ready: Promise<void>; finished: Promise<void> }
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionLike
}

function startViewTransition(next: ResolvedTheme): ViewTransitionLike | null {
  const doc = document as unknown as ViewTransitionDocument
  if (!doc.startViewTransition) return null
  return doc.startViewTransition(() => commitThemeInstant(next))
}

let fadeTimer: number | undefined

/** 降级方案：不支持 View Transitions 时，用临时过渡类做颜色渐变 */
function applyFallbackFade(next: ResolvedTheme, duration: number) {
  const root = document.documentElement
  root.style.setProperty('--theme-fallback-ms', `${duration}ms`)
  root.classList.add('theme-transitioning')
  void root.offsetHeight
  commitTheme(next)

  window.clearTimeout(fadeTimer)
  fadeTimer = window.setTimeout(() => {
    root.classList.remove('theme-transitioning')
    fadeTimer = undefined
  }, duration)
}

/**
 * View Transitions 方案：
 * 浏览器给切换前后各拍一张快照，再用 Web Animations 驱动快照（淡入 / 圆形扩散），
 * 整页（文字、背景、阴影、图标）一起过渡，时长由 src/config/motion.ts 决定。
 */
function applyViewTransition(
  next: ResolvedTheme,
  kind: 'fade' | 'circle',
  speed: ThemeSpeed,
  origin?: ThemeOrigin,
) {
  const root = document.documentElement
  const durations = SPEED_DURATION[speed]
  const duration = kind === 'circle' ? durations.circle : durations.fade

  if (kind === 'circle') root.classList.add('theme-vt-circle')

  let transition: ViewTransitionLike | null = null
  try {
    transition = startViewTransition(next)
  } catch {
    // 动画进行中重复调用可能抛错，交给下面的降级分支
  }

  if (!transition) {
    root.classList.remove('theme-vt-circle')
    applyFallbackFade(next, durations.fallback)
    return
  }

  void transition.ready
    .then(() => {
      if (kind === 'circle') {
        const x = origin?.x ?? window.innerWidth / 2
        const y = origin?.y ?? 40
        const radius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        )

        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
          },
          {
            duration,
            easing: CIRCLE_EASING,
            pseudoElement: '::view-transition-new(root)',
          },
        )
        return
      }

      document.documentElement.animate(
        { opacity: [0, 1] },
        { duration, easing: FADE_EASING, pseudoElement: '::view-transition-new(root)' },
      )
    })
    .catch(() => {
      // 过渡被中断（例如窗口尺寸变化）时忽略，避免控制台出现未处理的 rejection
    })

  transition.finished
    .catch(() => {
      // 同上
    })
    .finally(() => {
      root.classList.remove('theme-vt-circle')
    })
}

function applyTheme(
  next: ResolvedTheme,
  transition: ThemeTransition,
  speed: ThemeSpeed,
  origin?: ThemeOrigin,
) {
  if (transition === 'none' || prefersReducedMotion()) {
    commitThemeInstant(next)
    return
  }

  applyViewTransition(next, transition, speed, origin)
}

/**
 * 主题状态机：
 * - mode: 跟随系统 / 浅色 / 深色
 * - resolved: 当前实际生效的明暗
 * - transition: 切换动画（fade / circle / none）
 * - speed: 动画时长（fast / normal / slow），见 src/config/motion.ts
 * 选择都持久化到 localStorage；系统档会监听 prefers-color-scheme。
 */
export function useThemeState() {
  const [mode, setModeState] = useState<ThemeMode>(readMode)
  const [transition, setTransitionState] = useState<ThemeTransition>(readTransition)
  const [speed, setSpeedState] = useState<ThemeSpeed>(readSpeed)
  const [resolved, setResolved] = useState<ResolvedTheme>(() => {
    const initial = readMode()
    return initial === 'system' ? getSystemTheme() : initial
  })

  // 首屏兜底：内联脚本已经写过 class，这里幂等同步一次（不动画）
  useEffect(() => {
    const initial = readMode()
    commitTheme(initial === 'system' ? getSystemTheme() : initial)
  }, [])

  // 跟随系统：系统切换时同步，并沿用当前动画设置
  useEffect(() => {
    if (mode !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const next: ResolvedTheme = media.matches ? 'dark' : 'light'
      setResolved(next)
      applyTheme(next, transition, speed)
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [mode, transition, speed])

  const setMode = useCallback(
    (next: ThemeMode, origin?: ThemeOrigin) => {
      const nextResolved: ResolvedTheme = next === 'system' ? getSystemTheme() : next
      if (next === mode && nextResolved === resolved) return

      window.localStorage.setItem(MODE_KEY, next)
      setModeState(next)
      setResolved(nextResolved)

      // 只是「system → light」这类同色切换时不做动画
      if (nextResolved !== resolved) applyTheme(nextResolved, transition, speed, origin)
    },
    [mode, resolved, transition, speed],
  )

  const setTransition = useCallback((next: ThemeTransition) => {
    window.localStorage.setItem(TRANSITION_KEY, next)
    setTransitionState(next)
  }, [])

  const setSpeed = useCallback((next: ThemeSpeed) => {
    window.localStorage.setItem(SPEED_KEY, next)
    setSpeedState(next)
  }, [])

  return { mode, resolved, transition, speed, setMode, setTransition, setSpeed }
}
