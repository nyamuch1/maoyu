import { Link } from 'react-router-dom'
import { componentsNav } from '../app/navigation.ts'
import Badge from '../components/ui/Badge.tsx'
import ThemeSettings from '../components/ui/ThemeSettings.tsx'
import { buttonClass } from '../components/ui/buttonClasses.ts'
import { AlertIcon, ChevronRightIcon, GridIcon } from '../components/ui/icons.tsx'

const STACK = ['Vite 7', 'React 19', 'React Router 7', 'Tailwind CSS 4', 'TypeScript 5.9']

const SWATCHES = [
  { name: '--canvas', className: 'bg-canvas' },
  { name: '--surface-2', className: 'bg-surface-2' },
  { name: '--primary', className: 'bg-primary' },
  { name: '--primary-soft', className: 'bg-primary-soft' },
  { name: '--success', className: 'bg-success' },
  { name: '--danger', className: 'bg-danger' },
]

export default function HomePage() {
  return (
    <div className="space-y-12 py-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-card border border-line/70 bg-surface p-6 shadow-clay sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/3 size-48 rounded-full bg-info/10 blur-3xl"
        />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="primary">Soft UI / Claymorphism</Badge>
            <Badge tone="success" dot>
              明暗三档
            </Badge>
            <Badge tone="neutral">React Router 7</Badge>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-[2.6rem]">
            柔和糖果组件库
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            大圆角、渐变主色、紫调柔光阴影；颜色全部走语义 token，一套组件同时适配明暗两种主题。
            组件按路由拆成独立页面，从左侧目录或下方卡片即可跳转。
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/components/buttons" className={buttonClass({ size: 'lg' })}>
              浏览组件
              <ChevronRightIcon className="size-4" />
            </Link>
            <Link
              to="/components/tokens"
              className={buttonClass({ variant: 'secondary', size: 'lg' })}
            >
              查看配色
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {STACK.map((item) => (
              <span
                key={item}
                className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-ink-subtle shadow-clay-inset"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 组件入口 */}
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2 px-1">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-ink">组件区块</h2>
            <p className="mt-1 text-sm text-ink-muted">
              共 {componentsNav.length} 个页面，都带真实交互。
            </p>
          </div>
          <Link
            to="/components/buttons"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            从按钮开始
            <ChevronRightIcon className="size-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {componentsNav.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className="group flex flex-col rounded-card border border-line/70 bg-surface p-5 shadow-clay-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-clay focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-ink-subtle">{item.index}</span>
                <ChevronRightIcon className="size-4 text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>

              <h3 className="mt-3 text-base font-medium text-ink">{item.label}</h3>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-muted">{item.summary}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-ink-subtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 布局示例入口 */}
      <section>
        <Link
          to="/layouts"
          className="group flex flex-wrap items-center gap-4 rounded-card border border-line/70 bg-surface p-6 shadow-clay-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-clay focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
            <GridIcon className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-medium text-ink">常见布局 Layouts</span>
            <span className="mt-0.5 block text-sm text-ink-muted">
              后台 / 内容社区 / 营销电商共 14 套布局，每套都有可交互的真实路由。
            </span>
          </span>
          <span className="flex items-center gap-1 text-sm text-primary">
            查看示例
            <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </section>

      {/* 错误页入口 */}
      <section>
        <Link
          to="/errors"
          className="group flex flex-wrap items-center gap-4 rounded-card border border-line/70 bg-surface p-6 shadow-clay-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-clay focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-danger-soft text-danger">
            <AlertIcon className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-medium text-ink">错误页 Errors</span>
            <span className="mt-0.5 block text-sm text-ink-muted">
              403 / 404 / 500 / 502 / 503 状态页，含路由兜底与网关静态页。
            </span>
          </span>
          <span className="flex items-center gap-1 text-sm text-primary">
            查看示例
            <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </section>

      {/* 主题设置 + 令牌 */}
      <section className="grid items-start gap-4 lg:grid-cols-2">
        <ThemeSettings />

        <div className="rounded-card border border-line/70 bg-surface p-6 shadow-clay">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-medium text-ink">语义化配色令牌</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                组件只写 <code className="font-mono text-xs">bg-surface</code> /{' '}
                <code className="font-mono text-xs">text-ink</code> /{' '}
                <code className="font-mono text-xs">border-line</code>，一套命名两套取值。
              </p>
            </div>
            <Link to="/components/tokens" className={buttonClass({ variant: 'ghost', size: 'sm' })}>
              全部
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {SWATCHES.map((item) => (
              <div
                key={item.name}
                className="overflow-hidden rounded-xl border border-line bg-surface-2"
              >
                <div className={['h-10 w-full', item.className].join(' ')} />
                <p className="truncate px-2 py-1.5 font-mono text-[10px] text-ink-subtle">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
