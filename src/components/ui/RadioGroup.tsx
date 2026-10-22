type RadioOption = {
  value: string
  label: string
  description?: string
}

type RadioGroupProps = {
  name: string
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
}

export default function RadioGroup({ name, value, onChange, options }: RadioGroupProps) {
  return (
    <div role="radiogroup" className="space-y-2">
      {options.map((option) => {
        const checked = option.value === value

        return (
          <label
            key={option.value}
            className={[
              'flex cursor-pointer items-start gap-3 rounded-field border p-3 transition-colors select-none',
              checked
                ? 'border-primary/40 bg-primary-soft/60 shadow-clay-sm'
                : 'border-line bg-surface-2/60 hover:border-line-strong',
            ].join(' ')}
          >
            <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span
                className={[
                  'absolute inset-0 rounded-full border transition-all',
                  checked
                    ? 'border-primary bg-surface'
                    : 'border-line-strong bg-surface shadow-clay-inset',
                  'peer-focus-visible:ring-4 peer-focus-visible:ring-primary/25',
                ].join(' ')}
              />
              {checked ? <span className="relative size-2.5 rounded-full bg-primary" /> : null}
            </span>

            <span className="space-y-0.5">
              <span className="block text-sm text-ink">{option.label}</span>
              {option.description ? (
                <span className="block text-xs text-ink-subtle">{option.description}</span>
              ) : null}
            </span>
          </label>
        )
      })}
    </div>
  )
}
