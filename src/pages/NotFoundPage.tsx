import { Link } from 'react-router-dom'
import { buttonClass } from '../components/ui/buttonClasses.ts'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-mono text-6xl font-bold text-primary/25">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink">页面不存在</h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
        你访问的地址可能已被移动，或者从来没存在过。
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/" className={buttonClass()}>
          回到首页
        </Link>
        <Link to="/components/buttons" className={buttonClass({ variant: 'secondary' })}>
          浏览组件
        </Link>
      </div>
    </div>
  )
}
