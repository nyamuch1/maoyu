import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import { CheckIcon, CreditCardIcon, MapPinIcon, TruckIcon } from '../components/ui/icons.tsx'

const ORDER = [
  {
    name: '云朵人体工学椅',
    spec: '雾灰 / 标准版',
    price: '¥1,280',
    qty: 1,
    gradient: 'from-violet-300 to-indigo-400',
  },
  {
    name: '柔光护眼台灯',
    spec: '暖白',
    price: '¥399',
    qty: 1,
    gradient: 'from-amber-300 to-orange-400',
  },
]

const DELIVERY = [
  { name: '标准配送', desc: '预计 3–5 天送达', price: '免运费', active: true },
  { name: '次日达', desc: '工作日 18:00 前下单', price: '¥18' },
]

const PAYMENTS = [
  { name: '支付宝', desc: '推荐使用花呗分期', active: true },
  { name: '微信支付', desc: '扫码完成支付' },
  { name: '银行卡', desc: '支持储蓄卡与信用卡' },
]

export default function CheckoutLayoutDemo() {
  return (
    <div className="h-full overflow-auto bg-canvas">
      {/* 顶栏 + 步骤 */}
      <header className="flex items-center gap-3 border-b border-line/70 bg-surface px-4 py-2.5">
        <span className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-lg bg-linear-to-br from-primary to-primary-2 text-[10px] font-bold text-on-primary">
            m
          </span>
          <span className="text-xs font-semibold tracking-tight text-ink">maoyusu shop</span>
        </span>

        <div className="ml-auto flex items-center gap-1.5 text-[10px] text-ink-subtle">
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
      </header>

      <div className="grid grid-cols-[1fr_290px] items-start gap-3 p-4">
        {/* 左侧 */}
        <div className="space-y-3">
          {/* 收货地址 */}
          <div className="rounded-card border border-line/70 bg-surface p-3">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-medium text-ink">
                <MapPinIcon className="size-3.5 text-primary" />
                收货地址
              </p>
              <span className="text-[10px] text-primary">更换</span>
            </div>

            <div className="mt-2 rounded-field border border-primary/40 bg-primary-soft/40 p-2.5">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink">
                苏晚晴
                <span className="font-normal text-ink-muted">138****6621</span>
                <Badge tone="primary">默认</Badge>
              </p>
              <p className="mt-0.5 text-[10px] text-ink-muted">
                上海市徐汇区漕河泾开发区 30 号楼 12 层
              </p>
            </div>
          </div>

          {/* 配送方式 */}
          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-ink">
              <TruckIcon className="size-3.5 text-primary" />
              配送方式
            </p>
            <div className="mt-2 space-y-1.5">
              {DELIVERY.map((item) => (
                <div
                  key={item.name}
                  className={[
                    'flex items-center gap-2 rounded-field border p-2 text-[11px]',
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
                    <span className="block font-medium text-ink">{item.name}</span>
                    <span className="block text-[10px] text-ink-subtle">{item.desc}</span>
                  </span>
                  <span className="text-ink-muted">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 支付方式 */}
          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-ink">
              <CreditCardIcon className="size-3.5 text-primary" />
              支付方式
            </p>
            <div className="mt-2 space-y-1.5">
              {PAYMENTS.map((item) => (
                <div
                  key={item.name}
                  className={[
                    'flex items-center gap-2 rounded-field border p-2 text-[11px]',
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
                    <span className="block font-medium text-ink">{item.name}</span>
                    <span className="block text-[10px] text-ink-subtle">{item.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧订单摘要 */}
        <aside className="rounded-card border border-line/70 bg-surface p-3 shadow-clay">
          <p className="text-xs font-medium text-ink">订单摘要</p>

          <div className="mt-2 space-y-2">
            {ORDER.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className={['size-9 shrink-0 rounded-field bg-linear-to-br', item.gradient].join(
                    ' ',
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-medium text-ink">
                    {item.name}
                  </span>
                  <span className="block text-[10px] text-ink-subtle">
                    {item.spec} · x{item.qty}
                  </span>
                </span>
                <span className="text-[11px] text-ink">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-2.5 flex gap-1.5">
            <span className="flex h-7 flex-1 items-center rounded-field bg-surface-2 px-2 text-[10px] text-ink-subtle shadow-clay-inset">
              输入优惠码
            </span>
            <Button size="sm" variant="secondary">
              使用
            </Button>
          </div>

          <div className="mt-2.5 space-y-1 border-t border-line/60 pt-2 text-[11px]">
            <p className="flex justify-between">
              <span className="text-ink-muted">商品小计</span>
              <span className="text-ink">¥1,679</span>
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
            <span className="text-lg font-semibold tracking-tight text-ink">¥1,579</span>
          </div>

          <Button className="mt-2.5 w-full">提交订单</Button>

          <p className="mt-2 text-center text-[9px] leading-relaxed text-ink-subtle">
            支持 7 天无理由退换 · 顺丰包邮 · 支付信息加密传输
          </p>
        </aside>
      </div>
    </div>
  )
}
