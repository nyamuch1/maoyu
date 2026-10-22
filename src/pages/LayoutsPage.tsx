import { useState } from 'react'
import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import Segmented from '../components/ui/Segmented.tsx'
import { buttonClass } from '../components/ui/buttonClasses.ts'
import { ChevronRightIcon } from '../components/ui/icons.tsx'
import AdminLayoutDemo from '../layouts/AdminLayoutDemo.tsx'
import ArticleLayoutDemo from '../layouts/ArticleLayoutDemo.tsx'
import AuthLayoutDemo from '../layouts/AuthLayoutDemo.tsx'
import BbsLayoutDemo from '../layouts/BbsLayoutDemo.tsx'
import BlogLayoutDemo from '../layouts/BlogLayoutDemo.tsx'
import ChatLayoutDemo from '../layouts/ChatLayoutDemo.tsx'
import CheckoutLayoutDemo from '../layouts/CheckoutLayoutDemo.tsx'
import DetailLayoutDemo from '../layouts/DetailLayoutDemo.tsx'
import DocsLayoutDemo from '../layouts/DocsLayoutDemo.tsx'
import LandingLayoutDemo from '../layouts/LandingLayoutDemo.tsx'
import PostLayoutDemo from '../layouts/PostLayoutDemo.tsx'
import PricingLayoutDemo from '../layouts/PricingLayoutDemo.tsx'
import SettingsLayoutDemo from '../layouts/SettingsLayoutDemo.tsx'
import ShopLayoutDemo from '../layouts/ShopLayoutDemo.tsx'

type LayoutGroup = 'app' | 'content' | 'commerce'

type LayoutEntry = {
  key: string
  group: LayoutGroup
  label: string
  summary: string
  url: string
  structure: string[]
  scene: string
  tip: string
  Component: ComponentType
}

