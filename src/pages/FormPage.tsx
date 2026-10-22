import { getNav } from '../app/navigation.ts'
import PageShell from '../components/layout/PageShell.tsx'
import FormSection from '../sections/FormSection.tsx'

export default function FormPage() {
  return (
    <PageShell item={getNav('form')}>
      <FormSection />
    </PageShell>
  )
}
