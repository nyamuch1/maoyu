import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'
import ThemeProvider from './app/ThemeProvider.tsx'
import { router } from './app/router.tsx'
import './index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element #root not found')
}

function RouteFallback() {
  return (
    <div className="grid min-h-dvh place-items-center bg-canvas text-ink">
      <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink-muted shadow-clay">
        <span className="size-2 animate-pulse rounded-full bg-primary" />
        正在加载…
      </div>
    </div>
  )
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <Suspense fallback={<RouteFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  </StrictMode>,
)
