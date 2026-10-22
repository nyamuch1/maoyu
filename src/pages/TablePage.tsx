import { getNav } from '../app/navigation.ts'
import PageShell from '../components/layout/PageShell.tsx'
import TableSection from '../sections/TableSection.tsx'

export default function TablePage() {
  return (
    <PageShell item={getNav('table')}>
      <TableSection />
    </PageShell>
  )
}
