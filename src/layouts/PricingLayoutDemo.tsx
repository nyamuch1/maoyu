import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import { CheckIcon, ChevronDownIcon } from '../components/ui/icons.tsx'

const PLANS = [
  {
    name: '入门版',
    price: '¥0',
    unit: '/ 月',
    desc: '个人项目与试用',
    cta: '免费开始',
    variant: 'outline' as const,
    perks: ['1 个团队', '5GB 存储', '基础组件库', '社区支持'],
  },
  {
    name: '专业版',
    price: '¥49',
    unit: '/ 月',
    desc: '小型团队日常协作',
    cta: '开始 14 天试用',
    feature: true,
    perks: ['10 个团队', '100GB 存储', '设计 token 管理', '优先支持'],
  },
  {
    name: '团队版',
    price: '¥199',
    unit: '/ 月',
    desc: '多部门统一管理',
    cta: '联系我们',
    variant: 'outline' as const,
    perks: ['不限团队', '1TB 存储', 'SSO 单点登录', '专属客户成功'],
  },
]

const FAQ = [
  {
    q: '可以随时升级或降级吗？',
    a: '可以。升级立即生效并按天折算差价，降级在当前计费周期结束后生效。',
    open: true,
  },
  { q: '是否支持发票？' },
  { q: '超出存储空间会怎样？' },
]

export default function PricingLayoutDemo() {
  return (
    <div className="h-full overflow-auto bg-canvas">
      {/* 顶栏 */}
      <header className="flex items-center gap-3 border-b border-line/70 bg-surface px-5 py-2.5">
        <span className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-lg bg-linear-to-br from-primary to-primary-2 text-[10px] font-bold text-on-primary">
            m
          </span>
          <span className="text-xs font-semibold tracking-tight text-ink">maoyusu</span>
        </span>
        <nav className="ml-3 flex items-center gap-4 text-[11px] text-ink-muted">
          <span>产品</span>
          <span className="font-medium text-primary">价格</span>
          <span>文档</span>
        </nav>
        <div className="ml-auto">
          <Button size="sm" variant="secondary">
            登录
          </Button>
        </div>
      </header>

      <div className="px-8 py-6">
        {/* 标题 */}
        <div className="text-center">
          <p className="font-mono text-[10px] tracking-[0.18em] text-ink-subtle uppercase">
            Pricing
          </p>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">简单透明的价格</h2>
          <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-ink-muted">
            按团队规模选择，随时升级。年付可省 2 个月。
          </p>

          <div className="mt-3 inline-flex items-center rounded-full bg-surface-2 p-1 shadow-clay-inset">
            <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-medium text-ink shadow-clay-sm">
              月付
            </span>
            <span className="px-3 py-1 text-[11px] text-ink-muted">年付 · 省 17%</span>
          </div>
        </div>

        {/* 价格卡片 */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={[
                'relative rounded-card border bg-surface p-4',
                plan.feature ? 'border-primary/50 shadow-clay' : 'border-line/70 shadow-clay-sm',
              ].join(' ')}
            >
              {plan.feature ? (
                <Badge tone="primary" className="absolute -top-2 left-4">
                  最受欢迎
                </Badge>
              ) : null}

              <p className="text-xs font-medium text-ink">{plan.name}</p>
              <p className="mt-0.5 text-[10px] text-ink-subtle">{plan.desc}</p>

              <p className="mt-2.5 flex items-baseline gap-1">
                <span className="text-2xl font-semibold tracking-tight text-ink">{plan.price}</span>
                <span className="text-[10px] text-ink-subtle">{plan.unit}</span>
              </p>

              <Button
                size="sm"
                variant={plan.feature ? 'primary' : plan.variant}
                className="mt-2.5 w-full"
              >
                {plan.cta}
              </Button>

              <ul className="mt-3 space-y-1.5">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                    <CheckIcon className="size-3 shrink-0 text-primary" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 对比表 */}
        <div className="mt-4 rounded-card border border-line/70 bg-surface p-3">
          <p className="text-xs font-medium text-ink">功能对比</p>
          <table className="mt-2 w-full border-collapse text-left text-[11px]">
            <thead>
              <tr className="border-b border-line/60 text-[10px] text-ink-subtle">
                <th className="py-1.5 font-medium">功能</th>
                <th className="py-1.5 text-center font-medium">入门版</th>
                <th className="py-1.5 text-center font-medium">专业版</th>
                <th className="py-1.5 text-center font-medium">团队版</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: '团队数量', values: ['1', '10', '不限'] },
                { name: '存储空间', values: ['5GB', '100GB', '1TB'] },
                { name: '设计 token 管理', values: ['-', '✓', '✓'] },
                { name: 'SSO 单点登录', values: ['-', '-', '✓'] },
              ].map((row) => (
                <tr key={row.name} className="border-b border-line/40 last:border-0">
                  <td className="py-1.5 text-ink-muted">{row.name}</td>
                  {row.values.map((value, index) => (
                    <td
                      key={index}
                      className={[
                        'py-1.5 text-center',
                        value === '✓' ? 'text-primary' : 'text-ink-muted',
                      ].join(' ')}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div className="mt-4">
          <p className="text-xs font-medium text-ink">常见问题</p>
          <div className="mt-2 space-y-1.5">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="rounded-field border border-line/70 bg-surface px-3 py-2 shadow-clay-sm"
              >
                <p className="flex items-center justify-between gap-2 text-[11px] font-medium text-ink">
                  {item.q}
                  <ChevronDownIcon
                    className={['size-3.5 text-ink-subtle', item.open ? 'rotate-180' : ''].join(
                      ' ',
                    )}
                  />
                </p>
                {item.open ? (
                  <p className="mt-1 text-[10px] leading-relaxed text-ink-muted">{item.a}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
