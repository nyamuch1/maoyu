import type { ReactNode } from 'react'

type SegmentedOption<T extends string> = {
  value: T
  label: string
  icon?: ReactNode
}

type SegmentedProps<T extends string> = {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
  ariaLabel?: string
  /** 只显示图标（文字给屏幕阅读器），用于窄屏 */
  iconOnly?: boolean
}

/** 分段控件：选中项为浮起胶囊 + 柔和投影，容器是内凹凹槽 */
export default function Segmented<T extends string>({
  options,
  value,
  onChange,
  className = '',
  ariaLabel = '分段选择',
  iconOnly = false,
}: SegmentedProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={[
        'inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-surface-2 p-1 shadow-clay-inset',
        className,
      ].join(' ')}
    >
      {options.map((option) => {
        const selected = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={[
              'flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-all duration-200 outline-none',
              'focus-visible:ring-4 focus-visible:ring-primary/25',
              iconOnly ? 'px-2.5' : '',
              selected ? 'bg-raised text-ink shadow-clay-sm' : 'text-ink-muted hover:text-ink',
            ].join(' ')}
          >
            {option.icon}
            <span className={iconOnly ? 'sr-only' : ''}>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
