import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import { CartIcon, SearchIcon, StarIcon } from '../components/ui/icons.tsx'

const NAV = ['首页', '全部商品', '新品尝鲜', '关于']

const CATEGORIES = [
  { label: '全部', count: 128, active: true },
  { label: '办公椅', count: 32 },
  { label: '升降桌', count: 18 },
  { label: '灯具', count: 44 },
  { label: '收纳', count: 34 },
]

const PRICES = ['¥500 以下', '¥500 - ¥1,000', '¥1,000 以上']

const PRODUCTS = [
  {
    name: '云朵人体工学椅',
    price: '¥1,280',
    tag: '热销',
    tone: 'danger' as const,
    rating: 4.8,
    sold: '2.1k',
    gradient: 'from-violet-300 to-indigo-400',
  },
  {
    name: '静音电动升降桌',
    price: '¥2,180',
    tag: '新品',
    tone: 'primary' as const,
    rating: 4.9,
    sold: '860',
    gradient: 'from-sky-300 to-cyan-400',
  },
  {
    name: '柔光护眼台灯',
    price: '¥399',
    tag: '限时',
    tone: 'warning' as const,
    rating: 4.7,
    sold: '5.6k',
    gradient: 'from-amber-300 to-orange-400',
  },
  {
    name: '模块化桌面收纳',
    price: '¥268',
    rating: 4.6,
    sold: '1.3k',
    gradient: 'from-emerald-300 to-teal-400',
  },
  {
    name: '落地阅读灯',
    price: '¥899',
    rating: 4.5,
    sold: '640',
    gradient: 'from-rose-300 to-pink-400',
  },
  {
    name: '折叠边桌',
    price: '¥459',
    tag: '热销',
    tone: 'danger' as const,
    rating: 4.7,
    sold: '980',
    gradient: 'from-slate-300 to-slate-400',
  },
]

export default function ShopLayoutDemo() {
  return (
    <div className="flex h-full flex-col bg-canvas">
      {/* 顶栏 */}
      <header className="flex items-center gap-3 border-b border-line/70 bg-surface px-4 py-2.5">
        <span className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-xl bg-linear-to-br from-primary to-primary-2 text-[11px] font-bold text-on-primary">
            m
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink">maoyusu shop</span>
        </span>

        <nav className="ml-3 flex items-center gap-4 text-xs text-ink-muted">
          {NAV.map((item, index) => (
            <span key={item} className={index === 1 ? 'font-medium text-primary' : ''}>
              {item}
            </span>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="flex h-8 w-40 items-center gap-1.5 rounded-full bg-surface-2 px-2.5 text-xs text-ink-subtle shadow-clay-inset">
            <SearchIcon className="size-3.5" />
            搜索商品
          </span>
          <span className="relative grid size-8 place-items-center rounded-full bg-surface-2 text-ink-muted">
            <CartIcon className="size-4" />
            <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-medium text-on-primary">
              3
            </span>
          </span>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-auto p-4">
        <p className="text-[10px] text-ink-subtle">首页 / 全部商品</p>

        <div className="mt-2 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-ink">全部商品</h2>
            <p className="text-[11px] text-ink-subtle">共 128 件商品</p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-ink-subtle">
            排序：
            <span className="rounded-full bg-surface px-2 py-1 font-medium text-ink shadow-clay-sm">
              综合
            </span>
            <span>销量</span>
            <span>价格</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-[168px_1fr] gap-3">
          {/* 筛选 */}
          <aside className="space-y-4 self-start rounded-card border border-line/70 bg-surface p-3">
            <div>
              <p className="text-[11px] font-medium text-ink">分类</p>
              <div className="mt-1.5 space-y-0.5">
                {CATEGORIES.map((item) => (
                  <span
                    key={item.label}
                    className={[
                      'flex items-center justify-between rounded-field px-2 py-1 text-[11px]',
                      item.active ? 'bg-primary-soft font-medium text-primary' : 'text-ink-muted',
                    ].join(' ')}
                  >
                    {item.label}
                    <span className="text-[10px] opacity-60">{item.count}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-line/60 pt-3">
              <p className="text-[11px] font-medium text-ink">价格</p>
              <div className="mt-1.5 space-y-1">
                {PRICES.map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                    <span className="size-3.5 rounded-[0.3rem] border border-line-strong bg-surface shadow-clay-inset" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-line/60 pt-3">
              <p className="text-[11px] font-medium text-ink">评分</p>
              <div className="mt-1.5 space-y-1">
                {[5, 4].map((score) => (
                  <span key={score} className="flex items-center gap-1 text-[11px] text-ink-muted">
                    <StarIcon className="size-3 text-warning" />
                    {score} 分以上
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* 商品网格 */}
          <div>
            <div className="grid grid-cols-3 gap-2.5">
              {PRODUCTS.map((product) => (
                <article
                  key={product.name}
                  className="overflow-hidden rounded-card border border-line/70 bg-surface shadow-clay-sm"
                >
                  <div className={['relative h-24 bg-linear-to-br', product.gradient].join(' ')}>
                    {product.tag ? (
                      <Badge tone={product.tone} className="absolute top-2 left-2">
                        {product.tag}
                      </Badge>
                    ) : null}
                  </div>

                  <div className="p-2.5">
                    <p className="text-xs font-medium text-ink">{product.name}</p>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-ink-subtle">
                      <StarIcon className="size-3 text-warning" />
                      {product.rating}
                      <span className="mx-0.5">·</span>
                      已售 {product.sold}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink">{product.price}</span>
                      <Button size="sm" variant="soft" className="h-7 px-2.5 text-[11px]">
                        加入
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-center gap-1 text-[11px]">
              <span className="rounded-full bg-surface px-2.5 py-1 text-ink shadow-clay-sm">1</span>
              <span className="px-2 py-1 text-ink-muted">2</span>
              <span className="px-2 py-1 text-ink-muted">3</span>
              <span className="px-2 py-1 text-ink-subtle">…</span>
              <span className="px-2 py-1 text-ink-muted">9</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
