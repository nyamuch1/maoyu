import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import { CartIcon, HeartIcon, StarIcon } from '../components/ui/icons.tsx'

const THUMBS = [
  'from-violet-200 to-indigo-300',
  'from-indigo-200 to-sky-300',
  'from-sky-200 to-cyan-300',
]

const SPECS = ['雾灰', '奶白', '深空蓝']
const TABS = ['商品详情', '规格参数', '用户评价']

const DETAILS = [
  '三段式腰托配合高回弹网布，久坐也能保持脊柱自然曲线。',
  '4D 扶手可前后、升降、旋转调节，打字与阅读各有一套姿势。',
  '静音 PU 轮通过 10 万次滚动测试，木地板与地毯都适用。',
]

export default function DetailLayoutDemo() {
  return (
    <div className="flex h-full flex-col bg-surface">
      {/* 顶栏 */}
      <header className="flex items-center gap-3 border-b border-line/70 px-4 py-2.5">
        <span className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-xl bg-linear-to-br from-primary to-primary-2 text-[11px] font-bold text-on-primary">
            m
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink">maoyusu shop</span>
        </span>

        <nav className="ml-3 flex items-center gap-4 text-xs text-ink-muted">
          <span>首页</span>
          <span className="font-medium text-primary">全部商品</span>
          <span>新品尝鲜</span>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-surface-2 text-ink-muted">
            <CartIcon className="size-4" />
          </span>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-auto p-4">
        <p className="text-[10px] text-ink-subtle">首页 / 全部商品 / 云朵人体工学椅</p>

        <div className="mt-2.5 grid grid-cols-[1fr_330px] gap-5">
          {/* 图集 */}
          <div className="grid grid-cols-[56px_1fr] gap-2">
            <div className="space-y-2">
              {THUMBS.map((thumb, index) => (
                <div
                  key={thumb}
                  className={[
                    'h-14 rounded-field bg-linear-to-br shadow-clay-sm',
                    thumb,
                    index === 0 ? 'ring-2 ring-primary/60' : '',
                  ].join(' ')}
                />
              ))}
            </div>

            <div className="relative h-56 overflow-hidden rounded-card bg-linear-to-br from-violet-200 to-indigo-300 shadow-clay">
              <Badge tone="primary" className="absolute top-3 left-3">
                新品
              </Badge>
              <span className="absolute top-3 right-3 grid size-7 place-items-center rounded-full bg-surface/80 text-ink-muted">
                <HeartIcon className="size-4" />
              </span>
            </div>
          </div>

          {/* 信息 */}
          <div>
            <h2 className="text-lg leading-snug font-semibold tracking-tight text-ink">
              云朵人体工学椅 · 网布款
            </h2>

            <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-subtle">
              <StarIcon className="size-3.5 text-warning" />
              4.8
              <span>·</span>
              126 条评价
              <span>·</span>
              已售 2.1k
            </p>

            <p className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-ink">¥1,280</span>
              <span className="text-xs text-ink-subtle line-through">¥1,580</span>
              <Badge tone="danger">立减 300</Badge>
            </p>

            <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">
              三段式腰托 + 高回弹网布，久坐 8 小时依然放松。
            </p>

            <div className="mt-3">
              <p className="text-[11px] text-ink-subtle">颜色</p>
              <div className="mt-1.5 flex gap-1.5">
                {SPECS.map((spec, index) => (
                  <span
                    key={spec}
                    className={[
                      'rounded-full border px-2.5 py-1 text-[11px]',
                      index === 0
                        ? 'border-transparent bg-primary text-on-primary shadow-clay-sm'
                        : 'border-line text-ink-muted',
                    ].join(' ')}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-[11px] text-ink-subtle">数量</span>
              <span className="flex items-center gap-3 rounded-full bg-surface-2 px-2.5 py-1 text-xs text-ink shadow-clay-inset">
                <span className="text-ink-subtle">−</span>1
                <span className="text-ink-subtle">+</span>
              </span>
            </div>

            <div className="mt-3 flex gap-2">
              <Button className="flex-1">立即购买</Button>
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

        {/* 详情 tabs */}
        <div className="mt-4 border-b border-line/70">
          <div className="flex gap-5 text-xs">
            {TABS.map((tab, index) => (
              <span
                key={tab}
                className={[
                  'pb-2',
                  index === 0
                    ? 'border-b-2 border-primary font-medium text-ink'
                    : 'text-ink-subtle',
                ].join(' ')}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-2 text-xs leading-relaxed text-ink-muted">
          {DETAILS.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
