import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import { usePageTitle } from '../hooks/usePageTitle.ts'
import {
  CheckIcon,
  CreditCardIcon,
  HeartIcon,
  MapPinIcon,
  SearchIcon,
  CartIcon,
  StarIcon,
  TruckIcon,
} from '../components/ui/icons.tsx'

type Product = {
  id: string
  name: string
  price: string
  original?: string
  tag?: string
  tone?: 'danger' | 'primary' | 'warning'
  rating: number
  sold: string
  gradient: string
  spec: string
}

const PRODUCTS: Product[] = [
  {
    id: '1042',
    name: '云朵人体工学椅',
    price: '¥1,280',
    original: '¥1,580',
    tag: '热销',
    tone: 'danger',
    rating: 4.8,
    sold: '2.1k',
    gradient: 'from-violet-300 to-indigo-400',
    spec: '雾灰 / 标准版',
  },
  {
    id: '1041',
    name: '静音电动升降桌',
    price: '¥2,180',
    tag: '新品',
    tone: 'primary',
    rating: 4.9,
    sold: '860',
    gradient: 'from-sky-300 to-cyan-400',
    spec: '原木色 / 1.4m',
  },
  {
    id: '1040',
    name: '柔光护眼台灯',
    price: '¥399',
    tag: '限时',
    tone: 'warning',
    rating: 4.7,
    sold: '5.6k',
    gradient: 'from-amber-300 to-orange-400',
    spec: '暖白',
  },
  {
    id: '1039',
    name: '模块化桌面收纳',
    price: '¥268',
    rating: 4.6,
    sold: '1.3k',
    gradient: 'from-emerald-300 to-teal-400',
    spec: '四件套',
  },
  {
    id: '1038',
    name: '落地阅读灯',
    price: '¥899',
    rating: 4.5,
    sold: '640',
    gradient: 'from-rose-300 to-pink-400',
    spec: '哑黑',
  },
  {
    id: '1037',
    name: '折叠边桌',
    price: '¥459',
    tag: '热销',
    tone: 'danger',
    rating: 4.7,
    sold: '980',
    gradient: 'from-slate-300 to-slate-400',
    spec: '浅灰',
  },
]

const CATEGORIES = [
  { label: '全部', count: 128, active: true },
  { label: '办公椅', count: 32 },
  { label: '升降桌', count: 18 },
  { label: '灯具', count: 44 },
  { label: '收纳', count: 34 },
]

export function ShopShell() {
  const { pathname } = useLocation()
  usePageTitle(pathname === '/shop' ? '商城' : undefined)

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <header className="sticky top-0 z-20 border-b border-line/70 bg-surface/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1150px] items-center gap-3 px-4 py-2.5">
          <Link to="/shop" className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-xl bg-linear-to-br from-primary to-primary-2 text-[11px] font-bold text-on-primary">
              m
            </span>
            <span className="text-sm font-semibold tracking-tight">maoyusu shop</span>
          </Link>

          <nav className="ml-3 flex items-center gap-1 text-xs">
            <NavLink
              to="/shop"
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
              全部商品
            </NavLink>
            <span className="rounded-full px-2.5 py-1.5 text-ink-muted">新品尝鲜</span>
            <span className="rounded-full px-2.5 py-1.5 text-ink-muted">关于</span>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <span className="flex h-8 w-40 items-center gap-1.5 rounded-full bg-surface-2 px-2.5 text-xs text-ink-subtle shadow-clay-inset max-sm:hidden">
              <SearchIcon className="size-3.5" />
              搜索商品
            </span>
            <Link
              to="/shop/checkout"
              className="relative grid size-8 place-items-center rounded-full bg-surface-2 text-ink-muted hover:text-primary"
              aria-label="去结算"
            >
              <CartIcon className="size-4" />
              <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-medium text-on-primary">
                3
              </span>
            </Link>
            <Link to="/layouts" className="text-[11px] text-ink-subtle hover:text-primary">
              布局画廊
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1150px] px-4 py-4">
        <Outlet />
      </main>
    </div>
  )
}

