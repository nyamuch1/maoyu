import type { ScheduleItem } from '../../data/creator.ts'
import Badge from '../ui/Badge.tsx'
import { CalendarIcon } from '../ui/icons.tsx'

const PLATFORM_TONE = {
  YouTube: 'danger',
  ニコニコ: 'info',
  会员限定: 'primary',
} as const

type ScheduleListProps = {
  items: ScheduleItem[]
  limit?: number
}

export default function ScheduleList({ items, limit }: ScheduleListProps) {
  const shown = limit ? items.slice(0, limit) : items

  return (
    <div className="overflow-hidden rounded-card border border-line/70 bg-surface shadow-clay-sm">
      <div className="flex items-center gap-2 border-b border-line/60 px-4 py-2.5 text-[11px] text-ink-subtle">
        <CalendarIcon className="size-3.5" />
        接下来 2 周的预定
      </div>

      <ul className="divide-y divide-line/60">
        {shown.map((item, index) => (
          <li
            key={item.id}
            className={[
              'flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-2/60',
              index === 0 ? 'bg-blush-soft/30' : '',
            ].join(' ')}
          >
            <div className="w-12 shrink-0 text-center">
              <p className="font-mono text-[10px] text-ink-subtle">{item.date}</p>
              <p className="text-xs font-medium text-ink">{item.weekday}</p>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-ink">{item.title}</p>
              <p className="mt-0.5 font-mono text-[10px] text-ink-subtle">{item.time} 开播</p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              {index === 0 ? (
                <span className="flex items-center gap-1 text-[10px] text-blush">
                  <span className="size-1.5 animate-pulse rounded-full bg-blush" />
                  下一场
                </span>
              ) : null}
              <Badge tone={PLATFORM_TONE[item.platform]} className="text-[10px]">
                {item.platform}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
