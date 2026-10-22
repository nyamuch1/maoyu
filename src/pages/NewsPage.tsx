import { useMemo, useState } from 'react'
import SectionHeading from '../components/creator/SectionHeading.tsx'
import Badge from '../components/ui/Badge.tsx'
import { NEWS } from '../data/creator.ts'

const CATEGORIES = ['全部', '配信', '音声作品', '周边', '通知'] as const
type Category = (typeof CATEGORIES)[number]

const TONE = {
  配信: 'danger',
  音声作品: 'primary',
  周边: 'warning',
  通知: 'info',
} as const

export default function NewsPage() {
  const [category, setCategory] = useState<Category>('全部')

  const items = useMemo(() => {
    const list = category === '全部' ? NEWS : NEWS.filter((item) => item.category === category)
    return [...list].sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1))
  }, [category])

  return (
    <div className="space-y-6 py-8">
      <SectionHeading
        eyebrow="News"
        title="情报"
        description="配信预定、音声作品公开、周边与会员内容更新。"
      />

      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((item) => {
          const active = item === category
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={active}
              className={[
                'rounded-full px-3.5 py-1.5 text-xs transition-all duration-200',
                'focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none',
                active
                  ? 'bg-linear-to-br from-blush to-primary font-medium text-on-primary shadow-clay-sm'
                  : 'bg-surface text-ink-muted shadow-clay-sm hover:text-ink',
              ].join(' ')}
            >
              {item}
            </button>
          )
        })}
      </div>

      <ol className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className={[
              'rounded-card border bg-surface p-5 shadow-clay-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-clay',
              item.pinned ? 'border-blush/40' : 'border-line/70',
            ].join(' ')}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={TONE[item.category]}>{item.category}</Badge>
              {item.pinned ? (
                <Badge tone="warning" dot>
                  置顶
                </Badge>
              ) : null}
              <span className="ml-auto font-mono text-[10px] text-ink-subtle">{item.date}</span>
            </div>
            <h3 className="mt-2.5 font-display text-base font-medium text-ink">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.body}</p>
          </li>
        ))}
      </ol>

      {items.length === 0 ? (
        <p className="rounded-card border border-dashed border-line bg-surface-2/40 py-12 text-center text-sm text-ink-muted">
          这个分类下还没有情报。
        </p>
      ) : null}
    </div>
  )
}
