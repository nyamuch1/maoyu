import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonClass, type ButtonSize, type ButtonVariant } from './buttonClasses.ts'
import { LoaderIcon } from './icons.tsx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
}

/** 柔和糖果风按钮：渐变实心 / 白面 / 浅底 / 描边 / 幽灵 / 危险 */
export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  children,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={buttonClass({ variant, size, className })}
      {...rest}
    >
      {loading ? <LoaderIcon className="size-4" /> : icon}
      {children}
    </button>
  )
}

export type { ButtonSize, ButtonVariant }
