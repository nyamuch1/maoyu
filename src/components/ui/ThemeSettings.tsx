import { useRef } from 'react'
import { useTheme } from '../../app/theme-context.ts'
import { SPEED_DURATION, type ThemeSpeed } from '../../config/motion.ts'
import type { ThemeMode } from '../../hooks/useTheme.ts'
import Segmented from './Segmented.tsx'
import { MonitorIcon, MoonIcon, SunIcon } from './icons.tsx'

const MODE_OPTIONS = [
  { value: 'system' as const, label: '跟随系统', icon: <MonitorIcon className="size-3.5" /> },
  { value: 'light' as const, label: '浅色', icon: <SunIcon className="size-3.5" /> },
  { value: 'dark' as const, label: '深色', icon: <MoonIcon className="size-3.5" /> },
]

const TRANSITION_OPTIONS = [
  { value: 'fade' as const, label: '淡入淡出' },
  { value: 'circle' as const, label: '圆形扩散' },
  { value: 'none' as const, label: '无动画' },
]

const SPEED_OPTIONS: { value: ThemeSpeed; label: string }[] = [
  { value: 'fast', label: '快' },
  { value: 'normal', label: '标准' },
  { value: 'slow', label: '慢' },
]

const RESOLVED_LABEL = { light: '浅色', dark: '深色' } as const

/** 主题设置卡片：明暗模式 + 切换动画 + 动画时长，状态来自全局 ThemeProvider */
export default function ThemeSettings() {
  const { mode, resolved, transition, speed, setMode, setTransition, setSpeed } = useTheme()
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMode = (next: ThemeMode) => {
    const rect = cardRef.current?.getBoundingClientRect()
    setMode(
      next,
      rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined,
    )
  }

  return (
    <div ref={cardRef} className="rounded-card border border-line/70 bg-surface p-6 shadow-clay">
      <h2 className="text-base font-medium text-ink">主题与切换动画</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
        明暗模式、动画类型、动画时长可自由组合，选择会存进 localStorage。
      </p>

      <div className="mt-4 space-y-4">
        <div>
          <p className="mb-1.5 font-mono text-[10px] tracking-[0.16em] text-ink-subtle uppercase">
            明暗模式
          </p>
          <Segmented
            ariaLabel="明暗模式"
            value={mode}
            onChange={handleMode}
            options={MODE_OPTIONS}
          />
        </div>

        <div>
          <p className="mb-1.5 font-mono text-[10px] tracking-[0.16em] text-ink-subtle uppercase">
            切换动画
          </p>
          <Segmented
            ariaLabel="主题切换动画"
            value={transition}
            onChange={setTransition}
            options={TRANSITION_OPTIONS}
          />
        </div>

        <div>
          <p className="mb-1.5 font-mono text-[10px] tracking-[0.16em] text-ink-subtle uppercase">
            动画时长
          </p>
          <Segmented
            ariaLabel="动画时长"
            value={speed}
            onChange={setSpeed}
            options={SPEED_OPTIONS}
          />
          <p className="mt-1.5 text-xs text-ink-subtle">
            圆形扩散 {SPEED_DURATION[speed].circle}ms · 淡入淡出 {SPEED_DURATION[speed].fade}ms
            <span className="mx-1.5">·</span>
            时长表见 <code className="font-mono">src/config/motion.ts</code>
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink-subtle">
        当前生效：<span className="text-ink">{RESOLVED_LABEL[resolved]}</span>
        <span className="mx-1.5">·</span>
        系统开启「减少动态效果」时会自动降级为无动画
      </p>
    </div>
  )
}
