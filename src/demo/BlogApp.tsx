import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import { CalendarIcon, HeartIcon, MailIcon, SparklesIcon } from '../components/ui/icons.tsx'

type Post = {
  slug: string
  date: string
  title: string
  excerpt: string
  tags: string[]
  read: string
  gradient: string
  body: string[]
}

const POSTS: Post[] = [
  {
    slug: 'design-tokens',
    date: '2026-10-18',
    title: '为什么我把设计 token 收进了一个文件',
    excerpt:
      '换品牌色的时候，才发现颜色散落在 40 多个组件里。于是花了一周做语义层，现在改 6 个变量就够了。',
    tags: ['设计系统', 'CSS'],
    read: '6 分钟',
    gradient: 'from-violet-200 to-indigo-300',
    body: [
      '换品牌色的那周，我在仓库里搜到了 47 处硬编码的颜色。有些是早期赶工留下的，有些是复制粘贴时忘了改的。',
      '于是我们花了一周把颜色、圆角、阴影全部收进 theme.css：原始色板只负责取值，语义层负责使用，组件永远只碰语义层。',
      '代价是多维护一份文件，换来的是换肤只改 6 个变量，以及设计稿与代码之间不再需要对照表。',
    ],
  },
  {
    slug: 'router-data',
    date: '2026-10-05',
    title: 'React Router 7 的数据路由，到底香在哪',
    excerpt: 'loader / action 让页面自己管数据，组件里终于不用再写一堆 useEffect 和 loading 状态。',
    tags: ['React', '路由'],
    read: '9 分钟',
    gradient: 'from-sky-200 to-cyan-300',
    body: [
      '以前做一个列表页，要写 useEffect 拉数据、useState 存 loading 和 error，再处理竞态。现在这些都在 loader 里完成。',
      'loader 在路由匹配阶段就并行执行，页面渲染时数据已经就绪；action 处理表单提交后自动重新校验 loader。',
      '代价是数据逻辑与组件分离，需要习惯「路由即数据边界」的思维方式。',
    ],
  },
  {
    slug: 'dark-mode-checklist',
    date: '2026-09-22',
    title: '给团队写的暗色模式清单',
    excerpt: '对比度、阴影、图片、图表、代码块 —— 一份可以直接贴进 PR 的检查表。',
    tags: ['可访问性', '主题'],
    read: '5 分钟',
    gradient: 'from-emerald-200 to-teal-300',
    body: [
      '暗色模式不是「把白色换成黑色」。阴影要换成深色系、图片要降亮度、图表配色要重新验证对比度。',
      '我们把检查表固化成 8 条 PR 模板：文字对比度 ≥ 4.5、正文不纯白、阴影用黑色透明度、图片加 0.9 亮度滤镜……',
      '最容易被忽略的是状态色：绿色在深色底上会显得刺眼，需要降低饱和度而不是提高亮度。',
    ],
  },
]

export function BlogShell() {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <header className="sticky top-0 z-20 border-b border-line/70 bg-surface/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[880px] items-center gap-3 px-4 py-3">
          <Link to="/blog" className="text-sm font-semibold tracking-tight">
            林一舟的博客
          </Link>
          <nav className="ml-4 flex items-center gap-1 text-xs">
            <NavLink
              to="/blog"
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
              文章
            </NavLink>
            <span className="rounded-full px-2.5 py-1.5 text-ink-muted">标签</span>
            <span className="rounded-full px-2.5 py-1.5 text-ink-muted">归档</span>
            <span className="rounded-full px-2.5 py-1.5 text-ink-muted">关于</span>
          </nav>
          <div className="ml-auto flex items-center gap-3 text-[11px] text-ink-subtle">
            <Link to="/community" className="hover:text-primary">
              论坛
            </Link>
            <Link to="/layouts" className="hover:text-primary">
              布局画廊
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[880px] px-4 py-5">
        <Outlet />
      </main>
    </div>
  )
}

