import type { ReactNode } from 'react'
import { AlertIcon, CheckCircleIcon, CloseIcon, InfoIcon, SparklesIcon } from './icons.tsx'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'brand'

const TONE: Record<AlertTone, { wrap: string; icon: ReactNode }> = {
  info: {
    wrap: 'border-info/25 bg-info-soft/70',
    icon: <InfoIcon className="size-4.5 text-info" />,
  },
  success: {
    wrap: 'border-success/25 bg-success-soft/70',
    icon: <CheckCircleIcon className="size-4.5 text-success" />,
  },
  warning: {
    wrap: 'border-warning/30 bg-warning-soft/70',
    icon: <AlertIcon className="size-4.5 text-warning" />,
  },
  danger: {
    wrap: 'border-danger/25 bg-danger-soft/70',
    icon: <AlertIcon className="size-4.5 text-danger" />,
  },
  brand: {
    wrap: 'border-primary/25 bg-primary-soft/60',
    icon: <SparklesIcon className="size-4.5 text-primary" />,
  },
}

const TITLE: Record<AlertTone, string> = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  brand: 'text-primary',
}

type AlertProps = {
  tone?: AlertTone
  title: string
  children?: ReactNode
  onClose?: () => void
}

export default function Alert({ tone = 'info', title, children, onClose }: AlertProps) {
  return (
    <div
      role="alert"
      className={['flex items-start gap-3 rounded-card border p-4', TONE[tone].wrap].join(' ')}
    >
      <span className="mt-0.5 shrink-0">{TONE[tone].icon}</span>

      <div className="min-w-0 flex-1">
        <p className={['text-sm font-medium', TITLE[tone]].join(' ')}>{title}</p>
        {children ? <div className="mt-0.5 text-sm text-ink-muted">{children}</div> : null}
      </div>

      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭提示"
          className="shrink-0 rounded-full p-1 text-ink-subtle transition-colors hover:bg-surface/60 hover:text-ink focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none"
        >
          <CloseIcon className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
