import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import { ChartIcon, SparklesIcon, UsersIcon } from '../components/ui/icons.tsx'

const LINKS = ['产品', '方案', '价格', '文档']

const FEATURES = [
  {
    Icon: SparklesIcon,
    title: 'AI 辅助设计',
    desc: '一句话生成初稿，再按品牌规范自动校正细节。',
  },
  {
    Icon: UsersIcon,
    title: '实时协作',
    desc: '多人同时编辑，评论与版本都留在上下文里。',
  },
  {
    Icon: ChartIcon,
    title: '数据看板',
    desc: '关键指标自动汇总，异常波动即时提醒。',
  },
]

const BRANDS = ['Lumen', 'Northwind', 'Vertex', 'Kite', 'Orbit']
const BARS = [40, 62, 48, 76, 58, 88]
const FOOTER = [
  { title: '产品', items: ['功能', '定价', '更新日志'] },
  { title: '资源', items: ['文档', '博客', '社区'] },
  { title: '公司', items: ['关于', '招聘', '联系'] },
]

export default function LandingLayoutDemo() {
  return (
    <div className="flex h-full flex-col overflow-auto bg-surface">
      {/* 顶栏 */}
      <header className="flex items-center gap-4 border-b border-line/70 px-5 py-3">
        <span className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-xl bg-linear-to-br from-primary to-primary-2 text-[11px] font-bold text-on-primary">
            m
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink">maoyusu</span>
        </span>

        <nav className="ml-4 flex items-center gap-5 text-xs text-ink-muted">
          {LINKS.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="ghost">
            登录
          </Button>
          <Button size="sm">免费开始</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="grid grid-cols-2 items-center gap-6 px-8 py-7">
        <div>
          <Badge tone="primary">v2.0 已发布</Badge>
          <h2 className="mt-3 text-[26px] leading-tight font-semibold tracking-tight text-ink">
            把想法
            <br />
            更快变成产品
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
            设计、协作、交付在同一处完成，团队少开会、多产出。
          </p>

          <div className="mt-4 flex gap-2">
            <Button>免费开始</Button>
            <Button variant="secondary">预约演示</Button>
          </div>

          <div className="mt-4 flex items-center gap-5 text-xs text-ink-subtle">
            <span>
              <span className="text-sm font-semibold text-ink">12k+</span> 团队在用
            </span>
            <span>
              <span className="text-sm font-semibold text-ink">99.99%</span> 可用性
            </span>
            <span>无需信用卡</span>
          </div>
        </div>

        {/* 产品截图 mock */}
        <div className="rounded-card border border-line/70 bg-canvas p-3 shadow-clay">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-danger/60" />
            <span className="size-2 rounded-full bg-warning/60" />
            <span className="size-2 rounded-full bg-success/60" />
          </div>

          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="col-span-2 rounded-xl bg-surface p-2 shadow-clay-sm">
              <div className="h-1.5 w-1/2 rounded-full bg-surface-3" />
              <div className="mt-2 flex h-16 items-end gap-1">
                {BARS.map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-sm bg-linear-to-t from-primary/30 to-primary"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="rounded-xl bg-surface p-2 shadow-clay-sm">
                <div className="h-1.5 w-2/3 rounded-full bg-surface-3" />
                <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-surface-3" />
              </div>
              <div className="rounded-xl bg-primary-soft p-2">
                <div className="h-1.5 w-2/3 rounded-full bg-primary/30" />
                <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 品牌墙 */}
      <section className="border-y border-line/60 bg-surface-2/50 px-8 py-3">
        <p className="text-[10px] tracking-[0.16em] text-ink-subtle uppercase">已被这些团队信任</p>
        <div className="mt-2 flex items-center gap-7">
          {BRANDS.map((brand) => (
            <span key={brand} className="text-sm font-semibold text-ink-subtle/70">
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* 特性 */}
      <section className="grid grid-cols-3 gap-3 px-8 py-6">
        {FEATURES.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-card border border-line/70 bg-surface p-3 shadow-clay-sm"
          >
            <span className="grid size-8 place-items-center rounded-xl bg-primary-soft text-primary">
              <Icon className="size-4" />
            </span>
            <h3 className="mt-2 text-sm font-medium text-ink">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="px-8 pb-6">
        <div className="flex items-center justify-between gap-4 rounded-card bg-linear-to-br from-primary to-primary-2 p-5 shadow-clay">
          <div>
            <p className="text-base font-semibold text-on-primary">今天开始，5 分钟上线</p>
            <p className="mt-1 text-xs text-on-primary/80">免费版足够小团队使用，随时升级。</p>
          </div>
          <Button variant="secondary" className="bg-surface">
            立即注册
          </Button>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="mt-auto border-t border-line/70 bg-surface-2/40 px-8 py-4">
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-lg bg-linear-to-br from-primary to-primary-2 text-[10px] font-bold text-on-primary">
                m
              </span>
              <span className="text-xs font-semibold text-ink">maoyusu</span>
            </span>
            <p className="mt-2 text-[10px] text-ink-subtle">© 2026 maoyusu. 保留所有权利。</p>
          </div>

          <div className="flex gap-10">
            {FOOTER.map((column) => (
              <div key={column.title}>
                <p className="text-[10px] font-medium text-ink">{column.title}</p>
                <div className="mt-1.5 space-y-1">
                  {column.items.map((item) => (
                    <p key={item} className="text-[10px] text-ink-subtle">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