export function ProductListPage() {
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">全部商品</h2>
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

      <div className="mt-3 grid gap-3 lg:grid-cols-[180px_1fr]">
        <aside className="space-y-4 self-start rounded-card border border-line/70 bg-surface p-3">
          <div>
            <p className="text-[11px] font-medium">分类</p>
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
            <p className="text-[11px] font-medium">价格</p>
            <div className="mt-1.5 space-y-1 text-[11px] text-ink-muted">
              {['¥500 以下', '¥500–¥1,000', '¥1,000 以上'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="size-3.5 rounded-[0.3rem] border border-line-strong bg-surface shadow-clay-inset" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {PRODUCTS.map((product) => (
              <Link
                key={product.id}
                to={`/shop/products/${product.id}`}
                className="overflow-hidden rounded-card border border-line/70 bg-surface shadow-clay-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-clay"
              >
                <div className={['relative h-28 bg-linear-to-br', product.gradient].join(' ')}>
                  {product.tag ? (
                    <Badge tone={product.tone} className="absolute top-2 left-2">
                      {product.tag}
                    </Badge>
                  ) : null}
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium">{product.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-[10px] text-ink-subtle">
                    <StarIcon className="size-3 text-warning" />
                    {product.rating} · 已售 {product.sold}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold">{product.price}</p>
                </div>
              </Link>
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
  )
}

export function ProductDetailPage() {
  const { productId } = useParams()
  const product = PRODUCTS.find((item) => item.id === productId) ?? PRODUCTS[0]
  usePageTitle(`商品 · ${product.name}`)
  const [spec, setSpec] = useState(0)
  const [qty, setQty] = useState(1)

  return (
    <div>
      <p className="text-[10px] text-ink-subtle">
        <Link to="/shop" className="hover:text-primary">
          全部商品
        </Link>{' '}
        / {product.name}
      </p>

      <div className="mt-2 grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="grid grid-cols-[64px_1fr] gap-2">
          <div className="space-y-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={[
                  'h-14 rounded-field bg-linear-to-br shadow-clay-sm',
                  product.gradient,
                  index === 0 ? 'ring-2 ring-primary/60' : 'opacity-80',
                ].join(' ')}
              />
            ))}
          </div>
          <div
            className={[
              'relative h-64 overflow-hidden rounded-card bg-linear-to-br shadow-clay',
              product.gradient,
            ].join(' ')}
          >
            {product.tag ? (
              <Badge tone={product.tone} className="absolute top-3 left-3">
                {product.tag}
              </Badge>
            ) : null}
            <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-surface/80 text-ink-muted">
              <HeartIcon className="size-4" />
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-lg leading-snug font-semibold tracking-tight">{product.name}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-subtle">
            <StarIcon className="size-3.5 text-warning" />
            {product.rating} · 126 条评价 · 已售 {product.sold}
          </p>

          <p className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight">{product.price}</span>
            {product.original ? (
              <span className="text-xs text-ink-subtle line-through">{product.original}</span>
            ) : null}
            {product.tag === '热销' ? <Badge tone="danger">立减 300</Badge> : null}
          </p>

          <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">
            三段式腰托 + 高回弹网布，久坐 8 小时依然放松；4D 扶手可前后、升降、旋转调节。
          </p>

          <div className="mt-3">
            <p className="text-[11px] text-ink-subtle">规格</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {['雾灰', '奶白', '深空蓝'].map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSpec(index)}
                  className={[
                    'rounded-full border px-2.5 py-1 text-[11px] transition-colors',
                    index === spec
                      ? 'border-transparent bg-primary text-on-primary shadow-clay-sm'
                      : 'border-line text-ink-muted hover:border-primary/40',
                  ].join(' ')}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-[11px] text-ink-subtle">数量</span>
            <span className="flex items-center gap-3 rounded-full bg-surface-2 px-2.5 py-1 text-xs shadow-clay-inset">
              <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))}>
                −
              </button>
              {qty}
              <button type="button" onClick={() => setQty((value) => value + 1)}>
                +
              </button>
            </span>
            <span className="text-[10px] text-ink-subtle">库存 32 件</span>
          </div>

          <div className="mt-3 flex gap-2">
            <Link to="/shop/checkout" className="flex-1">
              <Button className="w-full">立即购买</Button>
            </Link>
            <Button variant="secondary" icon={<CartIcon className="size-4" />}>
              加入购物车
            </Button>
          </div>

          <div className="mt-3 space-y-1 rounded-field bg-surface-2 p-2.5 text-[10px] text-ink-subtle">
            <p>✓ 7 天无理由退换 · 顺丰包邮</p>
            <p>✓ 2 年质保 · 终身免费上门维修</p>
          </div>
        </div>
      </div>

      <div className="mt-4 border-b border-line/70">
        <div className="flex gap-5 text-xs">
          <span className="border-b-2 border-primary pb-2 font-medium">商品详情</span>
          <span className="pb-2 text-ink-subtle">规格参数</span>
          <span className="pb-2 text-ink-subtle">用户评价</span>
        </div>
      </div>
      <div className="mt-3 space-y-2 text-xs leading-relaxed text-ink-muted">
        <p>三段式腰托配合高回弹网布，久坐也能保持脊柱自然曲线。</p>
        <p>4D 扶手可前后、升降、旋转调节，打字与阅读各有一套姿势。</p>
        <p>静音 PU 轮通过 10 万次滚动测试，木地板与地毯都适用。</p>
      </div>
    </div>
  )
}

