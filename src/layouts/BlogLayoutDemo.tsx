import Badge from '../components/ui/Badge.tsx'
import { Field, Input } from '../components/ui/Field.tsx'
import Button from '../components/ui/Button.tsx'
import { CalendarIcon, MailIcon } from '../components/ui/icons.tsx'

const NAV = ['文章', '标签', '归档', '关于']

const POSTS = [
  {
    date: '2026-10-18',
    title: '为什么我把设计 token 收进了一个文件',
    excerpt:
      '换品牌色的时候，才发现颜色散落在 40 多个组件里。于是花了一周做语义层，现在改 6 个变量就够了。',
    tags: ['设计系统', 'CSS'],
    read: '6 分钟',
    gradient: 'from-violet-200 to-indigo-300',
  },
  {
    date: '2026-10-05',
    title: 'React Router 7 的数据路由，到底香在哪',
    excerpt: 'loader / action 让页面自己管数据，组件里终于不用再写一堆 useEffect 和 loading 状态。',
    tags: ['React', '路由'],
    read: '9 分钟',
    gradient: 'from-sky-200 to-cyan-300',
  },
  {
    date: '2026-09-22',
    title: '给团队写的暗色模式清单',
    excerpt: '对比度、阴影、图片、图表、代码块 —— 一份可以直接贴进 PR 的检查表。',
    tags: ['可访问性', '主题'],
    read: '5 分钟',
    gradient: 'from-emerald-200 to-teal-300',
  },
]

const TAGS = ['设计系统', 'React', 'CSS', '工程化', '可访问性', '主题', '性能']
const ARCHIVE = [
  { month: '2026 年 10 月', count: 2 },
  { month: '2026 年 9 月', count: 3 },
  { month: '2026 年 8 月', count: 1 },
]

export default function BlogLayoutDemo() {
  return (
    <div className="flex h-full flex-col overflow-auto bg-canvas">
      {/* 顶栏 */}
      <header className="flex items-center gap-3 border-b border-line/70 bg-surface/80 px-6 py-2.5">
        <span className="text-sm font-semibold tracking-tight text-ink">林一舟的博客</span>
        <nav className="ml-4 flex items-center gap-5 text-xs text-ink-muted">
          {NAV.map((item, index) => (
            <span key={item} className={index === 0 ? 'font-medium text-primary' : ''}>
              {item}
            </span>
          ))}
        </nav>
        <span className="ml-auto font-mono text-[10px] text-ink-subtle">RSS</span>
      </header>

      {/* 个人信息 */}
      <section className="flex flex-wrap items-center gap-5 border-b border-line/60 bg-surface px-6 py-5">
        <span className="grid size-14 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-lg font-semibold text-on-primary shadow-clay">
          林
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-tight text-ink">林一舟</h2>
          <p className="mt-1 max-w-md text-xs leading-relaxed text-ink-muted">
            前端工程师，写设计系统与组件库；相信界面的一致性来自约束，而不是自觉。
          </p>
          <div className="mt-2 flex items-center gap-4 text-[10px] text-ink-subtle">
            <span>
              <span className="font-medium text-ink">46</span> 篇文章
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

      <div className="grid grid-cols-[1fr_224px] gap-4 px-6 py-4">
        {/* 文章列表 */}
        <div className="space-y-3">
          {POSTS.map((post) => (
            <article
              key={post.title}
              className="flex gap-3 rounded-card border border-line/70 bg-surface p-3 shadow-clay-sm"
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
                <h3 className="mt-1 text-sm font-medium text-ink">{post.title}</h3>
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
            </article>
          ))}
        </div>

        {/* 侧栏 */}
        <aside className="space-y-3">
          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="text-xs font-medium text-ink">标签</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {TAGS.map((tag) => (
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
            <p className="text-xs font-medium text-ink">归档</p>
            <div className="mt-1.5 space-y-1">
              {ARCHIVE.map((item) => (
                <p key={item.month} className="flex items-center justify-between text-[11px]">
                  <span className="text-ink-muted">{item.month}</span>
                  <span className="text-ink-subtle">{item.count}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="text-xs font-medium text-ink">订阅更新</p>
            <p className="mt-1 text-[10px] text-ink-subtle">每月一封，只发新文章。</p>
            <div className="mt-2 space-y-2">
              <Field label="" htmlFor="demo-blog-email">
                <Input
                  id="demo-blog-email"
                  placeholder="you@example.com"
                  leading={<MailIcon className="size-3.5" />}
                  className="[&_input]:h-9 [&_input]:text-xs"
                />
              </Field>
              <Button size="sm" className="w-full">
                订阅
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <footer className="mt-auto border-t border-line/60 px-6 py-3 text-[10px] text-ink-subtle">
        由 Vite + React 构建 · © 2026 林一舟
      </footer>
    </div>
  )
}
