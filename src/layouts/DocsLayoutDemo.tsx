import Badge from '../components/ui/Badge.tsx'
import { BookIcon, SearchIcon } from '../components/ui/icons.tsx'

const SIDEBAR = [
  { label: '快速开始', active: true },
  { label: '安装' },
  { label: '主题与配色' },
  { label: '组件' },
  { label: '部署' },
]

const TOC = ['前置条件', '安装依赖', '引入样式', '验证效果', '下一步']

export default function DocsLayoutDemo() {
  return (
    <div className="flex h-full flex-col bg-surface">
      {/* 顶栏 */}
      <header className="flex items-center gap-3 border-b border-line/70 px-4 py-2.5">
        <span className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-xl bg-linear-to-br from-primary to-primary-2 text-on-primary">
            <BookIcon className="size-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink">maoyusu docs</span>
        </span>

        <span className="ml-4 flex h-8 w-56 items-center gap-1.5 rounded-full bg-surface-2 px-2.5 text-xs text-ink-subtle shadow-clay-inset">
          <SearchIcon className="size-3.5" />
          搜索文档…
        </span>

        <div className="ml-auto flex items-center gap-2">
          <Badge tone="neutral">v0.1</Badge>
          <span className="text-xs text-ink-muted">GitHub</span>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[170px_1fr_150px]">
        {/* 左侧目录 */}
        <aside className="min-h-0 overflow-auto border-r border-line/70 p-3">
          <p className="px-2 pb-2 font-mono text-[10px] tracking-[0.16em] text-ink-subtle uppercase">
            指南
          </p>
          <nav className="space-y-0.5">
            {SIDEBAR.map((item) => (
              <span
                key={item.label}
                className={[
                  'block rounded-field px-2.5 py-1.5 text-[13px]',
                  item.active ? 'bg-primary-soft font-medium text-primary' : 'text-ink-muted',
                ].join(' ')}
              >
                {item.label}
              </span>
            ))}
          </nav>
        </aside>

        {/* 正文 */}
        <article className="min-h-0 overflow-auto px-6 py-5">
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink-subtle uppercase">
            指南 / 快速开始
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink">5 分钟接入</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            这套组件库基于 Vite + React + Tailwind CSS 4，颜色、圆角、阴影全部走语义
            token，复制组件即可直接用。
          </p>

          <h3 className="mt-5 text-sm font-semibold text-ink">安装依赖</h3>
          <pre className="mt-2 overflow-x-auto rounded-field bg-surface-2 p-3 font-mono text-[11px] leading-relaxed text-ink-muted shadow-clay-inset">
            {`pnpm add @maoyusu/ui\n\n# 或\nnpm i @maoyusu/ui`}
          </pre>

          <h3 className="mt-5 text-sm font-semibold text-ink">引入样式</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            在入口文件里引入一次主题样式，暗色模式会给 <code>html</code> 加 <code>.dark</code>。
          </p>
          <pre className="mt-2 overflow-x-auto rounded-field bg-surface-2 p-3 font-mono text-[11px] leading-relaxed text-ink-muted shadow-clay-inset">
            {`import '@maoyusu/ui/styles.css'`}
          </pre>

          <div className="mt-4 flex items-start gap-2 rounded-field border border-info/25 bg-info-soft/60 p-3 text-xs text-ink-muted">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-info" />
            提示：暗色模式下字号不变，只替换颜色 token，因此不需要为两套主题各写一遍样式。
          </div>
        </article>

        {/* 右侧本页目录 */}
        <aside className="min-h-0 overflow-auto border-l border-line/70 p-3">
          <p className="px-1 pb-2 font-mono text-[10px] tracking-[0.16em] text-ink-subtle uppercase">
            本页目录
          </p>
          <ul className="space-y-1.5 border-l border-line/70 pl-2">
            {TOC.map((item, index) => (
              <li
                key={item}
                className={[
                  'text-[11px] leading-relaxed',
                  index === 0 ? 'font-medium text-primary' : 'text-ink-subtle',
                ].join(' ')}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
