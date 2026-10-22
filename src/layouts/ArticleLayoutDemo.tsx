import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import { ClockIcon, HeartIcon, SearchIcon, SparklesIcon } from '../components/ui/icons.tsx'

const RELATED = [
  {
    title: '设计系统落地：从组件到 token',
    tag: '设计',
    gradient: 'from-violet-200 to-indigo-300',
  },
  {
    title: '暗色模式的 7 个细节',
    tag: '主题',
    gradient: 'from-sky-200 to-cyan-300',
  },
  {
    title: '前端性能优化的取舍清单',
    tag: '性能',
    gradient: 'from-emerald-200 to-teal-300',
  },
]

export default function ArticleLayoutDemo() {
  return (
    <div className="h-full overflow-auto bg-surface">
      {/* 顶栏 */}
      <header className="flex items-center gap-3 border-b border-line/70 px-5 py-2.5">
        <span className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-lg bg-linear-to-br from-primary to-primary-2 text-[10px] font-bold text-on-primary">
            m
          </span>
          <span className="text-xs font-semibold tracking-tight text-ink">maoyusu 周刊</span>
        </span>

        <nav className="ml-3 flex items-center gap-4 text-[11px] text-ink-muted">
          <span className="font-medium text-primary">文章</span>
          <span>专题</span>
          <span>作者</span>
        </nav>

        <span className="ml-auto flex h-7 w-40 items-center gap-1.5 rounded-full bg-surface-2 px-2.5 text-[11px] text-ink-subtle shadow-clay-inset">
          <SearchIcon className="size-3" />
          搜索文章
        </span>
      </header>

      {/* 正文 */}
      <article className="mx-auto max-w-[620px] px-6 py-6">
        <div className="flex items-center gap-2">
          <Badge tone="primary">设计系统</Badge>
          <span className="flex items-center gap-1 text-[10px] text-ink-subtle">
            <ClockIcon className="size-3" />8 分钟阅读
          </span>
        </div>

        <h2 className="mt-2.5 text-2xl leading-tight font-semibold tracking-tight text-ink">
          为什么我们最终放弃了「一套组件适配所有端」
        </h2>

        <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">
          同一个按钮，在后台、官网和移动端要三种密度。与其到处写覆盖，不如承认差异。
        </p>

        <div className="mt-3 flex items-center gap-2 border-y border-line/60 py-2">
          <span className="grid size-7 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-[10px] font-semibold text-on-primary">
            林
          </span>
          <span className="text-[11px]">
            <span className="font-medium text-ink">林一舟</span>
            <span className="ml-1 text-[10px] text-ink-subtle">2026-10-20</span>
          </span>
          <span className="ml-auto flex items-center gap-3 text-[10px] text-ink-subtle">
            <span className="flex items-center gap-1">
              <HeartIcon className="size-3" />
              328
            </span>
            <span>分享</span>
          </span>
        </div>

        <div className="mt-3 h-36 rounded-card bg-linear-to-br from-indigo-200 via-violet-200 to-fuchsia-200 shadow-clay-sm" />

        <div className="mt-3 space-y-2.5 text-xs leading-relaxed text-ink-muted">
          <p>
            一年前我们只有一个后台产品，组件库写得很顺。后来要支持官网和移动端，问题开始出现：
            后台的表格需要紧凑，官网的按钮需要更大更圆，移动端又要 44px 的点击区。
          </p>
          <p>
            我们试过用 size 变体解决，结果变体爆炸：<code>size=sm/md/lg</code> 再乘以视觉密度，
            维护成本反而更高。
          </p>

          <blockquote className="rounded-field border-l-2 border-primary bg-primary-soft/40 px-3 py-2 text-[11px] text-ink-muted">
            结论：组件共享结构，样式按「产品线主题」分层覆盖；token 收敛到语义层，
            差异放在每套主题的密度变量里。
          </blockquote>

          <h3 className="pt-1 text-sm font-medium text-ink">我们最后的三层结构</h3>

          <ul className="space-y-1.5">
            {[
              '基础组件：结构 + 无障碍',
              '产品主题：密度 / 圆角 / 字号',
              '业务组件：组合与默认值',
            ].map((item) => (
              <li key={item} className="flex items-start gap-1.5">
                <SparklesIcon className="mt-0.5 size-3 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>

          <p>
            代价是需要多维护一份主题文件，但换来的是一处修改、三端生效，新人也不用背一堆变体名。
          </p>
        </div>

        <div className="mt-3 flex gap-1.5">
          {['设计系统', '组件库', '工程化'].map((tag) => (
            <Badge key={tag} tone="neutral">
              {tag}
            </Badge>
          ))}
        </div>

        {/* 作者卡 */}
        <div className="mt-4 flex items-center gap-3 rounded-card border border-line/70 bg-surface-2/60 p-3">
          <span className="grid size-9 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-xs font-semibold text-on-primary">
            林
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-ink">林一舟</p>
            <p className="text-[10px] text-ink-subtle">前端工程师 · 写设计系统与组件库</p>
          </div>
          <Button size="sm" variant="secondary">
            关注
          </Button>
        </div>
      </article>

      {/* 相关阅读 */}
      <section className="mx-auto max-w-[620px] px-6 pb-6">
        <p className="text-xs font-medium text-ink">相关阅读</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {RELATED.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-card border border-line/70 bg-surface shadow-clay-sm"
            >
              <div className={['h-14 bg-linear-to-br', item.gradient].join(' ')} />
              <div className="p-2">
                <p className="text-[10px] text-ink-subtle">{item.tag}</p>
                <p className="mt-0.5 text-[11px] leading-snug font-medium text-ink">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
