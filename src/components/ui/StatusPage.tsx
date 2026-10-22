import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { STATUS_COPY, type StatusCode } from '../../config/status-pages.ts'
import { buttonClass } from './buttonClasses.ts'
import { ArrowLeftIcon, HomeIcon, RefreshIcon } from './icons.tsx'
import { usePageTitle } from '../../hooks/usePageTitle.ts'

type StatusPageProps = {
  code: StatusCode
  /** 占满整屏（独立错误页用），否则嵌在站点外壳里 */
  full?: boolean
  /** 紧凑模式：用于示例站点内部的 404 */
  compact?: boolean
  backTo?: string
  backLabel?: string
  /** 开发环境展示的原始错误信息 */
  details?: string
  children?: ReactNode
}

/** 统一的状态页：403 / 404 / 500 / 502 / 503，自带明暗主题与操作入口 */
export default function StatusPage({
  code,
  full = false,
  compact = false,
  backTo = '/',
  backLabel = '回到首页',
  details,
  children,
}: StatusPageProps) {
  const navigate = useNavigate()
  const copy = STATUS_COPY[code]
  usePageTitle(`${code} · ${copy.title}`)
  const [requestId] = useState(() => Math.random().toString(16).slice(2, 10).toUpperCase() + '-ERR')

  return (
    <section
      className={[
        'relative flex flex-col items-center justify-center overflow-hidden px-6 text-center',
        full ? 'min-h-dvh' : compact ? 'min-h-[44vh] py-12' : 'min-h-[60vh] py-16',
      ].join(' ')}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 -bottom-24 size-56 rounded-full bg-info/10 blur-3xl"
      />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-danger">
          <span className="size-1.5 rounded-full bg-danger" />
          HTTP {code}
        </span>

        <p className="mt-4 bg-linear-to-br from-primary to-primary-2 bg-clip-text font-mono text-7xl font-bold tracking-tight text-transparent sm:text-8xl">
          {code}
        </p>

        <h1 className="mt-3 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {copy.title}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
          {copy.description}
        </p>

        {details ? (
          <pre className="mx-auto mt-3 max-w-md overflow-x-auto rounded-field bg-surface-2 p-2.5 text-left font-mono text-[10px] leading-relaxed text-ink-subtle shadow-clay-inset">
            {details}
          </pre>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Link to={backTo} className={buttonClass()}>
            <HomeIcon className="size-4" />
            {backLabel}
          </Link>

          {compact ? null : (
            <>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={buttonClass({ variant: 'secondary' })}
              >
                <ArrowLeftIcon className="size-4" />
                返回上一页
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className={buttonClass({ variant: 'ghost' })}
              >
                <RefreshIcon className="size-4" />
                重新加载
              </button>
            </>
          )}
        </div>

        {compact ? null : (
          <dl className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-2 text-left sm:grid-cols-3">
            {[
              { label: '状态码', value: String(code) },
              { label: '请求 ID', value: requestId },
              { label: '建议', value: copy.tip },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-field bg-surface-2/70 p-2.5 shadow-clay-inset"
              >
                <dt className="font-mono text-[10px] tracking-[0.14em] text-ink-subtle uppercase">
                  {item.label}
                </dt>
                <dd className="mt-1 text-[11px] leading-relaxed break-all text-ink">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {children}

        {full ? (
          <p className="mt-6 text-[11px] text-ink-subtle">
            想看其他状态页？
            <Link to="/errors" className="ml-1 text-primary hover:underline">
              错误页目录
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  )
}
