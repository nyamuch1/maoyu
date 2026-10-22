import { NavLink, Outlet } from 'react-router-dom'
import { componentsNav } from './navigation.ts'

const sideLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors',
    isActive
      ? 'bg-raised font-medium text-ink shadow-clay-sm'
      : 'text-ink-muted hover:bg-surface/60 hover:text-ink',
  ].join(' ')

const pillClass = ({ isActive }: { isActive: boolean }) =>
  [
    'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-colors',
    isActive ? 'bg-raised font-medium text-ink shadow-clay-sm' : 'bg-surface-2 text-ink-muted',
  ].join(' ')

/** 组件库二级布局：桌面左侧目录 + 窄屏横向胶囊导航 */
export default function ComponentsLayout() {
  return (
    <div className="flex gap-10 py-8">
      <aside className="hidden w-48 shrink-0 lg:block">
        <nav className="sticky top-24 space-y-1">
          <p className="px-3 pb-2 font-mono text-[10px] tracking-[0.18em] text-ink-subtle uppercase">
            Components
          </p>

          {componentsNav.map((item) => (
            <NavLink key={item.key} to={item.to} className={sideLinkClass}>
              <span className="font-mono text-[10px] opacity-60">{item.index}</span>
              {item.label}
            </NavLink>
          ))}

          <div className="mt-6 rounded-card border border-line/70 bg-surface p-4 shadow-clay-sm">
            <p className="text-xs font-medium text-ink">明暗三档</p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-subtle">
              右上角可切换「跟随系统 / 浅色 / 深色」，选择会记住。
            </p>
          </div>
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <nav
          aria-label="组件分类"
          className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden"
        >
          {componentsNav.map((item) => (
            <NavLink key={item.key} to={item.to} className={pillClass}>
              <span className="font-mono text-[10px] opacity-60">{item.index}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Outlet />
      </div>
    </div>
  )
}
