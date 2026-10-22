import { useMemo } from 'react'
import { useAudioPlayer } from '../../app/audio-context.ts'
import type { Work } from '../../data/creator.ts'
import Badge from '../ui/Badge.tsx'
import { HeadphonesIcon, PauseIcon, PlayIcon } from '../ui/icons.tsx'

const PREVIEW_SECONDS = 30

type AudioCardProps = {
  work: Work
  featured?: boolean
}

/** 音声卡片：试听按钮 + 波形进度 + 标签，播放状态走全局 AudioPlayerProvider */
export default function AudioCard({ work, featured = false }: AudioCardProps) {
  const { currentId, playing, progress, toggle } = useAudioPlayer()
  const isCurrent = currentId === work.id
  const isPlaying = isCurrent && playing
  const percent = isCurrent ? progress : 0

  const bars = useMemo(
    () => Array.from({ length: 32 }, (_, index) => 26 + ((index * 37 + 13) % 62)),
    [],
  )

  const playedSeconds = Math.floor((percent / 100) * PREVIEW_SECONDS)

  return (
    <article
      className={[
        'group flex h-full flex-col rounded-card border bg-surface p-5 transition-all duration-200',
        isPlaying
          ? 'border-blush/50 shadow-clay'
          : 'border-line/70 shadow-clay-sm hover:-translate-y-0.5 hover:shadow-clay',
        featured ? 'sm:p-6' : '',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            'grid size-11 shrink-0 place-items-center rounded-2xl text-xl',
            featured
              ? 'bg-linear-to-br from-blush to-primary text-on-primary shadow-clay-sm'
              : 'bg-blush-soft text-blush',
          ].join(' ')}
          aria-hidden
        >
          {work.mood}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-ink">{work.title}</h3>
          <p className="mt-0.5 truncate font-mono text-[11px] text-ink-subtle">{work.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => toggle(work.id)}
          aria-label={isPlaying ? `暂停试听：${work.title}` : `试听：${work.title}`}
          aria-pressed={isPlaying}
          className={[
            'grid size-11 shrink-0 place-items-center rounded-full transition-all duration-200',
            'focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none',
            isPlaying
              ? 'bg-blush text-on-primary shadow-clay-sm'
              : 'bg-primary-soft text-primary hover:scale-105 hover:brightness-[0.98]',
          ].join(' ')}
        >
          {isPlaying ? <PauseIcon className="size-4" /> : <PlayIcon className="ml-0.5 size-4" />}
        </button>
      </div>

      <div className="mt-4 flex h-10 items-center gap-[3px]" aria-hidden>
        {bars.map((height, index) => {
          const passed = percent >= ((index + 0.5) / bars.length) * 100
          return (
            <span
              key={index}
              className={[
                'flex-1 rounded-full transition-all duration-300',
                passed ? 'bg-blush' : 'bg-surface-3',
                isPlaying && passed ? 'animate-pulse' : '',
              ].join(' ')}
              style={{ height: `${height}%`, animationDelay: `${index * 24}ms` }}
            />
          )
        })}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-[11px] text-ink-subtle">
        <span className="flex items-center gap-1 font-mono">
          <HeadphonesIcon className="size-3" />
          {isCurrent
            ? `${String(playedSeconds).padStart(2, '0')}s / ${PREVIEW_SECONDS}s`
            : work.plays}
        </span>
        <span className="font-mono">{work.duration}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-line/60 pt-3">
        {work.tags.map((tag) => (
          <Badge key={tag} tone={featured ? 'primary' : 'neutral'} className="text-[10px]">
            {tag}
          </Badge>
        ))}
        <span className="ml-auto font-mono text-[10px] text-ink-subtle">{work.date}</span>
      </div>
    </article>
  )
}
