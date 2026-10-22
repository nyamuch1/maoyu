export type ComponentNavItem = {
  /** 路由里的短标识，同时用于查找 */
  key: string
  to: string
  index: string
  label: string
  title: string
  /** 页面副标题 */
  description: string
  /** 首页卡片上的一句话 */
  summary: string
  tags: string[]
}

export const componentsNav: ComponentNavItem[] = [
  {
    key: 'tokens',
    to: '/components/tokens',
    index: '01',
    label: '基础配色',
    title: '基础配色 / Design Tokens',
    description: '一套语义变量、明暗两套取值；组件只消费 token，换肤只改 theme.css。',
    summary: '背景 / 文字 / 品牌 / 状态色，外加圆角与阴影。',
    tags: ['语义 token', '明暗双套'],
  },
  {
    key: 'buttons',
    to: '/components/buttons',
    index: '02',
    label: '按钮',
    title: '按钮 Button',
    description: '6 种变体 × 3 种尺寸，统一胶囊圆角、渐变主色与 hover 抬升。',
    summary: '渐变主按钮、白面次要、描边、幽灵、危险态。',
    tags: ['6 变体', 'loading'],
  },
  {
    key: 'selection',
    to: '/components/selection',
    index: '03',
    label: '选择与状态',
    title: '选择与状态 Selection',
    description: '分段控件、开关、复选、单选、可选卡片、标签多选 —— 选中 = 品牌色 + 柔光。',
    summary: '所有「选中」交互的视觉规范与可复制实现。',
    tags: ['选中态', '多选'],
  },
  {
    key: 'form',
    to: '/components/form',
    index: '04',
    label: '表单',
    title: '表单 Form',
    description: '输入框、下拉、文本域、开关、复选与校验反馈，全部由同一套 token 驱动。',
    summary: '四种输入态 + 带校验的完整表单。',
    tags: ['校验', '状态'],
  },
  {
    key: 'table',
    to: '/components/table',
    index: '05',
    label: '表格',
    title: '表格 Table',
    description: '行选择、排序、状态徽标、用量进度与分页，选中行用品牌浅底强调。',
    summary: '可排序、可勾选、带进度列与分页的列表。',
    tags: ['排序', '分页'],
  },
  {
    key: 'feedback',
    to: '/components/feedback',
    index: '06',
    label: '反馈与展示',
    title: '反馈与展示 Feedback',
    description: '徽标、提示条、进度、骨架屏、空状态与轻提示。',
    summary: '把系统状态说清楚的一组组件。',
    tags: ['Toast', '空状态'],
  },
]

export function getNav(key: string): ComponentNavItem {
  const item = componentsNav.find((entry) => entry.key === key)
  if (!item) throw new Error(`Unknown navigation key: ${key}`)
  return item
}
