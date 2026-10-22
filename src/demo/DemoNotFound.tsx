import { Link } from 'react-router-dom'

type DemoNotFoundProps = {
  to: string
  label: string
  title?: string
}

/** 示例站点内部的 404：保持在对应站点的外壳里 */
export default function DemoNotFound({ to, label, title = '这个页面不存在' }: DemoNotFoundProps) {
  return (
    <div className="grid min-h-[50vh] place-items-center text-center">
      <div>
        <p className="font-mono text-5xl font-bold text-primary/25">404</p>
        <p className="mt-2 text-sm text-ink-muted">{title}</p>
        <Link to={to} className="mt-3 inline-block text-sm text-primary hover:underline">
          {label}
        </Link>
      </div>
    </div>
  )
}
