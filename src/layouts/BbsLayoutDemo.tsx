import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import {
  BookIcon,
  ChartIcon,
  ChatIcon,
  EyeIcon,
  GridIcon,
  PinIcon,
  SearchIcon,
  SlidersIcon,
  SparklesIcon,
  UsersIcon,
} from '../components/ui/icons.tsx'

const NAV = ['首页', '版块', '精华', '排行榜']

const BOARDS = [
  {
    name: '技术交流',
    desc: '前端 / 后端 / 工程化',
    topics: '1,280',
    today: 42,
    Icon: GridIcon,
    gradient: 'from-violet-200 to-indigo-300',
  },
  {
    name: '产品设计',
    desc: '交互 / 视觉 / 设计系统',
    topics: '860',
    today: 18,
    Icon: SparklesIcon,
    gradient: 'from-sky-200 to-cyan-300',
  },
  {
    name: '开源项目',
    desc: '作品展示与协作',
    topics: '430',
    today: 9,
    Icon: BookIcon,
    gradient: 'from-emerald-200 to-teal-300',
  },
  {
    name: '职场与招聘',
    desc: '内推 / 面经 / 成长',
    topics: '620',
    today: 15,
    Icon: UsersIcon,
    gradient: 'from-amber-200 to-orange-300',
  },
  {
    name: '数据与增长',
    desc: '指标 / 实验 / 复盘',
    topics: '310',
    today: 6,
    Icon: ChartIcon,
    gradient: 'from-rose-200 to-pink-300',
  },
  {
    name: '站务公告',
    desc: '规则与反馈',
    topics: '96',
    today: 2,
    Icon: SlidersIcon,
    gradient: 'from-slate-200 to-slate-300',
  },
]

const THREADS = [
  {
    title: '从 0 搭一套设计 system，踩过的 5 个坑',
    author: '林一舟',
    tag: '精华',
    replies: 38,
    views: '1.2k',
    time: '12 分钟前',
    pinned: true,
  },
  {
    title: 'Tailwind v4 的 @theme 和 @custom-variant 怎么配合？',
    author: '苏晚晴',
    tag: '技术',
    replies: 12,
    views: '340',
    time: '35 分钟前',
  },
  {
    title: '求推荐：适合小团队的接口文档工具',
    author: '何知远',
    replies: 21,
    views: '560',
    time: '1 小时前',
  },
  {
    title: '分享一个用 CSS 写柱状图的思路（零依赖）',
    author: '周雨桐',
    tag: '分享',
    replies: 9,
    views: '210',
    time: '2 小时前',
  },
  {
    title: '2026 秋招前端面经汇总（持续更新）',
    author: '赵明轩',
    tag: '招聘',
    replies: 64,
    views: '2.8k',
    time: '3 小时前',
  },
  {
    title: '论坛的暗色模式色阶有点糊，有没有更好的方案？',
    author: '陈小满',
    replies: 17,
    views: '430',
    time: '4 小时前',
  },
]

const HOT = ['设计系统落地实录', 'v4 迁移清单', '零依赖图表', '面经汇总', '暗色模式色阶']

const ACTIVE = ['林', '苏', '周', '赵', '陈']

