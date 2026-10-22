import { CheckIcon } from './icons.tsx'

type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  ariaLabel?: string
  disabled?: boolean
}

export default function Checkbox({
  checked,
  onChange,
  label,
  description,
  ariaLabel,
  disabled = false,
}: CheckboxProps) {
  return (
    <label className="group flex cursor-pointer items-start gap-3 select-none">
      <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-label={ariaLabel}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span
          className={[
            'absolute inset-0 rounded-[0.45rem] border transition-all duration-150',
            'border-line-strong bg-surface shadow-clay-inset',
            'peer-checked:border-transparent peer-checked:bg-primary peer-checked:shadow-clay-sm',
            'peer-focus-visible:ring-4 peer-focus-visible:ring-primary/25',
            'peer-disabled:opacity-45',
          ].join(' ')}
        />
        <CheckIcon className="relative size-3.5 text-on-primary opacity-0 transition-opacity peer-checked:opacity-100" />
      </span>

      {label || description ? (
        <span className="space-y-0.5">
          {label ? (
            <span
              className={[
                'block text-sm text-ink transition-colors',
                disabled ? 'opacity-45' : 'group-hover:text-primary',
              ].join(' ')}
            >
              {label}
            </span>
          ) : null}
          {description ? (
            <span className="block text-xs text-ink-subtle">{description}</span>
          ) : null}
        </span>
      ) : null}
    </label>
  )
}