const LAYOUTS: LayoutEntry[] = [
  /* ---------------- 后台 / 工具 ---------------- */
  {
    key: 'admin',
    group: 'app',
    label: '后台管理',
    summary: '左侧固定导航 + 顶栏 + 可滚动内容区，最典型的管理系统骨架。',
    url: 'app.maoyusu.dev/dashboard',
    structure: [
      '侧栏固定宽度，内容区独立滚动',
      '顶栏放全局搜索、通知、账号入口',
      'KPI 卡片 → 图表 → 列表的浏览顺序',
    ],
    scene: 'B 端后台、SaaS 控制台、运营 / 数据看板',
    tip: '侧栏宽度 180–240px；内容区用 min-h-0 才能正确出现滚动条。',
    Component: AdminLayoutDemo,
  },
  {
    key: 'docs',
    group: 'app',
    label: '文档三栏',
    summary: '左侧章节目录 + 中间正文 + 右侧本页目录，长内容阅读效率最高。',
    url: 'docs.maoyusu.dev/guide',
    structure: [
      '左栏固定章节树，当前章节高亮',
      '正文限宽，代码块与提示块统一留白',
      '右栏 TOC 跟随阅读进度',
    ],
    scene: '产品文档、组件库、帮助中心、博客长文',
    tip: '正文宽度控制在 640–760px；左右两栏在 lg 以下可折叠成抽屉。',
    Component: DocsLayoutDemo,
  },
  {
    key: 'auth',
    group: 'app',
    label: '登录居中',
    summary: '整屏背景 + 居中卡片，焦点只有一个：完成登录。',
    url: 'app.maoyusu.dev/login',
    structure: [
      '居中卡片宽度 320–400px',
      '背景用品牌色光斑，不放干扰元素',
      '主按钮通栏，第三方登录放次层级',
    ],
    scene: '登录 / 注册 / 找回密码 / 邀请激活',
    tip: '卡片内只用一种对齐方式；错误提示固定位置，避免表单跳动。',
    Component: AuthLayoutDemo,
  },

  {
    key: 'settings',
    group: 'app',
    label: '用户设置',
    summary: '左侧设置菜单 + 右侧表单区，账号类页面最常见的形式。',
    url: 'app.maoyusu.dev/settings/profile',
    structure: [
      '左侧菜单按功能分组，当前项高亮',
      '右侧单一滚动列，按卡片分组字段',
      '危险操作放最后并用危险色',
    ],
    scene: '个人中心、账号设置、工作区配置',
    tip: '保存按钮固定在顶部或底部；离开前提示未保存修改。',
    Component: SettingsLayoutDemo,
  },
  {
    key: 'chat',
    group: 'app',
    label: '消息中心',
    summary: '左侧会话列表 + 右侧聊天窗口，IM 类页面的最小结构。',
    url: 'app.maoyusu.dev/messages',
    structure: [
      '会话列表按时间排序，未读用角标',
      '消息气泡左右区分发送方',
      '输入框固定在底部，不随消息滚动',
    ],
    scene: '私信 / 客服 / 团队协作消息',
    tip: '消息区用 flex-1 + overflow-auto；滚动到顶部再加载历史消息。',
    Component: ChatLayoutDemo,
  },

  /* ---------------- 内容 / 社区 ---------------- */
  {
    key: 'bbs',
    group: 'content',
    label: '论坛首页',
    summary: '版块卡片 + 最新帖子列表 + 右侧热帖与活跃用户，社区首页标准结构。',
    url: 'bbs.maoyusu.dev',
    structure: [
      '顶部导航 + 发帖入口始终可见',
      '版块卡片让人一眼找到去处',
      '帖子列表按回复时间排序，右栏放热帖',
    ],
    scene: 'BBS / 社区首页、问答站、贴吧类产品',
    tip: '首屏优先展示版块，其次最新帖；列表行高保持一致，方便扫读。',
    Component: BbsLayoutDemo,
  },
  {
    key: 'post',
    group: 'content',
    label: '帖子详情',
    summary: '主楼 + 回复列表 + 右侧作者卡，UGC 阅读与讨论页的标准结构。',
    url: 'bbs.maoyusu.dev/t/1042',
    structure: [
      '主楼信息完整：作者、时间、统计、操作',
      '回复按楼层线性排列，底部固定回复框',
      '右侧作者卡 + 相似主题提升留存',
    ],
    scene: '论坛帖子、问答详情、评论型内容页',
    tip: '楼层之间用分割线而不是卡片，长列表更省垂直空间。',
    Component: PostLayoutDemo,
  },
  {
    key: 'blog',
    group: 'content',
    label: '个人博客',
    summary: '个人信息头 + 文章列表 + 标签 / 归档侧栏，轻量个人站结构。',
    url: 'blog.maoyusu.dev',
    structure: [
      '顶部个人信息建立人设与信任',
      '文章列表用「封面 + 摘要 + 标签」',
      '侧栏放标签、归档、订阅入口',
    ],
    scene: '个人博客、技术专栏、独立作者站',
    tip: '正文限宽 640–720px；列表摘要两行截断，保持节奏一致。',
    Component: BlogLayoutDemo,
  },

  {
    key: 'article',
    group: 'content',
    label: '资讯详情',
    summary: '居中正文 + 作者卡 + 相关阅读，媒体 / 资讯类内容页。',
    url: 'weekly.maoyusu.dev/posts/1042',
    structure: [
      '正文限宽居中，阅读节奏优先',
      '标题区放分类、阅读时长、作者与时间',
      '文末作者卡 + 相关阅读承接下一跳',
    ],
    scene: '资讯 / 周刊 / 公众号文章、产品博客',
    tip: '正文 620–720px；图片统一宽度，引用块单独样式。',
    Component: ArticleLayoutDemo,
  },

  /* ---------------- 营销 / 电商 ---------------- */
  {
    key: 'landing',
    group: 'commerce',
    label: '营销首页',
    summary: '顶栏 + Hero + 品牌墙 + 特性 + CTA + 页脚，官网首页的标准结构。',
    url: 'www.maoyusu.dev',
    structure: [
      '首屏只讲一句价值 + 一个主 CTA',
      '品牌墙建立信任，特性区解释怎么做',
      '底部 CTA + 页脚做最后转化与导航',
    ],
    scene: '官网首页、产品落地页、活动专题页',
    tip: '首屏高度控制在 1–1.5 屏；全页只保留一个主色按钮。',
    Component: LandingLayoutDemo,
  },
  {
    key: 'shop',
    group: 'commerce',
    label: '商品列表',
    summary: '顶栏 + 筛选侧栏 + 商品卡片网格 + 分页，电商列表页标准结构。',
    url: 'shop.maoyusu.dev/products',
    structure: [
      '筛选固定在左，结果网格在右',
      '顶部排序 + 结果数，减少选择成本',
      '卡片只放图、名、价、评分、加入按钮',
    ],
    scene: '电商列表、资源 / 模板市场、搜索结果页',
    tip: '筛选项超过 6 组时折叠成抽屉；卡片图统一比例，避免加载时跳动。',
    Component: ShopLayoutDemo,
  },
  {
    key: 'detail',
    group: 'commerce',
    label: '商品详情',
    summary: '图集 + 购买信息 + 详情 Tab，信息密度最高的电商页面。',
    url: 'shop.maoyusu.dev/products/1042',
    structure: [
      '左图右信息，价格与 CTA 保持在首屏',
      '规格、数量、服务承诺紧贴购买按钮',
      'Tab 承载参数与评价，避免首屏过长',
    ],
    scene: '商品详情、课程 / 服务详情、内容付费页',
    tip: '购买按钮吸底或固定在右栏；图片用统一比例占位防止抖动。',
    Component: DetailLayoutDemo,
  },
  {
    key: 'pricing',
    group: 'commerce',
    label: '价格页',
    summary: '三档定价 + 功能对比 + FAQ，SaaS 转化页的标准结构。',
    url: 'www.maoyusu.dev/pricing',
    structure: ['中间档高亮为推荐方案', '价格上方放月付 / 年付切换', '对比表与 FAQ 解决最后疑虑'],
    scene: 'SaaS 定价页、会员体系、套餐升级页',
    tip: '推荐档用主色描边 + 徽标；FAQ 默认展开第一条。',
    Component: PricingLayoutDemo,
  },
  {
    key: 'checkout',
    group: 'commerce',
    label: '结算页',
    summary: '左侧信息表单 + 右侧固定订单摘要，转化路径最短的页面。',
    url: 'shop.maoyusu.dev/checkout',
    structure: [
      '顶部步骤条让用户知道当前进度',
      '地址 / 配送 / 支付分区填写',
      '右侧摘要常驻，合计与提交按钮固定',
    ],
    scene: '下单结算、预约确认、订单支付',
    tip: '摘要栏 sticky；提交按钮附近再次展示金额与保障说明。',
    Component: CheckoutLayoutDemo,
  },
]

