import { useMemo, useState } from 'react'
import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import Checkbox from '../components/ui/Checkbox.tsx'
import Progress from '../components/ui/Progress.tsx'
import {
  ArrowUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from '../components/ui/icons.tsx'

type MemberStatus = 'active' | 'pending' | 'blocked'

type Member = {
  id: string
  name: string
  email: string
  role: string
  team: string
  status: MemberStatus
  joined: string
  quota: number
}

const MEMBERS: Member[] = [
  {
    id: 'm-01',
    name: '陈小满',
    email: 'xiaoman@orbit.dev',
    role: '设计负责人',
    team: '设计',
    status: 'active',
    joined: '2026-03-12',
    quota: 68,
  },
  {
    id: 'm-02',
    name: '林一舟',
    email: 'yizhou@orbit.dev',
    role: '前端工程师',
    team: '研发',
    status: 'active',
    joined: '2026-04-02',
    quota: 42,
  },
  {
    id: 'm-03',
    name: '周雨桐',
    email: 'yutong@orbit.dev',
    role: '产品经理',
    team: '产品',
    status: 'pending',
    joined: '2026-05-18',
    quota: 12,
  },
  {
    id: 'm-04',
    name: '赵明轩',
    email: 'mingxuan@orbit.dev',
    role: '后端工程师',
    team: '研发',
    status: 'active',
    joined: '2026-02-27',
    quota: 88,
  },
  {
    id: 'm-05',
    name: '苏晚晴',
    email: 'wanqing@orbit.dev',
    role: '运营',
    team: '增长',
    status: 'blocked',
    joined: '2025-12-09',
    quota: 5,
  },
  {
    id: 'm-06',
    name: '何知远',
    email: 'zhiyuan@orbit.dev',
    role: '数据分析',
    team: '增长',
    status: 'active',
    joined: '2026-01-15',
    quota: 57,
  },
]

const STATUS: Record<MemberStatus, { label: string; tone: 'success' | 'warning' | 'danger' }> = {
  active: { label: '正常', tone: 'success' },
  pending: { label: '待激活', tone: 'warning' },
  blocked: { label: '已禁用', tone: 'danger' },
}

type SortKey = 'name' | 'joined' | 'quota'
const PAGE_SIZE = 4

type SortHeaderProps = {
  label: string
  sortKey: SortKey
  sort: { key: SortKey; dir: 'asc' | 'desc' }
  onSort: (key: SortKey) => void
}

function SortHeader({ label, sortKey, sort, onSort }: SortHeaderProps) {
  const active = sort.key === sortKey

  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className={[
        'inline-flex items-center gap-1 transition-colors hover:text-ink',
        active ? 'text-ink' : '',
      ].join(' ')}
    >
      {label}
      <ArrowUpDownIcon
        className={['size-3.5', active ? 'text-primary' : 'text-ink-subtle'].join(' ')}
      />
    </button>
  )
}

