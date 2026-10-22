import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { ChevronDownIcon } from './icons.tsx'

const SHELL =
  'flex items-center gap-2 rounded-field border bg-surface-2 px-3.5 shadow-clay-inset transition-colors'
const IDLE =
  'border-line focus-within:border-primary/70 focus-within:ring-4 focus-within:ring-primary/15'
const INVALID = 'border-danger/70 ring-4 ring-danger/10'

type FieldProps = {
  label?: string
  htmlFor?: string
  hint?: string
  error?: string
  required?: boolean
  className?: string
  children: ReactNode
}

/** 表单项外壳：标签 + 控件 + 提示 / 错误文案 */
export function Field({
  label,
  htmlFor,
  hint,
  error,
  required = false,
  className = '',
  children,
}: FieldProps) {
  return (
    <div className={['space-y-1.5', className].join(' ')}>
      {label ? (
        <label htmlFor={htmlFor} className="flex items-center gap-1 text-sm font-medium text-ink">
          {label}
          {required ? (
            <span className="text-danger" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      ) : null}

      {children}

      {error ? (
        <p className="text-xs text-danger">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-subtle">{hint}</p>
      ) : null}
    </div>
  )
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
  leading?: ReactNode
  trailing?: ReactNode
}

export function Input({ invalid = false, leading, trailing, className = '', ...rest }: InputProps) {
  return (
    <div className={[SHELL, invalid ? INVALID : IDLE, className].join(' ')}>
      {leading ? <span className="shrink-0 text-ink-subtle">{leading}</span> : null}
      <input
        className="h-11 w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-subtle disabled:cursor-not-allowed disabled:opacity-50"
        {...rest}
      />
      {trailing ? <span className="shrink-0">{trailing}</span> : null}
    </div>
  )
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }

export function Textarea({ invalid = false, className = '', ...rest }: TextareaProps) {
  return (
    <textarea
      className={[
        SHELL,
        'min-h-24 w-full resize-y items-start py-3 text-sm text-ink outline-none placeholder:text-ink-subtle',
        invalid ? INVALID : IDLE,
        className,
      ].join(' ')}
      {...rest}
    />
  )
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }

export function Select({ invalid = false, className = '', children, ...rest }: SelectProps) {
  return (
    <div className={[SHELL, 'relative', invalid ? INVALID : IDLE, className].join(' ')}>
      <select
        className="h-11 w-full min-w-0 appearance-none bg-transparent pr-6 text-sm text-ink outline-none disabled:cursor-not-allowed disabled:opacity-50"
        {...rest}
      >
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3.5 size-4 text-ink-subtle" />
    </div>
  )
}
