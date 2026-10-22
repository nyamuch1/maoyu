import { useRef } from 'react'
import type { ThemeMode, ThemeOrigin } from '../../hooks/useTheme.ts'
import Segmented from './Segmented.tsx'
import { MonitorIcon, MoonIcon, SunIcon } from './icons.tsx'

type ThemeToggleProps = {
  mode: ThemeMode
  onChange: (mode: ThemeMode, origin?: ThemeOrigin) => void
}

const OPTIONS = [
  { value: 'system' as const, label: '跟随系统', icon: <MonitorIcon className="size-3.5" /> },
  { value: 'light' as const, label: '浅色', icon: <SunIcon className="size-3.5" /> },
  { value: 'dark' as const, label: '深色', icon: <MoonIcon className="size-3.5" /> },
]

/** 取切换器中心，作为「圆形扩散」动画的圆心 */
function centerOf(element: HTMLElement | null): ThemeOrigin | undefined {
  if (!element) return undefined
  const rect = element.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

export default function ThemeToggle({ mode, onChange }: ThemeToggleProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  const handleChange = (next: ThemeMode) => {
    onChange(next, centerOf(rootRef.current))
  }

  return (
    <div ref={rootRef} className="flex items-center">
      {/* 窄屏：只显示图标 */}
      <span className="sm:hidden">
        <Segmented
          iconOnly
          ariaLabel="切换主题（跟随系统 / 浅色 / 深色）"
          value={mode}
          onChange={handleChange}
          options={OPTIONS}
        />
      </span>

      {/* 宽屏：图标 + 文字 */}
      <span className="hidden sm:block">
        <Segmented
          ariaLabel="切换主题（跟随系统 / 浅色 / 深色）"
          value={mode}
          onChange={handleChange}
          options={OPTIONS}
        />
      </span>
    </div>
  )
}
