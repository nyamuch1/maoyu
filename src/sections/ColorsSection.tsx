import Demo from '../components/layout/Demo.tsx'

type Swatch = { name: string; className: string; cssVar: string }

const GROUPS: { title: string; note: string; cols: string; items: Swatch[] }[] = [
  {
    title: '背景层',
    note: 'canvas 页面底色 → surface 承载面',
    cols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    items: [
      { name: 'canvas', className: 'bg-canvas', cssVar: '--canvas' },
      { name: 'surface', className: 'bg-surface', cssVar: '--surface' },
      { name: 'surface-2', className: 'bg-surface-2', cssVar: '--surface-2' },
      { name: 'surface-3', className: 'bg-surface-3', cssVar: '--surface-3' },
      { name: 'raised', className: 'bg-raised', cssVar: '--raised' },
    ],
  },
  {
    title: '描边与文字',
    note: '越往后层级越弱',
    cols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    items: [
      { name: 'line', className: 'bg-line', cssVar: '--line' },
      { name: 'line-strong', className: 'bg-line-strong', cssVar: '--line-strong' },
      { name: 'ink', className: 'bg-ink', cssVar: '--ink' },
      { name: 'ink-muted', className: 'bg-ink-muted', cssVar: '--ink-muted' },
      { name: 'ink-subtle', className: 'bg-ink-subtle', cssVar: '--ink-subtle' },
    ],
  },
  {
    title: '品牌色',
    note: '渐变 = primary → primary-2',
    cols: 'grid-cols-2 sm:grid-cols-4',
    items: [
      { name: 'primary', className: 'bg-primary', cssVar: '--primary' },
      { name: 'primary-2', className: 'bg-primary-2', cssVar: '--primary-2' },
      { name: 'primary-hover', className: 'bg-primary-hover', cssVar: '--primary-hover' },
      { name: 'primary-soft', className: 'bg-primary-soft', cssVar: '--primary-soft' },
    ],
  },
  {
    title: '状态色',
    note: '实色用于图标/圆点，-soft 用于底色',
    cols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    items: [
      { name: 'success', className: 'bg-success', cssVar: '--success' },
      { name: 'success-soft', className: 'bg-success-soft', cssVar: '--success-soft' },
      { name: 'warning', className: 'bg-warning', cssVar: '--warning' },
      { name: 'warning-soft', className: 'bg-warning-soft', cssVar: '--warning-soft' },
      { name: 'danger', className: 'bg-danger', cssVar: '--danger' },
      { name: 'danger-soft', className: 'bg-danger-soft', cssVar: '--danger-soft' },
      { name: 'info', className: 'bg-info', cssVar: '--info' },
      { name: 'info-soft', className: 'bg-info-soft', cssVar: '--info-soft' },
    ],
  },
]

const USAGE_SNIPPET = `<!-- 组件只写语义类名，不写死色值 -->
<div class="rounded-card border border-line bg-surface p-6 shadow-clay">
  <h3 class="text-ink">标题</h3>
  <p class="text-ink-muted">正文</p>
  <button class="rounded-full bg-linear-to-br from-primary
                 to-primary-2 px-5 py-3 text-on-primary">
    主按钮
  </button>
</div>`

const TOKEN_SNIPPET = `/* src/styles/theme.css */
:root {
  --canvas: #f4f1ff;   /* 浅色页面底 */
  --primary: #7c3aed;  /* 浅色品牌色 */
}
.dark {
  --canvas: #100e1a;   /* 深色页面底 */
  --primary: #a78bfa;  /* 深色品牌色 */
}`

export default function ColorsSection() {
  return (
    <div className="space-y-8">
      {GROUPS.map((group) => (
        <Demo key={group.title} label={group.title} hint={group.note}>
          <div className={['grid gap-3', group.cols].join(' ')}>
            {group.items.map((item) => (
              <div
                key={item.name}
                className="overflow-hidden rounded-2xl border border-line bg-surface-2"
              >
                <div className={['h-12 w-full', item.className].join(' ')} />
                <div className="px-3 py-2">
                  <p className="text-xs font-medium text-ink">{item.name}</p>
                  <p className="font-mono text-[10px] text-ink-subtle">{item.cssVar}</p>
                </div>
              </div>
            ))}
          </div>
        </Demo>
      ))}

      <div className="grid gap-6 border-t border-line/70 pt-8 lg:grid-cols-2">
        <Demo label="圆角 Radius">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'field', className: 'rounded-field' },
              { label: 'card', className: 'rounded-card' },
              { label: 'pill', className: 'rounded-pill' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div
                  className={[
                    'grid h-20 place-items-center border border-line bg-surface-2 shadow-clay-inset',
                    item.className,
                  ].join(' ')}
                >
                  <span className="font-mono text-[11px] text-ink-subtle">{item.label}</span>
                </div>
                <p className="mt-2 text-xs text-ink-muted">rounded-{item.label}</p>
              </div>
            ))}
          </div>
        </Demo>

        <Demo label="阴影 Shadow" hint="紫调柔光 + 顶部高光">
          <div className="grid grid-cols-3 gap-3">
            {['clay-sm', 'clay', 'clay-lg'].map((item) => (
              <div key={item} className="text-center">
                <div
                  className={[
                    'grid h-20 place-items-center rounded-card bg-surface',
                    item === 'clay-sm'
                      ? 'shadow-clay-sm'
                      : item === 'clay'
                        ? 'shadow-clay'
                        : 'shadow-clay-lg',
                  ].join(' ')}
                >
                  <span className="font-mono text-[11px] text-ink-subtle">{item}</span>
                </div>
                <p className="mt-2 text-xs text-ink-muted">shadow-{item}</p>
              </div>
            ))}
          </div>
        </Demo>
      </div>

      <div className="grid gap-4 border-t border-line/70 pt-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="mb-2 font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
            在组件里这样用
          </p>
          <pre className="overflow-x-auto rounded-field bg-surface-2 p-4 text-[11.5px] leading-relaxed text-ink-muted">
            <code>{USAGE_SNIPPET}</code>
          </pre>
        </div>
        <div>
          <p className="mb-2 font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
            换肤只改这一个文件
          </p>
          <pre className="overflow-x-auto rounded-field bg-surface-2 p-4 text-[11.5px] leading-relaxed text-ink-muted">
            <code>{TOKEN_SNIPPET}</code>
          </pre>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-field bg-primary-soft/50 px-4 py-3 text-xs text-ink-muted">
        <span className="size-1.5 rounded-full bg-primary" />
        暗色模式由 <code className="rounded bg-surface px-1 py-0.5 font-mono">html.dark</code>{' '}
        驱动；右上角可选「跟随系统 / 浅色 / 深色」，首屏前用内联脚本写入，刷新不会闪白。
      </div>
    </div>
  )
}
