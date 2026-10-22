import { Link } from 'react-router-dom'
import Badge from '../components/ui/Badge.tsx'
import { ArrowUpDownIcon, ChevronRightIcon, InfoIcon } from '../components/ui/icons.tsx'
import { STATUS_CODES, STATUS_COPY } from '../config/status-pages.ts'

const STATIC_PAGES = [
  { code: '404', file: 'public/404.html', usage: 'SPA 回落失败 / 静态资源不存在' },
  { code: '500', file: 'public/500.html', usage: '应用进程异常' },
  { code: '502', file: 'public/502.html', usage: '网关 / 上游服务无响应' },
  { code: '503', file: 'public/503.html', usage: '维护或过载（带自动刷新）' },
]

const NGINX = `# nginx 示例：静态错误页
error_page 404 /404.html;
error_page 500 /500.html;
error_page 502 /502.html;
error_page 503 /503.html;
error_page 504 /502.html;`

export default function ErrorCatalogPage() {
  return (
    <div className="space-y-6 py-8">
      <header className="px-1">
        <p className="font-mono text-[11px] tracking-[0.18em] text-ink-subtle uppercase">Errors</p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">错误页</h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
          统一的 403 / 404 / 500 / 502 / 503 状态页：路由级兜底、可分享的错误地址、
          以及给网关用的静态错误页。点任意一张卡片可以直接打开对应页面。
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STATUS_CODES.map((code) => {
          const copy = STATUS_COPY[code]
          return (
            <Link
              key={code}
              to={`/error/${code}`}
              className="group rounded-card border border-line/70 bg-surface p-5 shadow-clay-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-clay focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none"
            >
              <div className="flex items-start justify-between">
                <p className="bg-linear-to-br from-primary to-primary-2 bg-clip-text font-mono text-3xl font-bold tracking-tight text-transparent">
                  {code}
                </p>
                <ChevronRightIcon className="size-4 text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-2 text-sm font-medium text-ink">{copy.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">{copy.description}</p>
              <p className="mt-3 font-mono text-[10px] text-ink-subtle">/error/{code}</p>
            </Link>
          )
        })}

        <div className="rounded-card border border-dashed border-line bg-surface-2/40 p-5">
          <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
            <InfoIcon className="size-4 text-ink-subtle" />
            另外两种兜底
          </p>
          <ul className="mt-2 space-y-2 text-xs leading-relaxed text-ink-muted">
            <li>
              <Badge tone="neutral">路由</Badge> 未知地址落到站点内的 404，示例站点各自有自己的
              404。
            </li>
            <li>
              <Badge tone="danger">异常</Badge> 路由渲染报错由{' '}
              <code className="font-mono">errorElement</code> 接住，展示 500。
            </li>
          </ul>
        </div>
      </div>

      <section className="rounded-card border border-line/70 bg-surface p-5 shadow-clay-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium text-ink">网关 / 静态托管用的错误页</h2>
          <span className="flex items-center gap-1 font-mono text-[10px] text-ink-subtle">
            <ArrowUpDownIcon className="size-3" />
            public/*.html
          </span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
          502 / 503 通常由网关直接返回，前端路由来不及渲染，所以另外准备了纯静态版本（共用{' '}
          <code className="font-mono">public/error.css</code>）：
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {STATIC_PAGES.map((item) => (
            <div key={item.file} className="rounded-field bg-surface-2/60 p-3">
              <p className="flex items-baseline gap-2">
                <span className="font-mono text-sm font-semibold text-ink">{item.code}</span>
                <span className="font-mono text-[10px] text-ink-subtle">{item.file}</span>
              </p>
              <p className="mt-0.5 text-[11px] text-ink-muted">{item.usage}</p>
            </div>
          ))}
        </div>

        <pre className="mt-3 overflow-x-auto rounded-field bg-surface-2 p-3 font-mono text-[10px] leading-relaxed text-ink-muted shadow-clay-inset">
          {NGINX}
        </pre>
      </section>

      <p className="px-1 text-xs text-ink-subtle">
        状态页组件在 <code className="font-mono">src/components/ui/StatusPage.tsx</code>
        ，文案在 <code className="font-mono">src/config/status-pages.ts</code>
        ，新增状态码补一条即可。
      </p>
    </div>
  )
}
