import { useAudioPlayer } from '../../app/audio-context.ts'
import type { Work } from '../../data/creator.ts'
import { PROFILE } from '../../data/creator.ts'
import { HeadphonesIcon, MoonIcon, PauseIcon, PlayIcon, SparklesIcon } from '../ui/icons.tsx'

type HeroPlayerProps = {
  work: Work
}

/** 首屏右侧的「月の部屋」：头像 + 最新作品试听 */
export default function HeroPlayer({ work }: HeroPlayerProps) {
  const { currentId, playing, progress, toggle } = useAudioPlayer()
  const isPlaying = currentId === work.id && playing
  const percent = currentId === work.id ? progress : 0

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-line/60 bg-linear-to-b from-primary-soft/80 via-surface to-blush-soft/60 p-5 shadow-clay">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-[0.22em] text-ink-subtle uppercase">
            Moon room
          </p>
          <span className="flex items-center gap-1 rounded-full bg-surface/80 px-2 py-0.5 font-mono text-[10px] text-ink-subtle">
            <span className="size-1.5 animate-pulse rounded-full bg-blush" />
            LIVE 10/24
          </span>
        </div>

        <div className="relative mt-5 flex justify-center">
          <div className="relative grid size-32 place-items-center rounded-full bg-linear-to-br from-blush via-primary to-primary-2 shadow-clay-lg">
            <MoonIcon className="size-12 text-white/95" />
            <SparklesIcon className="absolute -top-1 -right-1 size-5 text-white/80" />
            <span className="absolute right-2 bottom-2 size-3 rounded-full border-2 border-surface bg-success" />
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="font-display text-lg font-medium tracking-tight text-ink">
            {PROFILE.nameJa}
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink-subtle uppercase">
            {PROFILE.nameRomaji} · {PROFILE.handle}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2.5 rounded-full border border-line/60 bg-surface/80 p-1.5 pl-3 shadow-clay-inset">
          <button
            type="button"
            onClick={() => toggle(work.id)}
            aria-label={isPlaying ? '暂停试听' : '试听最新作品'}
            aria-pressed={isPlaying}
            className={[
              'grid size-9 shrink-0 place-items-center rounded-full text-on-primary transition-all duration-200',
              'bg-linear-to-br from-blush to-primary shadow-clay-sm hover:brightness-105',
              'focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:outline-none',
            ].join(' ')}
          >
            {isPlaying ? <PauseIcon className="size-4" /> : <PlayIcon className="ml-0.5 size-4" />}
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-ink">{work.title}</p>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-surface-3">
              <div
                className="h-full rounded-full bg-linear-to-r from-blush to-primary transition-[width] duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <span className="flex shrink-0 items-center gap-1 pr-2 font-mono text-[10px] text-ink-subtle">
            <HeadphonesIcon className="size-3" />
            {work.duration}
          </span>
        </div>
      </div>

      <span className="absolute -top-3 -left-2 rotate-[-6deg] rounded-full bg-surface px-2.5 py-1 font-mono text-[10px] text-ink-muted shadow-clay-sm">
        每周三档配信
      </span>
      <span className="absolute -right-2 -bottom-3 rotate-[5deg] rounded-full bg-surface px-2.5 py-1 font-mono text-[10px] text-ink-muted shadow-clay-sm">
        耳かき / ささやき
      </span>
    </div>
  )
}
