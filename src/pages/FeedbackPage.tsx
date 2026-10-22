import { getNav } from '../app/navigation.ts'
import PageShell from '../components/layout/PageShell.tsx'
import FeedbackSection from '../sections/FeedbackSection.tsx'

export default function FeedbackPage() {
  return (
    <PageShell item={getNav('feedback')}>
      <FeedbackSection />
    </PageShell>
  )
}
