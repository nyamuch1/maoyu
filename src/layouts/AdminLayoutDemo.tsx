import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import Progress from '../components/ui/Progress.tsx'
import {
  BellIcon,
  ChartIcon,
  GridIcon,
  PlusIcon,
  ReceiptIcon,
  SearchIcon,
  SlidersIcon,
  UsersIcon,
} from '../components/ui/icons.tsx'

const NAV = [
  { label: '概览', Icon: GridIcon, active: true },
  { label: '订单', Icon: ReceiptIcon, count: 8 },
  { label: '客户', Icon: UsersIcon },
  { label: '报表', Icon: ChartIcon },
  { label: '设置', Icon: SlidersIcon },
]

const KPIS = [
  { label: '本月营收', value: '¥128,430', delta: '+12.4%', tone: 'success' as const },
  { label: '新增订单', value: '1,204', delta: '+8.1%', tone: 'success' as const },
  { label: '活跃客户', value: '3,682', delta: '+3.2%', tone: 'success' as const },
  { label: '退款率', value: '1.8%', delta: '-0.4%', tone: 'warning' as const },
]

const BARS = [38, 54, 42, 68, 58, 82, 50, 74, 94, 64, 86, 46]

const ORDERS = [
  { id: '#1042', name: '陈小满', amount: '¥1,280', status: '已支付', tone: 'success' as const },
  { id: '#1041', name: '林一舟', amount: '¥860', status: '待发货', tone: 'warning' as const },
  { id: '#1040', name: '周雨桐', amount: '¥2,460', status: '已支付', tone: 'success' as const },
  { id: '#1039', name: '赵明轩', amount: '¥320', status: '已退款', tone: 'danger' as const },
]

const ACTIVITY = [
  { text: '订单 #1042 完成支付', time: '2 分钟前', color: 'bg-success' },
  { text: '新增客户「何知远」', time: '18 分钟前', color: 'bg-info' },
  { text: '退款申请 #1039 已通过', time: '1 小时前', color: 'bg-warning' },
]

export default function AdminLayoutDemo() {
  return (
    <div className="grid h-full grid-cols-[188px_1fr] bg-canvas">
      {/* 侧边导航 */}
      <aside className="flex min-h-0 flex-col gap-4 border-r border-line/70 bg-surface p-3">
        <div className="flex items-center gap-2 px-1">
          <span className="grid size-7 place-items-center rounded-xl bg-linear-to-br from-primary to-primary-2 text-[11px] font-bold text-on-primary">
            m
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink">maoyusu</span>
          <Badge tone="primary" className="ml-auto">
            Pro
          </Badge>
        </div>

        <nav className="space-y-1">
          {NAV.map(({ label, Icon, active, count }) => (
            <span
              key={label}
              className={[
                'flex items-center gap-2 rounded-field px-2.5 py-2 text-[13px]',
                active ? 'bg-primary-soft font-medium text-primary' : 'text-ink-muted',
              ].join(' ')}
            >
              <Icon className="size-4" />
              {label}
              {count ? (
                <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-on-primary">
                  {count}
                </span>
              ) : null}
            </span>
          ))}
        </nav>

        <div className="mt-auto space-y-2 rounded-field bg-surface-2 p-2.5">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-linear-to-br from-amber-300 to-orange-400 text-[11px] font-semibold text-white">
              苏
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-medium text-ink">苏晚晴</span>
              <span className="block truncate text-[10px] text-ink-subtle">运营负责人</span>
            </span>
          </div>
          <Progress value={64} showValue={false} />
          <p className="text-[10px] text-ink-subtle">存储 64% · 6.4G / 10G</p>
        </div>
      </aside>

      {/* 主区域 */}
      <div className="flex min-h-0 flex-col">
        <header className="flex items-center gap-3 border-b border-line/70 bg-surface/70 px-4 py-2.5">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-ink-subtle uppercase">
              Dashboard
            </p>
            <h3 className="text-sm font-semibold text-ink">概览</h3>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="flex h-8 w-44 items-center gap-1.5 rounded-full bg-surface-2 px-2.5 text-xs text-ink-subtle shadow-clay-inset">
              <SearchIcon className="size-3.5" />
              搜索订单、客户…
            </span>
            <span className="relative grid size-8 place-items-center rounded-full bg-surface-2 text-ink-muted">
              <BellIcon className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-danger" />
            </span>
            <span className="grid size-8 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-xs font-semibold text-on-primary">
              苏
            </span>
          </div>
        </header>

        <div className="min-h-0 flex-1 space-y-3 overflow-auto p-4">
          <div className="grid grid-cols-4 gap-2.5">
            {KPIS.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-card border border-line/70 bg-surface p-3 shadow-clay-sm"
              >
                <p className="text-[11px] text-ink-subtle">{kpi.label}</p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-ink">{kpi.value}</p>
                <Badge tone={kpi.tone} className="mt-1.5">
                  {kpi.delta}
                </Badge>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="col-span-2 rounded-card border border-line/70 bg-surface p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink">近 12 周营收</p>
                  <p className="text-[11px] text-ink-subtle">单位：万元</p>
                </div>
                <Badge tone="success" dot>
                  +12.4%
                </Badge>
              </div>
              <div className="mt-3 flex h-24 items-end gap-1.5">
                {BARS.map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-md bg-linear-to-t from-primary/25 to-primary"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-card border border-line/70 bg-surface p-3">
              <p className="text-sm font-medium text-ink">最近动态</p>
              <ul className="mt-2 space-y-2.5">
                {ACTIVITY.map((item) => (
                  <li key={item.text} className="flex items-start gap-2">
                    <span
                      className={['mt-1.5 size-1.5 shrink-0 rounded-full', item.color].join(' ')}
                    />
                    <span className="min-w-0">
                      <span className="block text-xs leading-relaxed text-ink">{item.text}</span>
                      <span className="block text-[10px] text-ink-subtle">{item.time}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-card border border-line/70 bg-surface p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-ink">最新订单</p>
              <Button size="sm" variant="secondary" icon={<PlusIcon className="size-3.5" />}>
                新建订单
              </Button>
            </div>

            <table className="mt-2 w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-line/70 text-[10px] text-ink-subtle uppercase">
                  <th className="py-1.5 font-medium">订单号</th>
                  <th className="py-1.5 font-medium">客户</th>
                  <th className="py-1.5 font-medium">金额</th>
                  <th className="py-1.5 font-medium">状态</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((order) => (
                  <tr key={order.id} className="border-b border-line/40 last:border-0">
                    <td className="py-2 font-mono text-ink-muted">{order.id}</td>
                    <td className="py-2 text-ink">{order.name}</td>
                    <td className="py-2 text-ink">{order.amount}</td>
                    <td className="py-2">
                      <Badge tone={order.tone} dot>
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
