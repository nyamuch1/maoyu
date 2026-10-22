type SwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
  disabled?: boolean
}

/** 柔和糖果风开关：选中态用品牌渐变，未选中是内凹凹槽 */
export default function Switch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}: SwitchProps) {
  return (
    <div className="flex items-start justify-between gap-5">
      <div className="space-y-0.5">
        <p className="text-sm text-ink">{label}</p>
        {description ? <p className="text-xs text-ink-subtle">{description}</p> : null}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          'relative h-7 w-12 shrink-0 rounded-full transition-all duration-200 outline-none',
          'focus-visible:ring-4 focus-visible:ring-primary/25',
          'disabled:cursor-not-allowed disabled:opacity-45',
          checked
            ? 'bg-linear-to-r from-primary to-primary-2 shadow-clay-sm'
            : 'bg-surface-3 shadow-clay-inset',
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 left-0.5 block size-6 rounded-full bg-white shadow-sm',
            'transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-0',
          ].join(' ')}
        />
      </button>
    </div>
  )
}
