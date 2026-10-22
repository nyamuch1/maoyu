import { useState } from 'react'
import Demo from '../components/layout/Demo.tsx'
import Button from '../components/ui/Button.tsx'
import { ArrowUpDownIcon, CheckIcon, PlusIcon, SearchIcon } from '../components/ui/icons.tsx'

export default function ButtonsSection() {
  const [loading, setLoading] = useState(false)

  const simulateSubmit = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 1600)
  }

  return (
    <div className="space-y-8">
      <Demo label="变体 Variants">
        <div className="flex flex-wrap items-center gap-3">
          <Button>主要按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="soft">浅底按钮</Button>
          <Button variant="outline">描边按钮</Button>
          <Button variant="ghost">幽灵按钮</Button>
          <Button variant="danger">危险操作</Button>
        </div>
      </Demo>

      <Demo label="尺寸 Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">小尺寸 Small</Button>
          <Button size="md">中尺寸 Medium</Button>
          <Button size="lg">大尺寸 Large</Button>
        </div>
      </Demo>

      <Demo label="图标与内容" hint="图标继承文字颜色">
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<PlusIcon className="size-4" />}>新建项目</Button>
          <Button variant="secondary" icon={<SearchIcon className="size-4" />}>
            搜索
          </Button>
          <Button variant="soft" icon={<CheckIcon className="size-4" />}>
            已保存
          </Button>
          <Button variant="outline" icon={<ArrowUpDownIcon className="size-4" />}>
            排序
          </Button>
          <Button variant="ghost" size="sm" aria-label="仅图标">
            <PlusIcon className="size-4" />
          </Button>
          <Button variant="secondary" size="sm" aria-label="仅图标">
            <SearchIcon className="size-4" />
          </Button>
        </div>
      </Demo>

      <Demo label="状态 States" hint="点击「模拟提交」查看 loading">
        <div className="flex flex-wrap items-center gap-3">
          <Button loading={loading} onClick={simulateSubmit}>
            {loading ? '提交中…' : '模拟提交'}
          </Button>
          <Button disabled>禁用状态</Button>
          <Button variant="secondary" disabled>
            禁用次要
          </Button>
          <Button variant="outline" loading>
            加载中
          </Button>
        </div>
      </Demo>

      <Demo label="组合 Toolbar">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-card bg-surface-2 p-3 shadow-clay-inset">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="secondary" icon={<PlusIcon className="size-3.5" />}>
              新建
            </Button>
            <Button size="sm" variant="ghost">
              导入
            </Button>
            <Button size="sm" variant="ghost">
              导出
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost">
              取消
            </Button>
            <Button size="sm">保存</Button>
          </div>
        </div>
      </Demo>
    </div>
  )
}
