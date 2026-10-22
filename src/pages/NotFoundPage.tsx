import StatusPage from '../components/ui/StatusPage.tsx'

export default function NotFoundPage() {
  return <StatusPage code={404} backTo="/" backLabel="回到首页" />
}
