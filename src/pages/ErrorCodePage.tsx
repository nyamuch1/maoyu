import { useParams, useRouteError } from 'react-router-dom'
import StatusPage from '../components/ui/StatusPage.tsx'
import { STATUS_CODES, type StatusCode } from '../config/status-pages.ts'

function parseCode(value: string | undefined): StatusCode {
  const code = Number(value)
  return (STATUS_CODES as number[]).includes(code) ? (code as StatusCode) : 404
}

/** /error/403 | 404 | 500 | 502 | 503 —— 可直接分享的错误页 */
export default function ErrorCodePage() {
  const { code } = useParams()
  return <StatusPage code={parseCode(code)} full />
}

/** 路由渲染异常的兜底（React Router errorElement） */
export function RouteErrorBoundary() {
  const error = useRouteError()
  const message =
    error instanceof Error ? error.message : typeof error === 'string' ? error : '未知错误'

  return <StatusPage code={500} full details={import.meta.env.DEV ? message : undefined} />
}
