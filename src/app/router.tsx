import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './AppLayout.tsx'
import AboutPage from '../pages/AboutPage.tsx'
import ErrorCodePage, { RouteErrorBoundary } from '../pages/ErrorCodePage.tsx'
import GoodsPage from '../pages/GoodsPage.tsx'
import HomePage from '../pages/HomePage.tsx'
import NewsPage from '../pages/NewsPage.tsx'
import NotFoundPage from '../pages/NotFoundPage.tsx'
import WorksPage from '../pages/WorksPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'works', element: <WorksPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'goods', element: <GoodsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/error/:code',
    element: <ErrorCodePage />,
    errorElement: <RouteErrorBoundary />,
  },
])
