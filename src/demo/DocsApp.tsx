import { Link, NavLink, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge.tsx'
import { BookIcon, SearchIcon } from '../components/ui/icons.tsx'
import { usePageTitle } from '../hooks/usePageTitle.ts'

type DocSection = {
  key: string
  label: string
  title: string
  intro: string
  code: string
  bullets: string[]
}

const SECTIONS: DocSection[] = [
  {
    key: 'getting-started',
    label: '快速开始',
    title: '5 分钟接入',
    intro:
      '这套组件库基于 Vite + React + Tailwind CSS 4，颜色、圆角、阴影全部走语义 token，复制组件即可直接用。',
    code: 'pnpm add @maoyusu/ui\n\n# 或\nnpm i @maoyusu/ui',
    bullets: [
      '在入口文件引入一次主题样式',
      '暗色模式由 <html class="dark"> 驱动',
      '组件只消费语义 token，不写死色值',
    ],
  },
  {
    key: 'install',
    label: '安装',
    title: '安装与构建',
    intro: '推荐 pnpm；构建产物提供 ESM 与类型声明，支持 Vite / Next / Rspack 等打包器。',
    code: 'pnpm install\npnpm build\npnpm preview',
    bullets: [
      'Node.js 20.19+ 或 22.12+',
      '构建前自动执行 tsc -b 类型检查',
      '产物在 dist/，可直接部署',
    ],
  },
  {
    key: 'theme',
    label: '主题与配色',
    title: '主题与配色',
    intro: '所有颜色定义在 theme.css：:root 是浅色，.dark 覆盖同名变量。换肤只改 6 个品牌变量。',
    code: ':root {\n  --canvas: #f4f1ff;\n  --primary: #7c3aed;\n  --r-card: 1.5rem;\n}',
    bullets: [
      '语义化命名：canvas / surface / line / ink / primary',
      '暗色只替换变量，不重写样式',
      '图标与图表也用同一套 token',
    ],
  },
  {
    key: 'components',
    label: '组件',
    title: '组件清单',
    intro: '按钮、表单、选择、展示、反馈、主题切换都已就绪，全部支持键盘操作与明暗主题。',
    code: 'import { Button, Field, Input } from "@maoyusu/ui"',
    bullets: ['6 变体 × 3 尺寸按钮', '输入框四种状态 + 校验', '表格 / 分页 / Toast 等组合示例'],
  },
  {
    key: 'deploy',
    label: '部署',
    title: '部署',
    intro: 'BrowserRouter 需要服务端把未知路径回落到 index.html；静态托管默认已支持。',
    code: '# nginx\ntry_files $uri $uri/ /index.html;',
    bullets: [
      'Vercel / Netlify 开箱即用',
      'CDN 缓存 assets/，index.html 不缓存',
      '环境变量用 VITE_ 前缀',
    ],
  },
]

const TOC = ['前置条件', '安装依赖', '引入样式', '验证效果', '下一步']

export default function DocsPage() {
  const { section } = useParams()
  const current = SECTIONS.find((item) => item.key === section) ?? SECTIONS[0]
  usePageTitle(`文档 · ${current.label}`)

  return (
    <div className="flex h-dvh flex-col bg-surface text-ink">
      <header className="flex items-center gap-3 border-b border-line/70 px-4 py-2.5">
        <Link to="/docs" className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-xl bg-linear-to-br from-primary to-primary-2 text-on-primary">
            <BookIcon className="size-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">maoyusu docs</span>
        </Link>

        <span className="ml-4 flex h-8 w-56 items-center gap-1.5 rounded-full bg-surface-2 px-2.5 text-xs text-ink-subtle shadow-clay-inset max-md:hidden">
          <SearchIcon className="size-3.5" />
          搜索文档…
        </span>

        <div className="ml-auto flex items-center gap-3">
          <Badge tone="neutral">v0.1</Badge>
          <Link to="/layouts" className="text-[11px] text-ink-subtle hover:text-primary">
            布局画廊
          </Link>
        </div>
      </header>

      <nav className="flex gap-1.5 overflow-x-auto border-b border-line/70 px-3 py-2 md:hidden">
        {SECTIONS.map((item) => (
          <NavLink
            key={item.key}
            to={`/docs/${item.key}`}
            className={({ isActive }) =>
              [
                'shrink-0 rounded-full px-2.5 py-1.5 text-[12px]',
                isActive ? 'bg-primary-soft font-medium text-primary' : 'text-ink-muted',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="grid min-h-0 flex-1 grid-cols-[200px_1fr_160px] max-md:grid-cols-1">
        <aside className="min-h-0 overflow-auto border-r border-line/70 p-3 max-md:hidden">
          <p className="px-2 pb-2 font-mono text-[10px] tracking-[0.16em] text-ink-subtle uppercase">
            指南
          </p>
          <nav className="space-y-0.5">
            {SECTIONS.map((item) => (
              <NavLink
                key={item.key}
                to={`/docs/${item.key}`}
                className={({ isActive }) =>
                  [
                    'block rounded-field px-2.5 py-1.5 text-[13px] transition-colors',
                    isActive
                      ? 'bg-primary-soft font-medium text-primary'
                      : 'text-ink-muted hover:bg-surface-2',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <article className="min-h-0 overflow-auto px-6 py-5">
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink-subtle uppercase">
            指南 / {current.label}
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">{current.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{current.intro}</p>

          <pre className="mt-3 overflow-x-auto rounded-field bg-surface-2 p-3 font-mono text-[11px] leading-relaxed text-ink-muted shadow-clay-inset">
            {current.code}
          </pre>

          <h2 className="mt-5 text-sm font-semibold">要点</h2>
          <ul className="mt-2 space-y-1.5">
            {current.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-start gap-2 rounded-field border border-info/25 bg-info-soft/60 p-3 text-xs text-ink-muted">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-info" />
            提示：这套文档页本身就是路由示例 —— 左侧每一项都是 <code>/docs/:section</code>。
          </div>
        </article>

        <aside className="min-h-0 overflow-auto border-l border-line/70 p-3 max-md:hidden">
          <p className="px-1 pb-2 font-mono text-[10px] tracking-[0.16em] text-ink-subtle uppercase">
            本页目录
          </p>
          <ul className="space-y-1.5 border-l border-line/70 pl-2">
            {TOC.map((item, index) => (
              <li
                key={item}
                className={[
                  'text-[11px] leading-relaxed',
                  index === 0 ? 'font-medium text-primary' : 'text-ink-subtle',
                ].join(' ')}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