export function BlogHomePage() {
  return (
    <div>
      <section className="flex flex-wrap items-center gap-4 rounded-card border border-line/70 bg-surface p-5 shadow-clay-sm">
        <span className="grid size-14 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-lg font-semibold text-on-primary shadow-clay">
          林
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-tight">林一舟</h2>
          <p className="mt-1 max-w-md text-xs leading-relaxed text-ink-muted">
            前端工程师，写设计系统与组件库；相信界面的一致性来自约束，而不是自觉。
          </p>
          <div className="mt-2 flex items-center gap-4 text-[10px] text-ink-subtle">
            <span>
              <span className="font-medium text-ink">{POSTS.length}</span> 篇文章
            </span>
            <span>
              <span className="font-medium text-ink">12k</span> 阅读
            </span>
            <span>
              <span className="font-medium text-ink">380</span> 订阅
            </span>
          </div>
        </div>
        <Button size="sm" variant="secondary">
          关于我
        </Button>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="space-y-3">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="flex gap-3 rounded-card border border-line/70 bg-surface p-3 shadow-clay-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-clay"
            >
              <div
                className={['h-20 w-28 shrink-0 rounded-field bg-linear-to-br', post.gradient].join(
                  ' ',
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-mono text-[10px] text-ink-subtle">
                  <CalendarIcon className="size-3" />
                  {post.date}
                  <span>·</span>
                  {post.read}
                </p>
                <h3 className="mt-1 text-sm font-medium">{post.title}</h3>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-ink-muted">
                  {post.excerpt}
                </p>
                <div className="mt-1.5 flex gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge key={tag} tone="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <aside className="space-y-3">
          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="text-xs font-medium">标签</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {['设计系统', 'React', 'CSS', '工程化', '可访问性', '主题'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="text-xs font-medium">归档</p>
            <div className="mt-1.5 space-y-1 text-[11px]">
              {[
                { month: '2026 年 10 月', count: 2 },
                { month: '2026 年 9 月', count: 1 },
              ].map((item) => (
                <p key={item.month} className="flex items-center justify-between">
                  <span className="text-ink-muted">{item.month}</span>
                  <span className="text-ink-subtle">{item.count}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="text-xs font-medium">订阅更新</p>
            <div className="mt-2 flex items-center gap-1.5 rounded-field bg-surface-2 px-2 py-1.5 text-[10px] text-ink-subtle shadow-clay-inset">
              <MailIcon className="size-3" />
              you@example.com
            </div>
            <Button size="sm" className="mt-2 w-full">
              订阅
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export function ArticlePage() {
  const { slug } = useParams()
  const post = POSTS.find((item) => item.slug === slug) ?? POSTS[0]

  return (
    <article className="mx-auto max-w-[680px]">
      <Link to="/blog" className="text-[11px] text-ink-subtle hover:text-primary">
        ← 返回文章列表
      </Link>

      <div className="mt-2 flex items-center gap-2">
        <Badge tone="primary">{post.tags[0]}</Badge>
        <span className="text-[10px] text-ink-subtle">
          {post.date} · {post.read}
        </span>
      </div>

      <h1 className="mt-2.5 text-2xl leading-tight font-semibold tracking-tight">{post.title}</h1>

      <div className="mt-3 flex items-center gap-2 border-y border-line/60 py-2">
        <span className="grid size-7 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-[10px] font-semibold text-on-primary">
          林
        </span>
        <span className="text-[11px] text-ink-muted">林一舟</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-ink-subtle">
          <HeartIcon className="size-3" />
          328
        </span>
      </div>

      <div
        className={['mt-3 h-40 rounded-card bg-linear-to-br shadow-clay-sm', post.gradient].join(
          ' ',
        )}
      />

      <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-4 flex gap-1.5">
        {post.tags.map((tag) => (
          <Badge key={tag} tone="neutral">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-4 rounded-card border border-line/70 bg-surface-2/60 p-3">
        <p className="text-xs font-medium">相关阅读</p>
        <div className="mt-2 space-y-1.5">
          {POSTS.filter((item) => item.slug !== post.slug).map((item) => (
            <Link
              key={item.slug}
              to={`/blog/${item.slug}`}
              className="flex items-start gap-1.5 text-[11px] text-ink-muted hover:text-primary"
            >
              <SparklesIcon className="mt-0.5 size-3 shrink-0 text-primary" />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
