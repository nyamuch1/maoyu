import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import ThemeToggle from '../components/ui/ThemeToggle.tsx'
import { usePageTitle } from '../hooks/usePageTitle.ts'
import { useTheme } from './theme-context.ts'

const NAV = [
  { to: '/', label: '首页', end: true },
  { to: '/components', label: '组件库' },
  { to: '/layouts', label: '布局' },
  { to: '/errors', label: '错误页' },
]

const headerLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-3 py-1.5 text-sm transition-colors',
    isActive ? 'bg-raised font-medium text-ink shadow-clay-sm' : 'text-ink-muted hover:text-ink',
  ].join(' ')

const pillLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'shrink-0 rounded-full px-2.5 py-1.5 text-[12px] transition-colors',
    isActive ? 'bg-raised font-medium text-ink shadow-clay-sm' : 'text-ink-muted',
  ].join(' ')

const PAGE_TITLES: Record<string, string> = {
  '/': '首页',
  '/layouts': '常见布局',
  '/errors': '错误页',
}

const COMPONENT_TITLES: Record<string, string> = {
  tokens: '基础配色',
  buttons: '按钮',
  selection: '选择与状态',
  form: '表单',
  table: '表格',
  feedback: '反馈与展示',
}

function titleForPath(pathname: string): string | undefined {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/components')) {
    const slug = pathname.split('/')[2]
    return slug && COMPONENT_TITLES[slug] ? `组件 · ${COMPONENT_TITLES[slug]}` : '组件库'
  }
  // 未知路径（404）：交给 NotFoundPage 自己设置标题
  return undefined
}

/** 全站外壳：吸顶头部（桌面导航 + 移动端胶囊导航 + 主题切换）+ 内容区 + 页脚 */
export default function AppLayout() {
  const { mode, setMode } = useTheme()
  const { pathname } = useLocation()
  usePageTitle(titleForPath(pathname))

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
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={headerLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle mode={mode} onChange={setMode} />
          </div>
        </div>

        {/* 移动端导航：桌面导航在 md 以下隐藏，这里补一排可横滑的胶囊 */}
        <nav
          aria-label="站点导航"
          className="mx-auto flex max-w-[1180px] gap-1 overflow-x-auto px-4 pb-2 md:hidden"
        >
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={pillLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
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
