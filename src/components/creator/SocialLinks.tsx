import { PROFILE } from '../../data/creator.ts'
import { BookIcon, ChatIcon, ExternalLinkIcon, HeartIcon, PlayIcon } from '../ui/icons.tsx'

const ICONS = {
  youtube: PlayIcon,
  x: ChatIcon,
  dlsite: BookIcon,
  fanbox: HeartIcon,
  discord: ChatIcon,
  default: ExternalLinkIcon,
} as const

type SocialLinksProps = {
  compact?: boolean
}

/** SNS / 平台外链：图标 + 名称 + 一行说明 */
export default function SocialLinks({ compact = false }: SocialLinksProps) {
  return (
    <div className={compact ? 'flex flex-wrap gap-2' : 'grid gap-2 sm:grid-cols-2'}>
      {PROFILE.links.map((link) => {
        const Icon = ICONS[link.key as keyof typeof ICONS] ?? ICONS.default
        return (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={[
              'group flex items-center gap-2.5 rounded-field border border-line/70 bg-surface px-3.5 py-2.5',
              'transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-clay-sm',
            ].join(' ')}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <Icon className="size-3.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-ink">{link.label}</span>
              {compact ? null : (
                <span className="block truncate text-[10px] text-ink-subtle">{link.meta}</span>
              )}
            </span>
            <ExternalLinkIcon className="size-3 shrink-0 text-ink-subtle transition-colors group-hover:text-primary" />
          </a>
        )
      })}
    </div>
  )
}
