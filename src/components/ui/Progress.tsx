export type ProgressTone = 'primary' | 'success' | 'warning' | 'danger'

const FILL: Record<ProgressTone, string> = {
  primary: 'bg-linear-to-r from-primary to-primary-2',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

type ProgressProps = {
  value: number
  label?: string
  tone?: ProgressTone
  showValue?: boolean
}

export default function Progress({
  value,
  label,
  tone = 'primary',
  showValue = true,
}: ProgressProps) {
  const percent = Math.min(100, Math.max(0, Math.round(value)))

  return (
    <div className="space-y-2">
      {label || showValue ? (
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="text-ink-muted">{label}</span>
          {showValue ? <span className="font-mono text-xs text-ink-subtle">{percent}%</span> : null}
        </div>
      ) : null}

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? '进度'}
        className="h-2.5 w-full overflow-hidden rounded-full bg-surface-3 shadow-clay-inset"
      >
        <div
          className={['h-full rounded-full transition-[width] duration-500', FILL[tone]].join(' ')}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
