import StatusPage from '../components/ui/StatusPage.tsx'

type DemoNotFoundProps = {
  to: string
  label: string
}

/** 示例站点内部的 404：保持在对应站点的外壳里 */
export default function DemoNotFound({ to, label }: DemoNotFoundProps) {
  return <StatusPage code={404} compact backTo={to} backLabel={label} />
}