export function CheckoutPage() {
  usePageTitle('确认订单')
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="mx-auto max-w-md rounded-card border border-line/70 bg-surface p-8 text-center shadow-clay">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-success-soft text-success">
          <CheckIcon className="size-6" />
        </span>
        <h2 className="mt-3 text-lg font-semibold tracking-tight">订单已提交</h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-muted">
          订单号 #1043 · 我们会在 24 小时内发货，物流信息将通过短信通知。
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Button size="sm" onClick={() => navigate('/shop')}>
            继续购物
          </Button>
          <Button size="sm" variant="secondary" onClick={() => setSubmitted(false)}>
            再来一单
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-base font-semibold tracking-tight">确认订单</h1>

      <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-ink-subtle">
        <span className="flex items-center gap-1 text-primary">
          <span className="grid size-4 place-items-center rounded-full bg-primary text-[9px] text-on-primary">
            1
          </span>
          确认订单
        </span>
        <span className="h-px w-6 bg-line" />
        <span>2 支付</span>
        <span className="h-px w-6 bg-line" />
        <span>3 完成</span>
      </div>

      <div className="mt-3 grid items-start gap-3 lg:grid-cols-[1fr_300px]">
        <div className="space-y-3">
          <div className="rounded-card border border-line/70 bg-surface p-4">
            <p className="flex items-center gap-1.5 text-sm font-medium">
              <MapPinIcon className="size-4 text-primary" />
              收货地址
            </p>
            <div className="mt-2 rounded-field border border-primary/40 bg-primary-soft/40 p-3">
              <p className="flex items-center gap-1.5 text-[11px] font-medium">
                苏晚晴 <span className="font-normal text-ink-muted">138****6621</span>
                <Badge tone="primary">默认</Badge>
              </p>
              <p className="mt-0.5 text-[10px] text-ink-muted">
                上海市徐汇区漕河泾开发区 30 号楼 12 层
              </p>
            </div>
          </div>

          <div className="rounded-card border border-line/70 bg-surface p-4">
            <p className="flex items-center gap-1.5 text-sm font-medium">
              <TruckIcon className="size-4 text-primary" />
              配送方式
            </p>
            <div className="mt-2 space-y-2">
              {[
                { name: '标准配送', desc: '预计 3–5 天送达', price: '免运费', active: true },
                { name: '次日达', desc: '工作日 18:00 前下单', price: '¥18', active: false },
              ].map((item) => (
                <div
                  key={item.name}
                  className={[
                    'flex items-center gap-2 rounded-field border p-2.5 text-[11px]',
                    item.active ? 'border-primary/40 bg-primary-soft/40' : 'border-line/70',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'grid size-3.5 place-items-center rounded-full border',
                      item.active ? 'border-primary bg-primary' : 'border-line-strong',
                    ].join(' ')}
                  >
                    {item.active ? <CheckIcon className="size-2.5 text-on-primary" /> : null}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium">{item.name}</span>
                    <span className="block text-[10px] text-ink-subtle">{item.desc}</span>
                  </span>
                  <span className="text-ink-muted">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-line/70 bg-surface p-4">
            <p className="flex items-center gap-1.5 text-sm font-medium">
              <CreditCardIcon className="size-4 text-primary" />
              支付方式
            </p>
            <div className="mt-2 space-y-2">
              {[
                { name: '支付宝', desc: '推荐使用花呗分期', active: true },
                { name: '微信支付', desc: '扫码完成支付', active: false },
                { name: '银行卡', desc: '支持储蓄卡与信用卡', active: false },
              ].map((item) => (
                <div
                  key={item.name}
                  className={[
                    'flex items-center gap-2 rounded-field border p-2.5 text-[11px]',
                    item.active ? 'border-primary/40 bg-primary-soft/40' : 'border-line/70',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'grid size-3.5 place-items-center rounded-full border',
                      item.active ? 'border-primary bg-primary' : 'border-line-strong',
                    ].join(' ')}
                  >
                    {item.active ? <CheckIcon className="size-2.5 text-on-primary" /> : null}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium">{item.name}</span>
                    <span className="block text-[10px] text-ink-subtle">{item.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-card border border-line/70 bg-surface p-4 shadow-clay">
          <p className="text-sm font-medium">订单摘要</p>

          <div className="mt-2 space-y-2">
            {PRODUCTS.slice(0, 2).map((item, index) => (
              <div key={item.id} className="flex items-center gap-2">
                <span
                  className={['size-9 shrink-0 rounded-field bg-linear-to-br', item.gradient].join(
                    ' ',
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-medium">{item.name}</span>
                  <span className="block text-[10px] text-ink-subtle">
                    {item.spec} · x{index === 0 ? 1 : 1}
                  </span>
                </span>
                <span className="text-[11px]">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-1.5">
            <span className="flex h-8 flex-1 items-center rounded-field bg-surface-2 px-2 text-[10px] text-ink-subtle shadow-clay-inset">
              输入优惠码
            </span>
            <Button size="sm" variant="secondary">
              使用
            </Button>
          </div>

          <div className="mt-3 space-y-1 border-t border-line/60 pt-2 text-[11px]">
            <p className="flex justify-between">
              <span className="text-ink-muted">商品小计</span>
              <span>¥1,679</span>
            </p>
            <p className="flex justify-between">
              <span className="text-ink-muted">运费</span>
              <span className="text-success">免运费</span>
            </p>
            <p className="flex justify-between">
              <span className="text-ink-muted">优惠</span>
              <span className="text-danger">-¥100</span>
            </p>
          </div>

          <div className="mt-2 flex items-baseline justify-between border-t border-line/60 pt-2">
            <span className="text-[11px] text-ink-muted">应付合计</span>
            <span className="text-lg font-semibold tracking-tight">¥1,579</span>
          </div>

          <Button className="mt-3 w-full" onClick={() => setSubmitted(true)}>
            提交订单
          </Button>
          <p className="mt-2 text-center text-[9px] text-ink-subtle">
            支持 7 天无理由退换 · 支付信息加密传输
          </p>
        </aside>
      </div>
    </div>
  )
}