export default function TableSection() {
  const [selected, setSelected] = useState<string[]>(['m-02'])
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({
    key: 'joined',
    dir: 'desc',
  })

  const sorted = useMemo(() => {
    const rows = [...MEMBERS]
    rows.sort((a, b) => {
      const factor = sort.dir === 'asc' ? 1 : -1
      if (sort.key === 'quota') return (a.quota - b.quota) * factor
      return String(a[sort.key]).localeCompare(String(b[sort.key]), 'zh-CN') * factor
    })
    return rows
  }, [sort])

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const rows = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const allSelected = rows.length > 0 && rows.every((row) => selected.includes(row.id))

  const toggleRow = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const togglePage = () => {
    if (allSelected) {
      setSelected((current) => current.filter((id) => !rows.some((row) => row.id === id)))
    } else {
      setSelected((current) => Array.from(new Set([...current, ...rows.map((row) => row.id)])))
    }
  }

  const toggleSort = (key: SortKey) => {
    setSort((current) =>
      current.key === key
        ? { key, dir: current.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'asc' },
    )
    setPage(1)
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-card border border-line">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2/70 text-xs text-ink-subtle">
                <th className="w-12 px-4 py-3">
                  <Checkbox
                    label=""
                    ariaLabel="全选当前页"
                    checked={allSelected}
                    onChange={togglePage}
                  />
                </th>
                <th className="px-3 py-3 font-medium">
                  <SortHeader label="成员" sortKey="name" sort={sort} onSort={toggleSort} />
                </th>
                <th className="px-3 py-3 font-medium">角色 / 团队</th>
                <th className="px-3 py-3 font-medium">状态</th>
                <th className="px-3 py-3 font-medium">
                  <SortHeader label="加入时间" sortKey="joined" sort={sort} onSort={toggleSort} />
                </th>
                <th className="w-40 px-3 py-3 font-medium">
                  <SortHeader label="存储用量" sortKey="quota" sort={sort} onSort={toggleSort} />
                </th>
                <th className="w-16 px-3 py-3 font-medium">
                  <span className="sr-only">操作</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => {
                const isSelected = selected.includes(row.id)
                const status = STATUS[row.status]

                return (
                  <tr
                    key={row.id}
                    className={[
                      'border-b border-line/60 transition-colors last:border-0',
                      isSelected ? 'bg-primary-soft/45' : 'hover:bg-surface-2/70',
                    ].join(' ')}
                  >
                    <td className="px-4 py-3">
                      <Checkbox
                        label=""
                        ariaLabel={`选择 ${row.name}`}
                        checked={isSelected}
                        onChange={() => toggleRow(row.id)}
                      />
                    </td>

                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-xs font-medium text-on-primary">
                          {row.name.slice(0, 1)}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-ink">{row.name}</span>
                          <span className="block truncate text-xs text-ink-subtle">
                            {row.email}
                          </span>
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-3">
                      <span className="block text-ink">{row.role}</span>
                      <span className="block text-xs text-ink-subtle">{row.team}</span>
                    </td>

                    <td className="px-3 py-3">
                      <Badge tone={status.tone} dot>
                        {status.label}
                      </Badge>
                    </td>

                    <td className="px-3 py-3 font-mono text-xs text-ink-muted">{row.joined}</td>

                    <td className="px-3 py-3">
                      <Progress value={row.quota} showValue={false} />
                      <span className="mt-1 block text-right font-mono text-[10px] text-ink-subtle">
                        {row.quota}%
                      </span>
                    </td>

                    <td className="px-3 py-3">
                      <button
                        type="button"
                        className="rounded-full p-1.5 text-ink-subtle transition-colors hover:bg-surface-3 hover:text-danger focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none"
                        aria-label={`移除 ${row.name}`}
                        onClick={() =>
                          setSelected((current) => current.filter((item) => item !== row.id))
                        }
                      >
                        <CloseIcon className="size-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface-2/50 px-4 py-3">
          <p className="text-xs text-ink-muted">
            已选 <span className="font-medium text-ink">{selected.length}</span> / {MEMBERS.length}{' '}
            项
          </p>

          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="secondary"
              aria-label="上一页"
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
              icon={<ChevronLeftIcon className="size-3.5" />}
            >
              上一页
            </Button>
            <span className="px-1 font-mono text-xs text-ink-subtle">
              {currentPage} / {pageCount}
            </span>
            <Button
              size="sm"
              variant="secondary"
              aria-label="下一页"
              disabled={currentPage >= pageCount}
              onClick={() => setPage(currentPage + 1)}
              icon={<ChevronRightIcon className="size-3.5" />}
            >
              下一页
            </Button>
          </div>
        </div>
      </div>

      <p className="text-xs text-ink-subtle">
        提示：点击「成员 / 加入时间 / 存储用量」表头可切换排序，勾选行会实时统计。
      </p>
    </div>
  )
}
