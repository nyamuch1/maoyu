import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from './AppLayout.tsx'
import ComponentsLayout from './ComponentsLayout.tsx'
import DemoNotFound from '../demo/DemoNotFound.tsx'
import DemoPage from '../demo/DemoPage.tsx'
import ButtonsPage from '../pages/ButtonsPage.tsx'
import FeedbackPage from '../pages/FeedbackPage.tsx'
import FormPage from '../pages/FormPage.tsx'
import HomePage from '../pages/HomePage.tsx'
import NotFoundPage from '../pages/NotFoundPage.tsx'
import SelectionPage from '../pages/SelectionPage.tsx'
import TablePage from '../pages/TablePage.tsx'
import TokensPage from '../pages/TokensPage.tsx'

/* 示例站点按路由动态加载：组件库首屏不必为 14 套 demo 买单 */
const LayoutsPage = lazy(() => import('../pages/LayoutsPage.tsx'))
const AdminShell = lazy(() =>
  import('../demo/AdminApp.tsx').then((m) => ({ default: m.AdminShell })),
)
const AdminDashboard = lazy(() =>
  import('../demo/AdminApp.tsx').then((m) => ({ default: m.AdminDashboard })),
)
const AdminSettings = lazy(() =>
  import('../demo/AdminApp.tsx').then((m) => ({ default: m.AdminSettings })),
)
const AdminMessages = lazy(() =>
  import('../demo/AdminApp.tsx').then((m) => ({ default: m.AdminMessages })),
)
const AdminNotFound = lazy(() =>
  import('../demo/AdminApp.tsx').then((m) => ({ default: m.AdminNotFound })),
)

const CommunityShell = lazy(() =>
  import('../demo/CommunityApp.tsx').then((m) => ({ default: m.CommunityShell })),
)
const ForumPage = lazy(() =>
  import('../demo/CommunityApp.tsx').then((m) => ({ default: m.ForumPage })),
)
const ThreadPage = lazy(() =>
  import('../demo/CommunityApp.tsx').then((m) => ({ default: m.ThreadPage })),
)

const ShopShell = lazy(() => import('../demo/ShopApp.tsx').then((m) => ({ default: m.ShopShell })))
const ProductListPage = lazy(() =>
  import('../demo/ShopApp.tsx').then((m) => ({ default: m.ProductListPage })),
)
const ProductDetailPage = lazy(() =>
  import('../demo/ShopApp.tsx').then((m) => ({ default: m.ProductDetailPage })),
)
const CheckoutPage = lazy(() =>
  import('../demo/ShopApp.tsx').then((m) => ({ default: m.CheckoutPage })),
)

const BlogShell = lazy(() => import('../demo/BlogApp.tsx').then((m) => ({ default: m.BlogShell })))
const BlogHomePage = lazy(() =>
  import('../demo/BlogApp.tsx').then((m) => ({ default: m.BlogHomePage })),
)
const ArticlePage = lazy(() =>
  import('../demo/BlogApp.tsx').then((m) => ({ default: m.ArticlePage })),
)

const DocsPage = lazy(() => import('../demo/DocsApp.tsx'))

const LandingPage = lazy(() => import('../layouts/LandingLayoutDemo.tsx'))
const PricingPage = lazy(() => import('../layouts/PricingLayoutDemo.tsx'))
const LoginPage = lazy(() => import('../layouts/AuthLayoutDemo.tsx'))

export const router = createBrowserRouter([
  /* ---------------- 组件库站点（全站头部 / 页脚） ---------------- */
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: 'components',
        element: <ComponentsLayout />,
        children: [
          { index: true, element: <Navigate to="buttons" replace /> },
          { path: 'tokens', element: <TokensPage /> },
          { path: 'buttons', element: <ButtonsPage /> },
          { path: 'selection', element: <SelectionPage /> },
          { path: 'form', element: <FormPage /> },
          { path: 'table', element: <TablePage /> },
          { path: 'feedback', element: <FeedbackPage /> },
        ],
      },

      { path: 'layouts', element: <LayoutsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  /* ---------------- 后台 App：/admin + 二级页面 ---------------- */
  {
    path: '/admin',
    element: <AdminShell />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'settings', element: <AdminSettings /> },
      { path: 'messages', element: <AdminMessages /> },
      { path: '*', element: <AdminNotFound /> },
    ],
  },

  /* ---------------- 论坛：/community → /community/t/:threadId ---------------- */
  {
    path: '/community',
    element: <CommunityShell />,
    children: [
      { index: true, element: <ForumPage /> },
      { path: 't/:threadId', element: <ThreadPage /> },
      { path: '*', element: <DemoNotFound to="/community" label="返回论坛首页" /> },
    ],
  },

  /* ---------------- 商城：/shop → /shop/products/:productId → /shop/checkout ---------------- */
  {
    path: '/shop',
    element: <ShopShell />,
    children: [
      { index: true, element: <ProductListPage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: '*', element: <DemoNotFound to="/shop" label="返回商品列表" /> },
    ],
  },

  /* ---------------- 博客：/blog → /blog/:slug ---------------- */
  {
    path: '/blog',
    element: <BlogShell />,
    children: [
      { index: true, element: <BlogHomePage /> },
      { path: ':slug', element: <ArticlePage /> },
      { path: '*', element: <DemoNotFound to="/blog" label="返回文章列表" /> },
    ],
  },

  /* ---------------- 文档：/docs → /docs/:section ---------------- */
  { path: '/docs', element: <DocsPage /> },
  { path: '/docs/:section', element: <DocsPage /> },

  /* ---------------- 独立单页：营销 / 价格 / 登录 ---------------- */
  {
    path: '/landing',
    element: (
      <DemoPage>
        <LandingPage />
      </DemoPage>
    ),
  },
  {
    path: '/pricing',
    element: (
      <DemoPage>
        <PricingPage />
      </DemoPage>
    ),
  },
  {
    path: '/login',
    element: (
      <DemoPage>
        <LoginPage />
      </DemoPage>
    ),
  },
])
