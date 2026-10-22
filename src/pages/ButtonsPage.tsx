import { getNav } from '../app/navigation.ts'
import PageShell from '../components/layout/PageShell.tsx'
import ButtonsSection from '../sections/ButtonsSection.tsx'

export default function ButtonsPage() {
  return (
    <PageShell item={getNav('buttons')}>
      <ButtonsSection />
    </PageShell>
  )
}
