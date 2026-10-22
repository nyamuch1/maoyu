import type { ReactNode } from 'react'

export type BadgeTone = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

const TONE_CLASS: Record<BadgeTone, string> = {
  primary: 'bg-primary-soft text-primary',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  info: 'bg-info-soft text-info',
  neutral: 'bg-surface-3 text-ink-muted',
}

type BadgeProps = {
  tone?: BadgeTone
  dot?: boolean
  className?: string
  children: ReactNode
}

export default function Badge({
  tone = 'neutral',
  dot = false,
  className = '',
  children,
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap',
        TONE_CLASS[tone],
        className,
      ].join(' ')}
    >
      {dot ? <span className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  )
}
