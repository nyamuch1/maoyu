import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import {
  BookIcon,
  CalendarIcon,
  ChatIcon,
  EyeIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
} from '../components/ui/icons.tsx'

const RELATED = [
  'Tailwind v4 主题切换的三种做法',
  '设计 token 到底该分几层？',
  '小团队如何维护一套组件库',
  '暗色模式的对比度怎么调',
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

export default function PostLayoutDemo() {
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
          <span>首页</span>
          <span className="font-medium text-primary">技术交流</span>
          <span>精华</span>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="flex h-8 w-36 items-center gap-1.5 rounded-full bg-surface-2 px-2.5 text-xs text-ink-subtle shadow-clay-inset">
            <SearchIcon className="size-3.5" />
            搜索
          </span>
          <Button size="sm">发帖</Button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_236px] gap-3 overflow-auto p-4">
        <div className="space-y-3">
          {/* 主楼 */}
          <article className="rounded-card border border-line/70 bg-surface p-4 shadow-clay-sm">
            <div className="flex items-center gap-2">
              <Badge tone="primary">置顶</Badge>
              <Badge tone="warning">精华</Badge>
              <span className="ml-auto flex items-center gap-1 text-[10px] text-ink-subtle">
                <CalendarIcon className="size-3" />
                2026-10-22 10:24
              </span>
            </div>

            <h2 className="mt-2 text-base leading-snug font-semibold tracking-tight text-ink">
              从 0 搭一套设计系统：踩过的 5 个坑和最终的分层方案
            </h2>

            <div className="mt-2.5 flex items-center gap-2 border-b border-line/60 pb-2.5">
              <span className="grid size-7 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-[10px] font-semibold text-on-primary">
                林
              </span>
              <span className="text-xs">
                <span className="font-medium text-ink">林一舟</span>
                <span className="ml-1 text-[10px] text-ink-subtle">楼主 · Lv.7</span>
              </span>
              <span className="ml-auto flex items-center gap-3 text-[10px] text-ink-subtle">
                <span className="flex items-center gap-1">
                  <EyeIcon className="size-3" />
                  1.2k
                </span>
                <span className="flex items-center gap-1">
                  <ChatIcon className="size-3" />
                  38
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

            <div className="mt-3 flex items-center gap-2 border-t border-line/60 pt-2.5">
              <Button size="sm" variant="soft" icon={<StarIcon className="size-3.5" />}>
                收藏 128
              </Button>
              <Button size="sm" variant="ghost">
                分享
              </Button>
              <Button size="sm" variant="ghost">
                举报
              </Button>
            </div>
          </article>

          {/* 回复列表 */}
          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="text-sm font-medium text-ink">
              全部回复 <span className="text-xs font-normal text-ink-subtle">38</span>
            </p>

            <div className="mt-2 divide-y divide-line/50">
              {REPLIES.map((reply) => (
                <div key={reply.floor} className="flex items-start gap-2 py-2.5">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-surface-3 text-[10px] font-medium text-ink-muted">
                    {reply.author.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-[11px]">
                      <span className="font-medium text-ink">{reply.author}</span>
                      <span className="text-[10px] text-ink-subtle">
                        {reply.level} · {reply.floor}
                      </span>
                      <span className="ml-auto text-[10px] text-ink-subtle">{reply.time}</span>
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">{reply.content}</p>
                    <div className="mt-1 flex items-center gap-3 text-[10px] text-ink-subtle">
                      <span>赞 {reply.likes}</span>
                      <span>回复</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 回复框 */}
            <div className="mt-2 rounded-field bg-surface-2 p-2.5 shadow-clay-inset">
              <p className="text-[11px] text-ink-subtle">写下你的看法…</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-ink-subtle">支持 Markdown</span>
                <Button size="sm">发布回复</Button>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧栏 */}
        <aside className="space-y-3">
          <div className="rounded-card border border-line/70 bg-surface p-3 shadow-clay-sm">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-xs font-semibold text-on-primary">
                林
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-ink">林一舟</p>
                <p className="text-[10px] text-ink-subtle">前端工程师 · Lv.7</p>
              </div>
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-ink-muted">
              做设计系统与组件库，偶尔写点前端工程化。
            </p>
            <div className="mt-2 flex gap-3 text-[10px] text-ink-subtle">
              <span>发帖 86</span>
              <span>获赞 1.2k</span>
              <span>关注 320</span>
            </div>
            <Button size="sm" variant="secondary" className="mt-2 w-full">
              关注
            </Button>
          </div>

          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="text-xs font-medium text-ink">相似主题</p>
            <div className="mt-1.5 space-y-1.5">
              {RELATED.map((item) => (
                <p key={item} className="flex items-start gap-1.5 text-[11px] text-ink-muted">
                  <SparklesIcon className="mt-0.5 size-3 shrink-0 text-primary" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-ink">
              <BookIcon className="size-3.5 text-ink-subtle" />
              版块规则
            </p>
            <p className="mt-1.5 text-[10px] leading-relaxed text-ink-subtle">
              发帖前先搜一下是否重复；技术讨论请贴最小复现；招聘内容请发到「职场与招聘」。
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
