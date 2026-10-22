import { useState } from 'react'
import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import Checkbox from '../components/ui/Checkbox.tsx'
import { Field, Input, Select, Textarea } from '../components/ui/Field.tsx'
import Switch from '../components/ui/Switch.tsx'
import {
  ArrowLeftIcon,
  BellIcon,
  LockIcon,
  SlidersIcon,
  UsersIcon,
} from '../components/ui/icons.tsx'

const MENU = [
  { label: '个人资料', Icon: UsersIcon, active: true },
  { label: '账号安全', Icon: LockIcon },
  { label: '通知偏好', Icon: BellIcon },
  { label: '外观主题', Icon: SlidersIcon },
]

export default function SettingsLayoutDemo() {
  const [notify, setNotify] = useState(true)
  const [digest, setDigest] = useState(false)
  const [emailPublic, setEmailPublic] = useState(true)

  return (
    <div className="flex h-full bg-canvas">
      {/* 设置左侧菜单 */}
      <aside className="flex w-[172px] shrink-0 flex-col gap-3 border-r border-line/70 bg-surface p-3">
        <div className="flex items-center gap-2 px-1">
          <span className="grid size-6 place-items-center rounded-lg bg-surface-2 text-ink-subtle">
            <ArrowLeftIcon className="size-3.5" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink">设置</span>
        </div>

        <nav className="space-y-0.5">
          {MENU.map(({ label, Icon, active }) => (
            <span
              key={label}
              className={[
                'flex items-center gap-2 rounded-field px-2.5 py-1.5 text-[12px]',
                active ? 'bg-primary-soft font-medium text-primary' : 'text-ink-muted',
              ].join(' ')}
            >
              <Icon className="size-3.5" />
              {label}
            </span>
          ))}
        </nav>

        <div className="mt-auto rounded-field bg-surface-2 p-2.5">
          <p className="text-[10px] text-ink-subtle">当前套餐</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-ink">
            专业版 <Badge tone="primary">Pro</Badge>
          </p>
        </div>
      </aside>

      {/* 右侧内容 */}
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-line/70 bg-surface/70 px-5 py-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-ink-subtle uppercase">
              Account
            </p>
            <h3 className="text-sm font-semibold text-ink">个人资料</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost">
              取消
            </Button>
            <Button size="sm">保存修改</Button>
          </div>
        </header>

        <div className="min-h-0 flex-1 space-y-3 overflow-auto p-4">
          {/* 头像 */}
          <div className="flex items-center gap-3 rounded-card border border-line/70 bg-surface p-3">
            <span className="grid size-12 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-base font-semibold text-on-primary shadow-clay-sm">
              苏
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-ink">头像</p>
              <p className="text-[10px] text-ink-subtle">支持 PNG / JPG，建议 256×256</p>
            </div>
            <Button size="sm" variant="secondary">
              更换
            </Button>
          </div>

          {/* 基本信息 */}
          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="text-xs font-medium text-ink">基本信息</p>
            <div className="mt-2.5 grid grid-cols-2 gap-3">
              <Field label="姓名" htmlFor="demo-set-name">
                <Input id="demo-set-name" defaultValue="苏晚晴" />
              </Field>
              <Field label="邮箱" htmlFor="demo-set-email">
                <Input id="demo-set-email" defaultValue="wanqing@orbit.dev" />
              </Field>
              <Field label="职位" htmlFor="demo-set-role">
                <Input id="demo-set-role" defaultValue="运营负责人" />
              </Field>
              <Field label="时区" htmlFor="demo-set-tz">
                <Select id="demo-set-tz" defaultValue="shanghai">
                  <option value="shanghai">(GMT+8) 北京 / 上海</option>
                  <option value="tokyo">(GMT+9) 东京</option>
                  <option value="utc">(GMT+0) UTC</option>
                </Select>
              </Field>
            </div>
            <div className="mt-3">
              <Field label="个人简介" htmlFor="demo-set-bio" hint="会展示在成员名片上">
                <Textarea
                  id="demo-set-bio"
                  defaultValue="负责增长与用户运营，喜欢把复杂流程拆成可复用的模板。"
                />
              </Field>
            </div>
          </div>

          {/* 偏好 */}
          <div className="rounded-card border border-line/70 bg-surface p-3">
            <p className="text-xs font-medium text-ink">通知偏好</p>
            <div className="mt-2.5 space-y-3">
              <Switch
                label="站内通知"
                description="评论、提及与任务分配时提醒"
                checked={notify}
                onChange={setNotify}
              />
              <Switch
                label="每周摘要邮件"
                description="每周一发送上周的数据概览"
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

          {/* 危险区 */}
          <div className="rounded-card border border-danger/25 bg-danger-soft/40 p-3">
            <p className="text-xs font-medium text-danger">删除账号</p>
            <p className="mt-0.5 text-[10px] text-ink-muted">
              删除后所有项目、评论与历史记录都会一并清除，且不可恢复。
            </p>
            <Button size="sm" variant="danger" className="mt-2">
              删除账号
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
