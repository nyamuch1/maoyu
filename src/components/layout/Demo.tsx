import type { ReactNode } from 'react'

type DemoProps = {
  label: string
  hint?: string
  className?: string
  children: ReactNode
}

/** 区块里的子示例：左上角小标题 + 内容 */
export default function Demo({ label, hint, className = '', children }: DemoProps) {
  return (
    <div className={className}>
      <div className="mb-3 flex flex-wrap items-baseline gap-2">
        <span className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
          {label}
        </span>
        {hint ? <span className="text-xs text-ink-subtle">{hint}</span> : null}
      </div>
      {children}
    </div>
  )
}