export default function BbsLayoutDemo() {
  return (
    <div className="flex h-full flex-col bg-canvas">
      {/* 顶栏 */}
      <header className="flex items-center gap-3 border-b border-line/70 bg-surface px-4 py-2.5">
        <span className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-xl bg-linear-to-br from-primary to-primary-2 text-[11px] font-bold text-on-primary">
            B
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink">maoyusu BBS</span>
        </span>

        <nav className="ml-3 flex items-center gap-4 text-xs text-ink-muted">
          {NAV.map((item, index) => (
            <span key={item} className={index === 0 ? 'font-medium text-primary' : ''}>
              {item}
            </span>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="flex h-8 w-40 items-center gap-1.5 rounded-full bg-surface-2 px-2.5 text-xs text-ink-subtle shadow-clay-inset">
            <SearchIcon className="size-3.5" />
            搜索帖子
          </span>
          <Button size="sm">发帖</Button>
          <span className="grid size-8 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-xs font-semibold text-on-primary">
            苏
          </span>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_200px] gap-3 overflow-auto p-4">
        <div className="space-y-3">
          {/* 版块 */}
          <div className="grid grid-cols-3 gap-2.5">
            {BOARDS.map(({ name, desc, topics, today, Icon, gradient }) => (
              <div
                key={name}
                className="rounded-card border border-line/70 bg-surface p-2.5 shadow-clay-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      'grid size-8 place-items-center rounded-xl bg-linear-to-br',
                      gradient,
                    ].join(' ')}
                  >
                    <Icon className="size-4 text-ink/70" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-medium text-ink">{name}</span>
                    <span className="block truncate text-[10px] text-ink-subtle">{desc}</span>
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-2 text-[10px] text-ink-subtle">
                  主题 {topics}
                  <span className="text-line">|</span>
                  今日 <span className="font-medium text-primary">{today}</span>
                </p>
              </div>
            ))}
          </div>

          {/* 最新讨论 */}
          <div className="rounded-card border border-line/70 bg-surface p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-ink">最新讨论</p>
              <span className="text-[10px] text-ink-subtle">按回复时间排序</span>
            </div>

            <div className="mt-2 divide-y divide-line/50">
              {THREADS.map((thread) => (
                <div key={thread.title} className="flex items-start gap-2 py-2">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-surface-3 text-[10px] font-medium text-ink-muted">
                    {thread.author.slice(0, 1)}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-xs">
                      {thread.pinned ? <PinIcon className="size-3 text-primary" /> : null}
                      <span className="truncate font-medium text-ink">{thread.title}</span>
                      {thread.tag ? (
                        <Badge tone={thread.pinned ? 'primary' : 'neutral'} className="shrink-0">
                          {thread.tag}
                        </Badge>
                      ) : null}
                    </p>
                    <p className="mt-0.5 text-[10px] text-ink-subtle">
                      {thread.author} · {thread.time}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 text-[10px] text-ink-subtle">
                    <span className="flex items-center gap-1">
                      <ChatIcon className="size-3" />
                      {thread.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <EyeIcon className="size-3" />
                      {thread.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧栏 */}
        <aside className="space-y-3">
          <div className="rounded-card border border-line/70 bg-surface p-3 shadow-clay-sm">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-xs font-semibold text-on-primary">
                苏
              </span>
              <div>
                <p className="text-xs font-medium text-ink">苏晚晴</p>
                <p className="text-[10px] text-ink-subtle">Lv.6 · 积分 2,480</p>
              </div>
            </div>
            <Button size="sm" variant="soft" className="mt-2 w-full">
              今日签到
            </Button>
          </div>

          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="text-xs font-medium text-ink">今日热帖</p>
            <ol className="mt-1.5 space-y-1.5">
              {HOT.map((item, index) => (
                <li key={item} className="flex items-start gap-1.5 text-[11px] text-ink-muted">
                  <span
                    className={[
                      'grid size-3.5 shrink-0 place-items-center rounded text-[9px] font-medium',
                      index < 3 ? 'bg-primary text-on-primary' : 'bg-surface-3 text-ink-subtle',
                    ].join(' ')}
                  >
                    {index + 1}
                  </span>
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="text-xs font-medium text-ink">活跃用户</p>
            <div className="mt-2 flex -space-x-1.5">
              {ACTIVE.map((name, index) => (
                <span
                  key={name}
                  className={[
                    'grid size-6 place-items-center rounded-full text-[10px] font-medium text-on-primary ring-2 ring-surface',
                    index % 2 === 0
                      ? 'bg-linear-to-br from-primary to-primary-2'
                      : 'bg-linear-to-br from-amber-300 to-orange-400',
                  ].join(' ')}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
