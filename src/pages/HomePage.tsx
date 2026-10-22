import { Link } from 'react-router-dom'
import AudioCard from '../components/creator/AudioCard.tsx'
import HeroPlayer from '../components/creator/HeroPlayer.tsx'
import MembershipTiers from '../components/creator/MembershipTiers.tsx'
import ScheduleList from '../components/creator/ScheduleList.tsx'
import SectionHeading from '../components/creator/SectionHeading.tsx'
import SocialLinks from '../components/creator/SocialLinks.tsx'
import Badge from '../components/ui/Badge.tsx'
import { buttonClass } from '../components/ui/buttonClasses.ts'
import { NEWS, PROFILE, SCHEDULE, WORKS } from '../data/creator.ts'

const CATEGORY_TONE = {
  配信: 'danger',
  音声作品: 'primary',
  周边: 'warning',
  通知: 'info',
} as const

export default function HomePage() {
  const featured = WORKS[0]

  return (
    <div className="space-y-14 py-6 sm:py-8">
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden rounded-[2rem] border border-line/60 bg-surface px-5 py-8 shadow-clay sm:px-8 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-blush/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-10 size-72 rounded-full bg-primary/15 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="primary" dot>
                ASMR CREATOR
              </Badge>
              <Badge tone="neutral">個人勢</Badge>
              <Badge tone="success" dot>
                每周三档直播
              </Badge>
            </div>

            <p className="mt-6 font-mono text-[11px] tracking-[0.3em] text-ink-subtle uppercase">
              {PROFILE.nameRomaji}
            </p>
            <h1 className="mt-1.5 font-display text-4xl leading-tight font-semibold tracking-tight text-ink sm:text-5xl">
              {PROFILE.nameJa}
            </h1>
            <p className="mt-2 font-display text-lg text-blush sm:text-xl">{PROFILE.tagline}</p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-muted">{PROFILE.intro}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link to="/works" className={buttonClass()}>
                试听最新作品
              </Link>
              <Link to="/news" className={buttonClass({ variant: 'secondary' })}>
                直播日程
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink-subtle">
              <span className="font-mono">{PROFILE.handle}</span>
              {PROFILE.links.slice(0, 3).map((link) => (
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
            </div>
          </div>

          <HeroPlayer work={featured} />
        </div>
      </section>

      {/* ---------------- 数据 ---------------- */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PROFILE.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-card border border-line/70 bg-surface px-4 py-3.5 shadow-clay-sm"
          >
            <p className="font-display text-xl font-semibold tracking-tight text-ink">
              {stat.value}
            </p>
            <p className="mt-0.5 text-[11px] text-ink-subtle">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* ---------------- 最新情报 ---------------- */}
      <section>
        <SectionHeading
          eyebrow="News"
          title="最新情报"
          description="配信预告、新作公开与周边情报。"
          action={{ to: '/news', label: '全部情报' }}
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              to="/news"
              className="group flex h-full flex-col rounded-card border border-line/70 bg-surface p-4 shadow-clay-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-clay"
            >
              <div className="flex items-center gap-2">
                <Badge tone={CATEGORY_TONE[item.category]}>{item.category}</Badge>
                {item.pinned ? <Badge tone="warning">置顶</Badge> : null}
                <span className="ml-auto font-mono text-[10px] text-ink-subtle">{item.date}</span>
              </div>
              <p className="mt-2.5 line-clamp-2 text-sm font-medium text-ink transition-colors group-hover:text-primary">
                {item.title}
              </p>
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- 直播 + 会员 ---------------- */}
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SectionHeading
            eyebrow="Live"
            title="本周直播"
            description="固定档 + 会员限定，回放会在成员区更新。"
            action={{ to: '/news', label: '全部日程' }}
          />
          <ScheduleList items={SCHEDULE} limit={4} />
        </div>

        <div>
          <SectionHeading
            eyebrow="Membership"
            title="会员方案"
            description="标准会员可听全部完整版音声。"
            action={{ to: '/about#membership', label: '权益说明' }}
          />
          <div className="relative overflow-hidden rounded-card border border-blush/30 bg-linear-to-br from-blush-soft/60 via-surface to-primary-soft/50 p-5 shadow-clay">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-medium text-ink">すたんだーど</p>
                <p className="mt-1 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-semibold text-ink">¥490</span>
                  <span className="text-xs text-ink-subtle">/ 月</span>
                </p>
              </div>
              <Badge tone="primary" dot>
                推荐
              </Badge>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              全部作品完整版 · 每月限定音声 2 本 · 直播回放 · 会员壁纸
            </p>
            <Link to="/about#membership" className={buttonClass({ className: 'mt-4 w-full' })}>
              查看会员权益
            </Link>
            <p className="mt-2 text-center text-[10px] text-ink-subtle">
              支持 FANBOX / DLsite 会员
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- 音声作品 ---------------- */}
      <section>
        <SectionHeading
          eyebrow="Works"
          title="音声作品精选"
          description="点播放键可以试听 30 秒片段。"
          action={{ to: '/works', label: `全部 ${WORKS.length} 部作品` }}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WORKS.slice(0, 3).map((work) => (
            <AudioCard key={work.id} work={work} />
          ))}
        </div>
      </section>

      {/* ---------------- 会员方案 ---------------- */}
      <section>
        <SectionHeading
          eyebrow="Support"
          title="支持月白ねむ"
          description="会员费用会用于设备与录音环境。"
        />
        <MembershipTiers />
      </section>

      {/* ---------------- SNS ---------------- */}
      <section className="rounded-card border border-line/70 bg-surface p-5 shadow-clay-sm sm:p-6">
        <SectionHeading
          eyebrow="Links"
          title="在其他地方找到我"
          description="配信通知、日常碎片和音声作品都会同步到这些平台。"
        />
        <SocialLinks />
      </section>
    </div>
  )
}
