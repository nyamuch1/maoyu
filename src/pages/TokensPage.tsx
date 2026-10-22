import { getNav } from '../app/navigation.ts'
import PageShell from '../components/layout/PageShell.tsx'
import ColorsSection from '../sections/ColorsSection.tsx'

export default function TokensPage() {
  return (
    <PageShell item={getNav('tokens')}>
      <ColorsSection />
    </PageShell>
  )
}
