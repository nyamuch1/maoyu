import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import AudioPlayerProvider from '../components/creator/AudioPlayerProvider.tsx'
import { useAudioPlayer } from '../app/audio-context.ts'
import {
  ChevronRightIcon,
  HeadphonesIcon,
  MoonIcon,
  PauseIcon,
  SparklesIcon,
} from '../components/ui/icons.tsx'
import { PROFILE, WORKS } from '../data/creator.ts'
import { usePageTitle } from '../hooks/usePageTitle.ts'
import ThemeToggle from '../components/ui/ThemeToggle.tsx'
import { useTheme } from './theme-context.ts'

const NAV = [
  { to: '/', label: '首页', end: true },
  { to: '/works', label: '音声作品' },
  { to: '/news', label: '情报' },
  { to: '/goods', label: '周边' },
  { to: '/about', label: '关于' },
]

const PAGE_TITLES: Record<string, string> = {
  '/': '首页',
  '/works': '音声作品',
  '/news': '情报',
  '/goods': '周边',
  '/about': '关于',
}

const headerLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-3 py-1.5 text-sm transition-colors',
    isActive ? 'bg-raised font-medium text-ink shadow-clay-sm' : 'text-ink-muted hover:text-ink',
  ].join(' ')

const pillLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'shrink-0 rounded-full px-2.5 py-1.5 text-[12px] transition-colors',
    isActive ? 'bg-raised font-medium text-ink shadow-clay-sm' : 'text-ink-muted',
  ].join(' ')

function NowPlaying() {
  const { currentId, playing, stop } = useAudioPlayer()
  const work = WORKS.find((item) => item.id === currentId)

  if (!work || !playing) return null

  return (
    <div className="flex max-w-[220px] items-center gap-2 rounded-full border border-blush/30 bg-blush-soft/60 px-2.5 py-1">
      <span className="flex items-end gap-[2px]" aria-hidden>
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="w-[2px] animate-pulse rounded-full bg-blush"
            style={{ height: `${6 + index * 4}px`, animationDelay: `${index * 120}ms` }}
          />
        ))}
      </span>
      <span className="min-w-0 flex-1 truncate text-[10px] text-ink-muted">{work.title}</span>
      <button
        type="button"
        onClick={stop}
        aria-label="停止试听"
        className="grid size-5 shrink-0 place-items-center rounded-full text-blush hover:bg-blush/20"
      >
        <PauseIcon className="size-3" />
      </button>
    </div>
  )
}

/** 创作者站点外壳：头部导航 + 试听状态 + 内容区 + 页脚 */
export default function AppLayout() {
  const { mode, setMode } = useTheme()
  const { pathname } = useLocation()
  usePageTitle(PAGE_TITLES[pathname])

  return (
    <AudioPlayerProvider>
      <div className="flex min-h-dvh flex-col bg-canvas text-ink">
        <header className="sticky top-0 z-30 border-b border-line/80 bg-canvas/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-3 px-5">
            <NavLink to="/" end className="flex min-w-0 items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-blush via-primary to-primary-2 text-white shadow-clay-sm">
                <MoonIcon className="size-4.5" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate font-display text-sm font-semibold tracking-tight whitespace-nowrap">
                  {PROFILE.nameJa}
                </span>
                <span className="hidden text-[10px] tracking-[0.16em] whitespace-nowrap text-ink-subtle uppercase sm:block">
                  ASMR Creator
                </span>
              </span>
            </NavLink>

            <nav className="ml-2 hidden items-center gap-1 md:flex">
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={headerLinkClass}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <NowPlaying />
              <Link
                to="/about#membership"
                className="hidden items-center gap-1 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:brightness-[0.97] sm:inline-flex"
              >
                <SparklesIcon className="size-3.5" />
                会员
              </Link>
              <ThemeToggle mode={mode} onChange={setMode} />
            </div>
          </div>

          <nav
            aria-label="站点导航"
            className="mx-auto flex max-w-[1120px] gap-1 overflow-x-auto px-4 pb-2 md:hidden"
          >
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={pillLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="mx-auto w-full max-w-[1120px] flex-1 px-5">
          <Outlet />
        </main>

        <footer className="border-t border-line/70">
          <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 py-8 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 font-display text-sm text-ink">
                <HeadphonesIcon className="size-4 text-blush" />
                {PROFILE.nameJa} · {PROFILE.tagline}
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.14em] uppercase">
                {PROFILE.nameRomaji} · {PROFILE.handle}
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {PROFILE.links.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/error/502"
                className="flex items-center gap-0.5 transition-colors hover:text-primary"
              >
                错误页示例
                <ChevronRightIcon className="size-3" />
              </Link>
            </nav>
          </div>

          <div className="mx-auto max-w-[1120px] border-t border-line/60 px-5 py-4 text-[10px] text-ink-subtle">
            © 2026 {PROFILE.nameJa} · 本站为前端模板演示，音声与商品均为虚构内容。
          </div>
        </footer>
      </div>
    </AudioPlayerProvider>
  )
}
