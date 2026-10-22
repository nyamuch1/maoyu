import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import { usePageTitle } from '../hooks/usePageTitle.ts'
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
    id: '1042',
    title: '从 0 搭一套设计系统：踩过的 5 个坑和最终的分层方案',
    author: '林一舟',
    tag: '精华',
    replies: 38,
    views: '1.2k',
    time: '12 分钟前',
    pinned: true,
  },
  {
    id: '1041',
    title: 'Tailwind v4 的 @theme 和 @custom-variant 怎么配合？',
    author: '苏晚晴',
    tag: '技术',
    replies: 12,
    views: '340',
    time: '35 分钟前',
  },
  {
    id: '1040',
    title: '求推荐：适合小团队的接口文档工具',
    author: '何知远',
    replies: 21,
    views: '560',
    time: '1 小时前',
  },
  {
    id: '1039',
    title: '分享一个用 CSS 写柱状图的思路（零依赖）',
    author: '周雨桐',
    tag: '分享',
    replies: 9,
    views: '210',
    time: '2 小时前',
  },
  {
    id: '1038',
    title: '2026 秋招前端面经汇总（持续更新）',
    author: '赵明轩',
    tag: '招聘',
    replies: 64,
    views: '2.8k',
    time: '3 小时前',
  },
]

const REPLIES = [
  {
    floor: '沙发',
    author: '苏晚晴',
    level: 'Lv.6',
    content: '我们也是这么做的，不过 token 分了两层：原始色板 + 语义层，改品牌色只动语义层。',
    time: '10 分钟前',
    likes: 8,
  },
  {
    floor: '板凳',
    author: '何知远',
    level: 'Lv.4',
    content: '想问下 Figma 那边怎么同步？手动维护变量太容易漏了。',
    time: '25 分钟前',
    likes: 3,
  },
  {
    floor: '3 楼',
    author: '周雨桐',
    level: 'Lv.5',
    content: '补充一点：过渡动画别用 CSS 变量驱动 color，Chrome 里会不生效，这个坑我踩过。',
    time: '40 分钟前',
    likes: 12,
  },
]

const HOT = ['设计系统落地实录', 'v4 迁移清单', '零依赖图表', '面经汇总', '暗色模式色阶']
const ACTIVE = ['林', '苏', '周', '赵', '陈']

/** 论坛站外壳：真实导航 + <Outlet /> */
export function CommunityShell() {
  const { pathname } = useLocation()
  usePageTitle(pathname === '/community' ? '论坛' : undefined)

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <header className="sticky top-0 z-20 border-b border-line/70 bg-surface/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1100px] items-center gap-3 px-4 py-2.5">
          <Link to="/community" className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-xl bg-linear-to-br from-primary to-primary-2 text-[11px] font-bold text-on-primary">
              B
            </span>
            <span className="text-sm font-semibold tracking-tight">maoyusu BBS</span>
          </Link>

          <nav className="ml-3 flex items-center gap-1 text-xs">
            <NavLink
              to="/community"
              end
              className={({ isActive }) =>
                [
                  'rounded-full px-2.5 py-1.5',
                  isActive
                    ? 'bg-primary-soft font-medium text-primary'
                    : 'text-ink-muted hover:text-ink',
                ].join(' ')
              }
            >
              首页
            </NavLink>
            <span className="rounded-full px-2.5 py-1.5 text-ink-muted max-sm:hidden">精选</span>
            <span className="rounded-full px-2.5 py-1.5 text-ink-muted max-sm:hidden">排行榜</span>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <span className="flex h-8 w-40 items-center gap-1.5 rounded-full bg-surface-2 px-2.5 text-xs text-ink-subtle shadow-clay-inset max-sm:hidden">
              <SearchIcon className="size-3.5" />
              搜索帖子
            </span>
            <Button size="sm">发帖</Button>
            <Link
              to="/layouts"
              className="text-[11px] text-ink-subtle hover:text-primary max-sm:hidden"
            >
              布局画廊
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-4 py-4">
        <Outlet />
      </main>
    </div>
  )
}

