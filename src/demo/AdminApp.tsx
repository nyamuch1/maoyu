import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import Checkbox from '../components/ui/Checkbox.tsx'
import { Field, Input, Select, Textarea } from '../components/ui/Field.tsx'
import Progress from '../components/ui/Progress.tsx'
import StatusPage from '../components/ui/StatusPage.tsx'
import Switch from '../components/ui/Switch.tsx'
import {
  ArrowLeftIcon,
  BellIcon,
  ChatIcon,
  GridIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  UsersIcon,
} from '../components/ui/icons.tsx'

const NAV = [
  { to: '/admin', label: '概览', Icon: GridIcon, end: true },
  { to: '/admin/messages', label: '消息中心', Icon: ChatIcon, count: 3 },
  { to: '/admin/settings', label: '用户设置', Icon: UsersIcon },
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

const CONVERSATIONS = [
  {
    name: '林一舟',
    initial: '林',
    preview: '设计稿我放在 Figma 里了',
    time: '10:24',
    unread: 2,
    active: true,
  },
  { name: '产品讨论组', initial: '产', preview: '这版流程少了失败态', time: '09:58', unread: 5 },
  { name: '陈小满', initial: '陈', preview: '好的，下午三点评审见', time: '昨天' },
  { name: '何知远', initial: '何', preview: '接口今天能联调', time: '昨天' },
]

const MESSAGES = [
  { side: 'left', text: '早上好，设计稿里的按钮状态我补齐了，你看看还有没有漏的？', time: '10:02' },
  { side: 'right', text: '收到，我先对着 token 核一遍，主要看 hover 和禁用态。', time: '10:05' },
  { side: 'left', text: '对，另外深色下阴影我调淡了一档，之前发光感太重。', time: '10:06' },
  { side: 'right', text: '好，那我把 btn 的 shadow-clay 统一成 sm。', time: '10:08' },
]

/** 后台外壳：真实路由的侧栏 + 顶栏，内容走 <Outlet /> */
export function AdminShell() {
  const { pathname } = useLocation()
  const title = pathname.includes('settings')
    ? '用户设置'
    : pathname.includes('messages')
      ? '消息中心'
      : '概览'

  return (
    <div className="flex h-dvh bg-canvas text-ink">
      <aside className="flex w-[196px] shrink-0 flex-col gap-2 border-r border-line/70 bg-surface p-3">
        <Link to="/admin" className="flex items-center gap-2 px-1">
          <span className="grid size-7 place-items-center rounded-xl bg-linear-to-br from-primary to-primary-2 text-[11px] font-bold text-on-primary">
            m
          </span>
          <span className="text-sm font-semibold tracking-tight">maoyusu</span>
          <Badge tone="primary" className="ml-auto">
            Pro
          </Badge>
        </Link>

        <nav className="mt-2 space-y-0.5">
          {NAV.map(({ to, label, Icon, count, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 rounded-field px-2.5 py-2 text-[13px] transition-colors',
                  isActive
                    ? 'bg-primary-soft font-medium text-primary'
                    : 'text-ink-muted hover:bg-surface-2',
                ].join(' ')
              }
            >
              <Icon className="size-4" />
              {label}
              {count ? (
                <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-on-primary">
                  {count}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        <div className="mt-2 space-y-1 border-t border-line/60 pt-2">
          <Link
            to="/layouts"
            className="flex items-center gap-2 rounded-field px-2.5 py-1.5 text-[11px] text-ink-subtle hover:bg-surface-2"
          >
            <ArrowLeftIcon className="size-3.5" />
            返回布局画廊
          </Link>
          <Link
            to="/community"
            className="flex items-center gap-2 rounded-field px-2.5 py-1.5 text-[11px] text-ink-subtle hover:bg-surface-2"
          >
            <ChatIcon className="size-3.5" />
            去论坛看看
          </Link>
        </div>

        <div className="mt-auto rounded-field bg-surface-2 p-2.5">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-linear-to-br from-amber-300 to-orange-400 text-[11px] font-semibold text-white">
              苏
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-medium">苏晚晴</span>
              <span className="block truncate text-[10px] text-ink-subtle">运营负责人</span>
            </span>
          </div>
          <Progress value={64} showValue={false} />
          <p className="text-[10px] text-ink-subtle">存储 64% · 6.4G / 10G</p>
        </div>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-line/70 bg-surface/70 px-4 py-2.5">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-ink-subtle uppercase">
              Admin / {title}
            </p>
            <h1 className="text-sm font-semibold">{title}</h1>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="flex h-8 w-44 items-center gap-1.5 rounded-full bg-surface-2 px-2.5 text-xs text-ink-subtle shadow-clay-inset max-sm:hidden">
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

        <main className="min-h-0 flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export function AdminDashboard() {
  return (
    <div className="space-y-3">
      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-card border border-line/70 bg-surface p-3 shadow-clay-sm"
          >
            <p className="text-[11px] text-ink-subtle">{kpi.label}</p>
            <p className="mt-1 text-lg font-semibold tracking-tight">{kpi.value}</p>
            <Badge tone={kpi.tone} className="mt-1.5">
              {kpi.delta}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid gap-2.5 lg:grid-cols-3">
        <div className="rounded-card border border-line/70 bg-surface p-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">近 12 周营收</p>
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
          <p className="text-sm font-medium">最近动态</p>
          <ul className="mt-2 space-y-2.5">
            {ACTIVITY.map((item) => (
              <li key={item.text} className="flex items-start gap-2">
                <span className={['mt-1.5 size-1.5 shrink-0 rounded-full', item.color].join(' ')} />
                <span className="min-w-0">
                  <span className="block text-xs leading-relaxed">{item.text}</span>
                  <span className="block text-[10px] text-ink-subtle">{item.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-card border border-line/70 bg-surface p-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">最新订单</p>
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
                <td className="py-2">{order.name}</td>
                <td className="py-2">{order.amount}</td>
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
  )
}

export function AdminSettings() {
  const [notify, setNotify] = useState(true)
  const [digest, setDigest] = useState(false)
  const [emailPublic, setEmailPublic] = useState(true)

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <div className="flex items-center gap-2 rounded-field border border-line/60 bg-surface-2/60 px-3 py-2 text-xs text-ink-muted">
        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
        这些设置只影响你自己的账号，不会改动团队配置。
      </div>

      <div className="flex items-center gap-3 rounded-card border border-line/70 bg-surface p-3">
        <span className="grid size-12 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-base font-semibold text-on-primary">
          苏
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium">头像</p>
          <p className="text-[10px] text-ink-subtle">支持 PNG / JPG，建议 256×256</p>
        </div>
        <Button size="sm" variant="secondary">
          更换
        </Button>
      </div>

      <div className="rounded-card border border-line/70 bg-surface p-4">
        <p className="text-sm font-medium">基本信息</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="姓名" htmlFor="admin-name">
            <Input id="admin-name" defaultValue="苏晚晴" />
          </Field>
          <Field label="邮箱" htmlFor="admin-email">
            <Input id="admin-email" defaultValue="wanqing@orbit.dev" />
          </Field>
          <Field label="职位" htmlFor="admin-role">
            <Input id="admin-role" defaultValue="运营负责人" />
          </Field>
          <Field label="时区" htmlFor="admin-tz">
            <Select id="admin-tz" defaultValue="shanghai">
              <option value="shanghai">(GMT+8) 北京 / 上海</option>
              <option value="tokyo">(GMT+9) 东京</option>
            </Select>
          </Field>
        </div>
        <div className="mt-3">
          <Field label="个人简介" htmlFor="admin-bio" hint="会展示在成员名片上">
            <Textarea
              id="admin-bio"
              defaultValue="负责增长与用户运营，喜欢把复杂流程拆成可复用的模板。"
            />
          </Field>
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <Button size="sm" variant="ghost">
            取消
          </Button>
          <Button size="sm">保存修改</Button>
        </div>
      </div>

      <div className="rounded-card border border-line/70 bg-surface p-4">
        <p className="text-sm font-medium">通知偏好</p>
        <div className="mt-3 space-y-3">
          <Switch
            label="站内通知"
            description="评论、提及与任务分配时提醒"
            checked={notify}
            onChange={setNotify}
          />
          <Switch
            label="每周摘要邮件"
            description="每周一发送上周数据概览"
            checked={digest}
            onChange={setDigest}
          />
          <Checkbox
            label="在成员名片上公开邮箱"
            description="关闭后只有管理员可见"
            checked={emailPublic}
            onChange={setEmailPublic}
          />
        </div>
      </div>
    </div>
  )
}

export function AdminMessages() {
  const [active, setActive] = useState(0)

  return (
    <div className="flex h-full min-h-[420px] overflow-hidden rounded-card border border-line/70 bg-surface">
      <aside className="flex w-[220px] shrink-0 flex-col border-r border-line/70">
        <div className="flex items-center justify-between px-3 py-2.5">
          <h2 className="text-sm font-semibold">消息</h2>
          <span className="grid size-6 place-items-center rounded-full bg-surface-2 text-ink-muted">
            <PlusIcon className="size-3.5" />
          </span>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          {CONVERSATIONS.map((chat, index) => (
            <button
              key={chat.name}
              type="button"
              onClick={() => setActive(index)}
              className={[
                'flex w-full items-start gap-2 px-3 py-2 text-left transition-colors',
                index === active ? 'bg-primary-soft/60' : 'hover:bg-surface-2',
              ].join(' ')}
            >
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-[10px] font-semibold text-on-primary">
                {chat.initial}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-1">
                  <span className="truncate text-[11px] font-medium">{chat.name}</span>
                  <span className="shrink-0 text-[9px] text-ink-subtle">{chat.time}</span>
                </span>
                <span className="mt-0.5 block truncate text-[10px] text-ink-subtle">
                  {chat.preview}
                </span>
              </span>
              {chat.unread ? (
                <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-primary text-[9px] text-on-primary">
                  {chat.unread}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b border-line/70 px-3 py-2.5">
          <span className="grid size-7 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-[10px] font-semibold text-on-primary">
            {CONVERSATIONS[active].initial}
          </span>
          <div>
            <p className="text-xs font-medium">{CONVERSATIONS[active].name}</p>
            <p className="flex items-center gap-1 text-[9px] text-success">
              <span className="size-1.5 rounded-full bg-success" />
              在线
            </p>
          </div>
        </header>

        <div className="min-h-0 flex-1 space-y-2.5 overflow-auto p-3">
          <p className="text-center text-[9px] text-ink-subtle">今天</p>
          {MESSAGES.map((message, index) => (
            <div
              key={index}
              className={['flex', message.side === 'right' ? 'justify-end' : 'justify-start'].join(
                ' ',
              )}
            >
              <div className="max-w-[76%]">
                <div
                  className={[
                    'rounded-2xl px-2.5 py-2 text-[11px] leading-relaxed shadow-clay-sm',
                    message.side === 'right'
                      ? 'rounded-br-md bg-linear-to-br from-primary to-primary-2 text-on-primary'
                      : 'rounded-bl-md bg-surface-2',
                  ].join(' ')}
                >
                  {message.text}
                </div>
                <p
                  className={[
                    'mt-0.5 text-[9px] text-ink-subtle',
                    message.side === 'right' ? 'text-right' : '',
                  ].join(' ')}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-line/70 p-2.5">
          <div className="flex items-end gap-2 rounded-field bg-surface-2 p-2 shadow-clay-inset">
            <span className="flex-1 text-[11px] text-ink-subtle">输入消息，Enter 发送…</span>
            <Button size="sm" icon={<SendIcon className="size-3.5" />}>
              发送
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AdminNotFound() {
  return <StatusPage code={404} compact backTo="/admin" backLabel="回到概览" />
}
