import { Link, NavLink, Outlet } from 'react-router-dom'
import ThemeToggle from '../components/ui/ThemeToggle.tsx'
import { useTheme } from './theme-context.ts'

const headerLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-3 py-1.5 text-sm transition-colors',
    isActive ? 'bg-raised font-medium text-ink shadow-clay-sm' : 'text-ink-muted hover:text-ink',
  ].join(' ')

/** 全站外壳：吸顶头部（导航 + 主题切换）+ 内容区 + 页脚 */
export default function AppLayout() {
  const { mode, setMode } = useTheme()

  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-ink">
      <header className="sticky top-0 z-30 border-b border-line/80 bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center gap-3 px-5">
          <NavLink to="/" end className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-primary to-primary-2 text-sm font-bold text-on-primary shadow-clay-sm">
              m
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-semibold tracking-tight whitespace-nowrap">
                maoyusu UI
              </span>
              <span className="hidden text-[11px] whitespace-nowrap text-ink-subtle sm:block">
                Soft UI · 柔和糖果
              </span>
            </span>
          </NavLink>

          <nav className="ml-2 hidden items-center gap-1 md:flex">
            <NavLink to="/" end className={headerLinkClass}>
              首页
            </NavLink>
            <NavLink to="/components" className={headerLinkClass}>
              组件库
            </NavLink>
            <NavLink to="/layouts" className={headerLinkClass}>
              布局
            </NavLink>
            <NavLink to="/errors" className={headerLinkClass}>
              错误页
            </NavLink>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle mode={mode} onChange={setMode} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1180px] flex-1 px-5">
        <Outlet />
      </main>

      <footer className="border-t border-line/70">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-ink-subtle">
          <p>maoyusu · Soft UI 组件库 · 明暗双主题</p>
          <nav className="flex flex-wrap items-center gap-4">
            <Link to="/components/buttons" className="transition-colors hover:text-primary">
              组件库
            </Link>
            <Link to="/layouts" className="transition-colors hover:text-primary">
              布局画廊
            </Link>
            <Link
              to="/errors"
              className="font-medium text-ink-muted transition-colors hover:text-primary"
            >
              错误页
            </Link>
            <span className="font-mono">React Router 7 · Vite 7 · Tailwind CSS 4</span>
          </nav>
        </div>
      </footer>
    </div>
  )
}