export function ForumPage() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_220px]">
      <div className="space-y-3">
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {BOARDS.map(({ name, desc, topics, today, Icon, gradient }) => (
            <div
              key={name}
              className="rounded-card border border-line/70 bg-surface p-3 shadow-clay-sm"
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
                  <span className="block truncate text-xs font-medium">{name}</span>
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

        <div className="rounded-card border border-line/70 bg-surface p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">最新讨论</h2>
            <span className="text-[10px] text-ink-subtle">按回复时间排序</span>
          </div>

          <div className="mt-2 divide-y divide-line/50">
            {THREADS.map((thread) => (
              <Link
                key={thread.id}
                to={`/community/t/${thread.id}`}
                className="flex min-w-0 items-start gap-2 py-2.5 transition-colors hover:bg-surface-2/50"
              >
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-surface-3 text-[10px] font-medium text-ink-muted">
                  {thread.author.slice(0, 1)}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="flex min-w-0 items-center gap-1.5 text-xs">
                    {thread.pinned ? <PinIcon className="size-3 shrink-0 text-primary" /> : null}
                    <span className="min-w-0 truncate font-medium">{thread.title}</span>
                    {thread.tag ? (
                      <Badge
                        tone={thread.pinned ? 'primary' : 'neutral'}
                        className="shrink-0 whitespace-nowrap"
                      >
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
              </Link>
            ))}
          </div>
        </div>
      </div>

      <aside className="space-y-3">
        <div className="rounded-card border border-line/70 bg-surface p-3 shadow-clay-sm">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-xs font-semibold text-on-primary">
              苏
            </span>
            <div>
              <p className="text-xs font-medium">苏晚晴</p>
              <p className="text-[10px] text-ink-subtle">Lv.6 · 积分 2,480</p>
            </div>
          </div>
          <Button size="sm" variant="soft" className="mt-2 w-full">
            今日签到
          </Button>
        </div>

        <div className="rounded-card border border-line/70 bg-surface p-3">
          <p className="text-xs font-medium">今日热帖</p>
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
          <p className="text-xs font-medium">活跃用户</p>
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
  )
}

export function ThreadPage() {
  const { threadId } = useParams()
  const thread = THREADS.find((item) => item.id === threadId) ?? THREADS[0]
  usePageTitle(thread.title)

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_250px]">
      <div className="space-y-3">
        <Link
          to="/community"
          className="inline-flex items-center gap-1 text-[11px] text-ink-subtle hover:text-primary"
        >
          ← 返回论坛首页
        </Link>

        <article className="rounded-card border border-line/70 bg-surface p-4 shadow-clay-sm">
          <div className="flex items-center gap-2">
            {thread.pinned ? <Badge tone="primary">置顶</Badge> : null}
            <Badge tone="warning">精华</Badge>
            <span className="ml-auto text-[10px] text-ink-subtle">#{thread.id}</span>
          </div>

          <h2 className="mt-2 text-lg leading-snug font-semibold tracking-tight">{thread.title}</h2>

          <div className="mt-2.5 flex items-center gap-2 border-b border-line/60 pb-2.5">
            <span className="grid size-7 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-[10px] font-semibold text-on-primary">
              {thread.author.slice(0, 1)}
            </span>
            <span className="text-xs">
              <span className="font-medium">{thread.author}</span>
              <span className="ml-1 text-[10px] text-ink-subtle">楼主 · Lv.7</span>
            </span>
            <span className="ml-auto flex items-center gap-3 text-[10px] text-ink-subtle">
              <span className="flex items-center gap-1">
                <EyeIcon className="size-3" />
                {thread.views}
              </span>
              <span className="flex items-center gap-1">
                <ChatIcon className="size-3" />
                {thread.replies}
              </span>
            </span>
          </div>

          <div className="mt-2.5 space-y-2 text-xs leading-relaxed text-ink-muted">
            <p>
              背景：团队从 3 人涨到 12
              人，样式开始各写各的。我们用了一个季度把颜色、圆角、阴影全部收进
              token，这里记录一下踩过的坑。
            </p>
            <p>第一坑：把「主色」当成语义色直接用，换品牌色时发现所有 hover 都歪了。</p>

            <pre className="overflow-x-auto rounded-field bg-surface-2 p-2.5 font-mono text-[10px] leading-relaxed shadow-clay-inset">
              {`:root {\n  --canvas: #f4f1ff;\n  --primary: #7c3aed;\n  --r-card: 1.5rem;\n}`}
            </pre>

            <p>结论：分两层最省心 —— 原始色板只负责取值，语义层负责使用；组件永远只碰语义层。</p>
          </div>
        </article>

        <div className="rounded-card border border-line/70 bg-surface p-3">
          <p className="text-sm font-medium">
            全部回复 <span className="text-xs font-normal text-ink-subtle">{thread.replies}</span>
          </p>

          <div className="mt-2 divide-y divide-line/50">
            {REPLIES.map((reply) => (
              <div key={reply.floor} className="flex items-start gap-2 py-2.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-surface-3 text-[10px] font-medium text-ink-muted">
                  {reply.author.slice(0, 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-[11px]">
                    <span className="font-medium">{reply.author}</span>
                    <span className="text-[10px] text-ink-subtle">
                      {reply.level} · {reply.floor}
                    </span>
                    <span className="ml-auto text-[10px] text-ink-subtle">{reply.time}</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 rounded-field bg-surface-2 p-2.5 shadow-clay-inset">
            <p className="text-[11px] text-ink-subtle">写下你的看法…</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-ink-subtle">支持 Markdown</span>
              <Button size="sm">发布回复</Button>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-3">
        <div className="rounded-card border border-line/70 bg-surface p-3 shadow-clay-sm">
          <p className="text-xs font-medium">关于作者</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-xs font-semibold text-on-primary">
              {thread.author.slice(0, 1)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium">{thread.author}</p>
              <p className="text-[10px] text-ink-subtle">前端工程师 · Lv.7</p>
            </div>
          </div>
          <p className="mt-2 text-[10px] leading-relaxed text-ink-muted">
            做设计系统与组件库，偶尔写点前端工程化。
          </p>
          <Button size="sm" variant="secondary" className="mt-2 w-full">
            关注
          </Button>
        </div>

        <div className="rounded-card border border-line/70 bg-surface p-3">
          <p className="text-xs font-medium">相似主题</p>
          <div className="mt-1.5 space-y-1.5">
            {HOT.slice(0, 4).map((item) => (
              <Link
                key={item}
                to={`/community/t/${1042 + HOT.indexOf(item)}`}
                className="flex items-start gap-1.5 text-[11px] text-ink-muted hover:text-primary"
              >
                <SparklesIcon className="mt-0.5 size-3 shrink-0 text-primary" />
                {item}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
