import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle.ts'

const LINKS = [
  { to: '/landing', label: '营销首页' },
  { to: '/pricing', label: '价格' },
  { to: '/login', label: '登录' },
  { to: '/admin', label: '后台' },
  { to: '/layouts', label: '布局画廊' },
]

type DemoPageProps = {
  title: string
  children: ReactNode
}

/** 独立单页示例（营销首页 / 价格页 / 登录页）的外壳：右下角挂站点间跳转 */
export default function DemoPage({ title, children }: DemoPageProps) {
  usePageTitle(title)

  return (
    <div className="relative min-h-dvh bg-surface text-ink">
      {children}

      <nav className="fixed right-4 bottom-4 z-50 flex flex-wrap justify-end gap-1.5 rounded-full border border-line/70 bg-surface/90 p-1.5 shadow-clay backdrop-blur">
        {LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="rounded-full px-2.5 py-1.5 text-[11px] text-ink-muted transition-colors hover:bg-primary-soft hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