/** 每套布局对应的真实路由（点击进入可交互、可分享 URL 的完整示例） */
const REAL_ROUTES: Record<string, string> = {
  admin: '/admin',
  docs: '/docs',
  auth: '/login',
  settings: '/admin/settings',
  chat: '/admin/messages',
  bbs: '/community',
  post: '/community/t/1042',
  blog: '/blog',
  article: '/blog/design-tokens',
  landing: '/landing',
  shop: '/shop',
  detail: '/shop/products/1042',
  pricing: '/pricing',
  checkout: '/shop/checkout',
}

const GROUPS: { key: LayoutGroup; label: string }[] = [
  { key: 'app', label: '后台 / 工具' },
  { key: 'content', label: '内容 / 社区' },
  { key: 'commerce', label: '营销 / 电商' },
]

export default function LayoutsPage() {
  const [group, setGroup] = useState<LayoutGroup>('app')
  const [activeKey, setActiveKey] = useState('admin')

  const groupItems = LAYOUTS.filter((item) => item.group === group)
  const current = groupItems.find((item) => item.key === activeKey) ?? groupItems[0]
  const { Component } = current

  const handleGroup = (next: LayoutGroup) => {
    setGroup(next)
    const first = LAYOUTS.find((item) => item.group === next)
    if (first) setActiveKey(first.key)
  }

  return (
    <div className="space-y-6 py-8">
      <header className="px-1">
        <p className="font-mono text-[11px] tracking-[0.18em] text-ink-subtle uppercase">Layouts</p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">常见布局</h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
          14 套可直接复用的页面骨架：后台 / 工具（含用户设置、消息中心）、内容 /
          社区（论坛、帖子、博客、资讯详情）、营销 /
          电商（含价格页与结算页）。先选分组再选具体布局，切换即时预览。
        </p>
      </header>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Segmented
            ariaLabel="布局分组"
            value={group}
            onChange={handleGroup}
            options={GROUPS.map((item) => ({ value: item.key, label: item.label }))}
          />
          <span className="text-xs text-ink-subtle">{current.summary}</span>
        </div>

        <Segmented
          ariaLabel="选择布局示例"
          value={current.key}
          onChange={setActiveKey}
          options={groupItems.map((item) => ({ value: item.key, label: item.label }))}
        />
      </div>

      {/* 模拟浏览器窗口 */}
      <div className="overflow-hidden rounded-card border border-line/70 bg-surface shadow-clay">
        <div className="flex items-center gap-2 border-b border-line/70 bg-surface-2 px-3 py-2">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-danger/70" />
            <span className="size-2.5 rounded-full bg-warning/70" />
            <span className="size-2.5 rounded-full bg-success/70" />
          </span>
          <span className="mx-auto flex h-6 max-w-[320px] flex-1 items-center justify-center rounded-full bg-surface px-3 font-mono text-[10px] text-ink-subtle">
            {current.url}
          </span>
          <span className="w-10" />
        </div>

        <div className="overflow-x-auto">
          <div className="h-[620px] min-w-[900px]">
            <Component />
          </div>
        </div>
      </div>

      <p className="-mt-3 px-1 text-[11px] text-ink-subtle lg:hidden">
        预览是固定 900px 宽的桌面布局，可左右滑动查看完整内容。
      </p>

      <div className="-mt-2 flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="text-[11px] text-ink-subtle">
          上方只是静态预览；点右侧按钮进入带真实路由、可分享 URL 的完整示例。
        </p>
        <Link to={REAL_ROUTES[current.key] ?? '/layouts'} className={buttonClass({ size: 'sm' })}>
          打开真实页面
          <ChevronRightIcon className="size-3.5" />
        </Link>
      </div>

      {/* 结构说明 */}
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-card border border-line/70 bg-surface p-5 shadow-clay-sm">
          <h2 className="text-sm font-medium text-ink">结构要点</h2>
          <ul className="mt-2.5 space-y-2">
            {current.structure.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-ink-muted">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-card border border-line/70 bg-surface p-5 shadow-clay-sm">
          <h2 className="text-sm font-medium text-ink">适用场景</h2>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{current.scene}</p>
        </section>

        <section className="rounded-card border border-line/70 bg-surface p-5 shadow-clay-sm">
          <h2 className="text-sm font-medium text-ink">落地建议</h2>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{current.tip}</p>
        </section>
      </div>

      <p className="px-1 text-xs text-ink-subtle">
        这些布局都是纯组件（<code className="font-mono">src/layouts/</code>
        ），没有引入图表、轮播库； 真实项目里把 <code className="font-mono">AppLayout</code>{' '}
        换成其中一套，或直接使用这些结构即可。
      </p>
    </div>
  )
}
