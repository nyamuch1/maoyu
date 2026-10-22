import type { ReactNode } from 'react'
import type { ComponentNavItem } from '../../app/navigation.ts'

type PageShellProps = {
  item: ComponentNavItem
  children: ReactNode
}

/** 组件页外壳：面包屑式小标题 + 页面标题 + 白色软卡片 */
export default function PageShell({ item, children }: PageShellProps) {
  return (
    <article className="space-y-6">
      <header className="px-1">
        <p className="font-mono text-[11px] tracking-[0.18em] text-ink-subtle uppercase">
          Components / {item.index}
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">{item.title}</h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
          {item.description}
        </p>
      </header>

      <div className="rounded-card border border-line/70 bg-surface p-5 shadow-clay sm:p-7">
        {children}
      </div>
    </article>
  )
}
