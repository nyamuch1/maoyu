import { createContext, useContext } from 'react'
import type { ThemeSpeed } from '../config/motion.ts'
import type { ResolvedTheme, ThemeMode, ThemeOrigin, ThemeTransition } from '../hooks/useTheme.ts'

export type ThemeContextValue = {
  mode: ThemeMode
  resolved: ResolvedTheme
  transition: ThemeTransition
  speed: ThemeSpeed
  setMode: (mode: ThemeMode, origin?: ThemeOrigin) => void
  setTransition: (transition: ThemeTransition) => void
  setSpeed: (speed: ThemeSpeed) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

/** 读取全局主题状态（必须包在 <ThemeProvider> 内） */
export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside <ThemeProvider>')
  return value
}
