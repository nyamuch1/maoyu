import { getNav } from '../app/navigation.ts'
import PageShell from '../components/layout/PageShell.tsx'
import SelectionSection from '../sections/SelectionSection.tsx'

export default function SelectionPage() {
  return (
    <PageShell item={getNav('selection')}>
      <SelectionSection />
    </PageShell>
  )
}
