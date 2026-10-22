import type { ReactNode } from 'react'
import { ThemeContext } from './theme-context.ts'
import { useThemeState } from '../hooks/useTheme.ts'

/** 全局主题状态：整个应用只跑一份状态机，避免多处 useTheme 各持一份 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useThemeState()

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
