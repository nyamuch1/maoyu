export type ButtonVariant = 'primary' | 'secondary' | 'soft' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    'bg-linear-to-br from-primary to-primary-2 text-on-primary shadow-clay-sm hover:-translate-y-0.5 hover:shadow-clay hover:brightness-105',
  secondary: 'bg-raised text-ink shadow-clay-sm hover:-translate-y-0.5 hover:shadow-clay',
  soft: 'bg-primary-soft text-primary hover:brightness-[0.97] dark:hover:brightness-125',
  outline:
    'border border-line-strong bg-transparent text-ink hover:border-primary hover:text-primary',
  ghost: 'bg-transparent text-ink-muted hover:bg-surface-2 hover:text-ink',
  danger:
    'bg-danger text-on-danger shadow-clay-sm hover:-translate-y-0.5 hover:shadow-clay hover:brightness-105',
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-4 text-[13px]',
  md: 'h-11 gap-2 px-5 text-sm',
  lg: 'h-13 gap-2.5 px-7 text-base',
}

type ButtonClassOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

/** 按钮样式字符串：给 <button> 用（Button 组件），也给 <a>/<Link> 复用 */
export function buttonClass({
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonClassOptions = {}) {
  return [
    'inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap',
    'transition-[transform,box-shadow,background-color,filter] duration-200 outline-none select-none',
    'focus-visible:ring-4 focus-visible:ring-primary/25',
    'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45',
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    className,
  ].join(' ')
}
