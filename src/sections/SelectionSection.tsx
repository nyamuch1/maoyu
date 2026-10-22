import { useState } from 'react'
import Demo from '../components/layout/Demo.tsx'
import Checkbox from '../components/ui/Checkbox.tsx'
import RadioGroup from '../components/ui/RadioGroup.tsx'
import Segmented from '../components/ui/Segmented.tsx'
import Switch from '../components/ui/Switch.tsx'
import { CheckIcon } from '../components/ui/icons.tsx'

const PLANS = [
  {
    id: 'starter',
    name: '入门版',
    price: '¥0',
    desc: '个人项目、试用功能',
    perks: ['1 个团队', '5GB 存储'],
  },
  {
    id: 'pro',
    name: '专业版',
    price: '¥49',
    desc: '小型团队日常协作',
    perks: ['10 个团队', '100GB 存储', '优先支持'],
  },
  {
    id: 'team',
    name: '团队版',
    price: '¥199',
    desc: '多部门统一管理',
    perks: ['不限团队', '1TB 存储', 'SSO 单点登录'],
  },
] as const

const SKILLS = ['交互设计', '设计系统', '前端开发', '数据分析', '品牌视觉', '动效']

const TAB_LABEL: Record<'all' | 'doing' | 'done', string> = {
  all: '全部',
  doing: '进行中',
  done: '已完成',
}

export default function SelectionSection() {
  const [tab, setTab] = useState<'all' | 'doing' | 'done'>('doing')
  const [switches, setSwitches] = useState({ notify: true, digest: true, publicProfile: false })
  const [checks, setChecks] = useState({ design: true, dev: false, ops: false })
  const [radio, setRadio] = useState('weekly')
  const [plan, setPlan] = useState<string>('pro')
  const [skills, setSkills] = useState<string[]>(['交互设计', '设计系统'])

  const toggleSkill = (skill: string) => {
    setSkills((current) =>
      current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill],
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Demo label="分段控件 Segmented" hint="同一层级互斥切换">
        <div className="space-y-3">
          <Segmented
            value={tab}
            onChange={setTab}
            options={[
              { value: 'all', label: '全部' },
              { value: 'doing', label: '进行中' },
              { value: 'done', label: '已完成' },
            ]}
          />
          <p className="text-xs text-ink-subtle">
            当前选中：<span className="text-ink">{TAB_LABEL[tab]}</span>
          </p>
        </div>
      </Demo>

      <Demo label="开关 Switch" hint="即时生效的二元设置">
        <div className="space-y-4 rounded-field bg-surface-2/60 p-4">
          <Switch
            label="站内通知"
            description="有新的评论或提及时提醒我"
            checked={switches.notify}
            onChange={(checked) => setSwitches((s) => ({ ...s, notify: checked }))}
          />
          <Switch
            label="每周邮件摘要"
            description="每周一发送上周的协作统计"
            checked={switches.digest}
            onChange={(checked) => setSwitches((s) => ({ ...s, digest: checked }))}
          />
          <Switch
            label="公开个人主页"
            description="其他人可以查看你的作品集"
            checked={switches.publicProfile}
            onChange={(checked) => setSwitches((s) => ({ ...s, publicProfile: checked }))}
          />
          <Switch label="禁用示例" checked={false} onChange={() => {}} disabled />
        </div>
      </Demo>

      <Demo label="复选框 Checkbox" hint="可多选">
        <div className="space-y-3.5">
          <Checkbox
            label="设计评审"
            description="每周三 15:00"
            checked={checks.design}
            onChange={(checked) => setChecks((c) => ({ ...c, design: checked }))}
          />
          <Checkbox
            label="研发周会"
            description="每周一 10:00"
            checked={checks.dev}
            onChange={(checked) => setChecks((c) => ({ ...c, dev: checked }))}
          />
          <Checkbox
            label="运维复盘"
            description="双周周五 17:00"
            checked={checks.ops}
            onChange={(checked) => setChecks((c) => ({ ...c, ops: checked }))}
          />
          <Checkbox label="禁用示例" checked disabled onChange={() => {}} />
        </div>
      </Demo>

      <Demo label="单选组 Radio" hint="整行可点，选中行浅底强调">
        <RadioGroup
          name="report-frequency"
          value={radio}
          onChange={setRadio}
          options={[
            { value: 'daily', label: '每天汇总', description: '适合高频协作的小组' },
            { value: 'weekly', label: '每周汇总', description: '推荐，信息密度适中' },
            { value: 'monthly', label: '每月汇总', description: '只看趋势与结论' },
          ]}
        />
      </Demo>

      <Demo label="可选卡片 Selectable Card" hint="单选，卡片整体可点" className="lg:col-span-2">
        <div className="grid gap-3 sm:grid-cols-3">
          {PLANS.map((item) => {
            const selected = plan === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPlan(item.id)}
                aria-pressed={selected}
                className={[
                  'relative rounded-card border p-4 text-left transition-all duration-200 outline-none',
                  'focus-visible:ring-4 focus-visible:ring-primary/25',
                  selected
                    ? 'border-primary/50 bg-primary-soft/50 shadow-clay'
                    : 'border-line bg-surface-2/50 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-clay-sm',
                ].join(' ')}
              >
                <span
                  className={[
                    'absolute top-3 right-3 grid size-5 place-items-center rounded-full border transition-all',
                    selected
                      ? 'border-transparent bg-primary text-on-primary'
                      : 'border-line-strong bg-surface text-transparent',
                  ].join(' ')}
                >
                  <CheckIcon className="size-3" />
                </span>

                <p className="text-sm font-medium text-ink">{item.name}</p>
                <p className="mt-1 text-xs text-ink-subtle">{item.desc}</p>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold tracking-tight text-ink">
                    {item.price}
                  </span>
                  <span className="text-xs text-ink-subtle">/ 月</span>
                </p>
                <ul className="mt-3 space-y-1">
                  {item.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-1.5 text-xs text-ink-muted">
                      <CheckIcon className="size-3 text-primary" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>
      </Demo>

      <Demo label="标签多选 Chips" hint="横向排列，选中填充品牌色" className="lg:col-span-2">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => {
              const selected = skills.includes(skill)
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  aria-pressed={selected}
                  className={[
                    'rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-150 outline-none',
                    'focus-visible:ring-4 focus-visible:ring-primary/25',
                    selected
                      ? 'border-transparent bg-primary text-on-primary shadow-clay-sm'
                      : 'border-line bg-surface-2 text-ink-muted hover:border-primary/40 hover:text-ink',
                  ].join(' ')}
                >
                  {skill}
                </button>
              )
            })}
          </div>
          <p className="text-xs text-ink-subtle">
            已选 {skills.length} 项：<span className="text-ink">{skills.join('、') || '无'}</span>
          </p>
        </div>
      </Demo>
    </div>
  )
}
