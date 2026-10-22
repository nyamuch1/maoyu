import MembershipTiers from '../components/creator/MembershipTiers.tsx'
import SectionHeading from '../components/creator/SectionHeading.tsx'
import SocialLinks from '../components/creator/SocialLinks.tsx'
import Badge from '../components/ui/Badge.tsx'
import { PROFILE } from '../data/creator.ts'
import { HeadphonesIcon, MoonIcon, SparklesIcon } from '../components/ui/icons.tsx'

const FAQ = [
  {
    q: '音声作品会在哪里发布？',
    a: '新作会先在 YouTube 公开 3 分钟片段，完整版在 DLsite 与 FANBOX 上线，会员可以提前一周听到。',
  },
  {
    q: '可以点单定制音声吗？',
    a: 'プレミアム会员每月可以提交一次定制请求（题材、时长、称呼方式），会按顺序制作并在会员区发布。',
  },
  {
    q: '直播时间固定吗？',
    a: '每周三档：周四 22:00、周五 23:30、周日 20:00（会员限定）。节假日会提前在 X 上通知。',
  },
  {
    q: '二次创作与转载？',
    a: '个人使用的翻译、剪辑可以，公开发布请先看「利用規約」；商业用途请通过 Contact 联系。',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-10 py-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-line/60 bg-surface p-6 shadow-clay sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-16 size-56 rounded-full bg-blush/15 blur-3xl"
        />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative grid size-24 shrink-0 place-items-center rounded-full bg-linear-to-br from-blush via-primary to-primary-2 shadow-clay-lg">
            <MoonIcon className="size-10 text-white/95" />
            <SparklesIcon className="absolute -top-1 -right-1 size-4 text-white/80" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="primary" dot>
                ASMR CREATOR
              </Badge>
              <Badge tone="neutral">個人勢</Badge>
            </div>
            <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {PROFILE.nameJa}
            </h1>
            <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-ink-subtle uppercase">
              {PROFILE.nameRomaji} · {PROFILE.handle}
            </p>
            <p className="mt-2 font-display text-base text-blush">{PROFILE.tagline}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">{PROFILE.intro}</p>
          </div>
        </div>

        <dl className="relative mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PROFILE.stats.map((stat) => (
            <div key={stat.label} className="rounded-field bg-surface-2/70 px-3 py-2.5">
              <dt className="text-[10px] text-ink-subtle">{stat.label}</dt>
              <dd className="font-display text-base font-semibold text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading eyebrow="Profile" title="关于我" />
          <div className="space-y-3 rounded-card border border-line/70 bg-surface p-5 text-sm leading-relaxed text-ink-muted shadow-clay-sm">
            <p>
              从 2021 年开始在 YouTube 投稿
              ASMR，最初只是把下雨天的声音录下来自己听，后来慢慢开始做耳扫除、
              耳边轻语和角色扮演。现在每周固定三档直播，平均时长 2 小时。
            </p>
            <p>
              录音时最在意的是「距离感」：麦克风离得太近会显得刻意，太远又没有耳边的温度。所以大部分作品
              会用假人头 + 双耳录音，再叠一点房间的自然混响。
            </p>
            <p>
              最喜欢的题材是雨声、翻书声和深夜的闲聊。如果你也有睡不着的晚上，希望这些声音能陪到你。
            </p>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Gear" title="录音设备" />
          <ul className="rounded-card border border-line/70 bg-surface p-5 text-sm text-ink-muted shadow-clay-sm">
            {PROFILE.equipment.map((item) => (
              <li key={item} className="flex items-center gap-2 py-1.5">
                <HeadphonesIcon className="size-3.5 text-blush" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <SectionHeading eyebrow="SNS" title="平台" />
            <SocialLinks compact />
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="FAQ" title="常见问题" />
        <div className="space-y-2">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-card border border-line/70 bg-surface px-4 py-3 shadow-clay-sm open:shadow-clay"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium text-ink">
                {item.q}
                <span className="font-mono text-xs text-ink-subtle transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="membership" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Membership"
          title="会员方案"
          description="会员费用会用于录音设备与素材购买，感谢支持。"
        />
        <MembershipTiers />
      </section>
    </div>
  )
}
