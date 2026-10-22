import { useMemo, useState } from 'react'
import AudioCard from '../components/creator/AudioCard.tsx'
import SectionHeading from '../components/creator/SectionHeading.tsx'
import { WORKS, WORK_TAGS } from '../data/creator.ts'

type Tag = (typeof WORK_TAGS)[number]

export default function WorksPage() {
  const [tag, setTag] = useState<Tag>('全部')

  const works = useMemo(
    () => (tag === '全部' ? WORKS : WORKS.filter((work) => work.tags.includes(tag))),
    [tag],
  )

  return (
    <div className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Works"
        title="音声作品"
        description="共 8 部作品，可按标签筛选；播放键是 30 秒试听片段。"
      />

      <div className="flex flex-wrap gap-1.5">
        {WORK_TAGS.map((item) => {
          const active = item === tag
          const count =
            item === '全部' ? WORKS.length : WORKS.filter((w) => w.tags.includes(item)).length
          return (
            <button
              key={item}
              type="button"
              onClick={() => setTag(item)}
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
              <span
                className={[
                  'ml-1.5 font-mono text-[10px]',
                  active ? 'text-on-primary/70' : 'text-ink-subtle',
                ].join(' ')}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <AudioCard key={work.id} work={work} />
        ))}
      </div>

      {works.length === 0 ? (
        <p className="rounded-card border border-dashed border-line bg-surface-2/40 py-12 text-center text-sm text-ink-muted">
          这个标签下还没有作品。
        </p>
      ) : null}

      <p className="text-[11px] text-ink-subtle">
        * 试听片段为演示用途，完整版在 DLsite / FANBOX 发布。
      </p>
    </div>
  )
}
