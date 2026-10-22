import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '../ui/icons.tsx'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: { to: string; label: string }
  children?: ReactNode
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  children,
}: SectionHeadingProps) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="font-mono text-[11px] tracking-[0.2em] text-blush uppercase">{eyebrow}</p>
        ) : null}
        <h2 className="mt-1 font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-muted">{description}</p>
        ) : null}
      </div>

      {action ? (
        <Link
          to={action.to}
          className="group inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs text-ink-muted transition-colors hover:text-primary"
        >
          {action.label}
          <ChevronRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}

      {children}
    </div>
  )
}
