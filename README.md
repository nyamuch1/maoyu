# maoyusu · Soft UI 组件库

**Vite 7 + React 19 + TypeScript 5.9 + Tailwind CSS 4 + React Router 7** 的前端脚手架。
视觉基调为「柔和糖果 / Soft UI（Claymorphism）」，内置**明暗双主题配色 token**、可复用组件、
多页路由结构，以及 ESLint + Prettier 代码规范。

## 技术栈

| 依赖                                        | 说明                                                |
| ------------------------------------------- | --------------------------------------------------- |
| `vite` / `@vitejs/plugin-react`             | 开发服务器、构建、HMR                               |
| `react` / `react-dom`                       | UI 框架                                             |
| `react-router-dom`                          | 多页路由（`createBrowserRouter` + 嵌套布局）        |
| `typescript`                                | 类型检查（`tsc -b` 项目引用，strict）               |
| `tailwindcss` + `@tailwindcss/vite`         | 原子化 CSS（v4，无需 tailwind.config.js）           |
| `eslint` + `typescript-eslint` + react 插件 | 代码检查（flat config）                             |
| `prettier` + `prettier-plugin-tailwindcss`  | 格式化，自动排序 Tailwind 类名                      |
| `playwright-core`                           | 仅用于本地截图验证（复用系统 Chrome，不下载浏览器） |

## 快速开始

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

| 命令                                | 作用                          |
| ----------------------------------- | ----------------------------- |
| `pnpm dev`                          | 开发服务器（HMR）             |
| `pnpm build`                        | 类型检查 + 生产构建到 `dist/` |
| `pnpm preview`                      | 本地预览构建产物              |
| `pnpm typecheck`                    | 仅 TypeScript 检查            |
| `pnpm lint` / `pnpm lint:fix`       | ESLint 检查 / 自动修复        |
| `pnpm format` / `pnpm format:check` | Prettier 写入 / 校验          |

> Node.js 要求：Vite 7 需要 **Node.js 20.19+ 或 22.12+**。

## 目录结构

```
.
├─ index.html                # 入口；首屏前内联脚本应用主题，避免闪白
├─ vite.config.ts            # react + tailwindcss 插件；忽略原子写入的临时文件
├─ eslint.config.js          # ESLint flat config
├─ .prettierrc.json          # Prettier 配置（含 Tailwind 类名排序插件）
├─ pnpm-workspace.yaml       # pnpm 11：允许 esbuild 执行安装脚本
├─ scripts/                  # 截图与拼图脚本
└─ src/
   ├─ main.tsx               # RouterProvider 入口
   ├─ app/
   │  ├─ router.tsx          # 路由表
   │  ├─ navigation.ts       # 侧边目录 / 首页卡片共用的导航元数据
   │  ├─ AppLayout.tsx       # 全站外壳：吸顶头部（导航 + 主题切换）+ 页脚
   │  ├─ ComponentsLayout.tsx# 组件库二级布局：左侧目录 + 移动端胶囊导航
   │  ├─ ThemeProvider.tsx   # 全局主题状态（Context Provider）
   │  └─ theme-context.ts    # useTheme()：读主题 / 动画设置
   ├─ pages/                 # 路由页面
   │  ├─ HomePage.tsx        # 首页
   │  ├─ LayoutsPage.tsx     # 常见布局示例（后台 / 文档 / 登录）
   │  ├─ TokensPage.tsx      # 01 基础配色
   │  ├─ ButtonsPage.tsx     # 02 按钮
   │  ├─ SelectionPage.tsx   # 03 选择与状态
   │  ├─ FormPage.tsx        # 04 表单
   │  ├─ TablePage.tsx       # 05 表格
   │  ├─ FeedbackPage.tsx    # 06 反馈与展示
   │  └─ NotFoundPage.tsx    # 404
   ├─ layouts/               # 14 套布局示例（后台 / 内容社区 / 营销电商）
   ├─ demo/                  # 真实路由示例站点（admin / community / shop / blog / docs）
   ├─ sections/              # 各页面的内容组件（页面 = PageShell + 内容）
   ├─ components/
   │  ├─ ui/                 # Button / Field / Switch / Segmented / …
   │  └─ layout/             # PageShell / Demo
   ├─ hooks/
   │  └─ useTheme.ts         # 主题状态机：三档模式 + 三种切换动画
   ├─ styles/theme.css       # ★ 基础配色：明 / 暗两套语义 token + 圆角 / 阴影
   └─ index.css              # @import tailwindcss + 全局基础样式
```

## 路由结构

| 路径                    | 页面                    | 说明                                     |
| ----------------------- | ----------------------- | ---------------------------------------- |
| `/`                     | HomePage                | 首页：介绍、组件入口卡片、主题与令牌速览 |
| `/components`           | → `/components/buttons` | 组件库入口（自动重定向）                 |
| `/components/tokens`    | TokensPage              | 基础配色 / Design Tokens                 |
| `/components/buttons`   | ButtonsPage             | 按钮                                     |
| `/components/selection` | SelectionPage           | 选择与状态                               |
| `/components/form`      | FormPage                | 表单                                     |
| `/components/table`     | TablePage               | 表格                                     |
| `/components/feedback`  | FeedbackPage            | 反馈与展示                               |
| `/layouts`              | LayoutsPage             | 常见布局：后台管理 / 文档三栏 / 登录居中 |
| `*`                     | NotFoundPage            | 404                                      |

`createBrowserRouter` + 嵌套路由：`AppLayout`（头部 / 页脚）→ `ComponentsLayout`（目录 + `<Outlet />`）。
新增一个组件页只需三步：

1. 在 `src/app/navigation.ts` 加一条元数据（同时出现在侧边目录与首页卡片）；
2. 在 `src/pages/` 新建页面，套 `PageShell`；
3. 在 `src/app/router.tsx` 注册路由。

### 示例站点（真实路由）

画廊里的每套布局都有对应可交互、可分享 URL 的页面，按站点拆成嵌套路由：

| 站点               | 路由                                                     | 说明                                           |
| ------------------ | -------------------------------------------------------- | ---------------------------------------------- |
| 后台               | `/admin` → `/admin/settings`、`/admin/messages`          | 侧栏 / 顶栏是真实 Shell，`<Outlet />` 切换页面 |
| 论坛               | `/community` → `/community/t/:threadId`                  | 帖子列表点进详情，返回链路完整                 |
| 商城               | `/shop` → `/shop/products/:productId` → `/shop/checkout` | 详情「立即购买」进结算，提交后展示成功态       |
| 博客               | `/blog` → `/blog/:slug`                                  | 文章列表 → 文章详情                            |
| 文档               | `/docs` → `/docs/:section`                               | 左目录即路由，5 个章节                         |
| 营销 / 价格 / 登录 | `/landing`、`/pricing`、`/login`                         | 独立单页，右下角有站点间跳转                   |

- 示例站点代码在 `src/demo/`（每个站点一个文件：Shell + 页面组件）。
- 路由级 `React.lazy` 拆分：每个示例站点单独 chunk，组件库首屏不加载它们。
- 画廊页的「打开真实页面」按钮会跳到对应路由。

> 部署提示：BrowserRouter 需要服务端把未知路径回落到 `index.html`
> （nginx：`try_files $uri $uri/ /index.html;`；Vercel / Netlify 默认支持）。
> `vite dev` 与 `vite preview` 已内置 SPA 回落。

## 常见布局

`/layouts` 页面用「模拟浏览器窗口」预览 14 套常用骨架，先选分组（后台 / 工具、内容 / 社区、营销 / 电商），再选具体布局：

| 分组        | 布局     | 结构                                              | 适用场景                        |
| ----------- | -------- | ------------------------------------------------- | ------------------------------- |
| 后台 / 工具 | 后台管理 | 固定侧栏 + 顶栏 + 滚动内容区（KPI → 图表 → 列表） | B 端后台、SaaS 控制台、数据看板 |
| 后台 / 工具 | 文档三栏 | 左章节树 + 中正文 + 右本页目录                    | 产品文档、组件库、帮助中心      |
| 后台 / 工具 | 登录居中 | 整屏品牌背景 + 320–400px 居中卡片                 | 登录 / 注册 / 找回密码          |
| 后台 / 工具 | 用户设置 | 左设置菜单 + 右分区表单 + 危险操作区              | 个人中心、账号设置、工作区配置  |
| 后台 / 工具 | 消息中心 | 左会话列表 + 右聊天窗口 + 底部固定输入框          | 私信 / 客服 / 团队协作消息      |
| 内容 / 社区 | 论坛首页 | 版块卡片 + 最新帖列表 + 右侧热帖 / 活跃用户       | BBS、社区、问答站               |
| 内容 / 社区 | 帖子详情 | 主楼 + 回复楼层 + 右侧作者卡 / 相似主题           | 论坛帖子、问答详情              |
| 内容 / 社区 | 个人博客 | 个人信息头 + 文章列表 + 标签 / 归档 / 订阅        | 个人博客、技术专栏、独立作者站  |
| 内容 / 社区 | 资讯详情 | 居中正文 + 作者卡 + 相关阅读                      | 资讯 / 周刊 / 公众号文章        |
| 营销 / 电商 | 营销首页 | 顶栏 + Hero + 品牌墙 + 特性 + CTA + 页脚          | 官网首页、落地页、活动专题      |
| 营销 / 电商 | 商品列表 | 筛选侧栏 + 商品卡片网格 + 排序分页                | 电商列表、模板市场、搜索结果    |
| 营销 / 电商 | 商品详情 | 图集 + 购买信息 + 详情 Tab                        | 商品 / 课程 / 服务详情          |
| 营销 / 电商 | 价格页   | 三档定价 + 功能对比 + FAQ                         | SaaS 定价、会员体系、套餐升级   |
| 营销 / 电商 | 结算页   | 左信息表单 + 右固定订单摘要 + 步骤条              | 下单结算、预约确认、订单支付    |

示例组件在 `src/layouts/`，全部只用现有组件与 token，没有引入图表、轮播、表格库：

```
src/layouts/
├─ AdminLayoutDemo.tsx     # 后台管理
├─ DocsLayoutDemo.tsx      # 文档三栏
├─ AuthLayoutDemo.tsx      # 登录居中
├─ SettingsLayoutDemo.tsx  # 用户设置
├─ ChatLayoutDemo.tsx      # 消息中心
├─ BbsLayoutDemo.tsx       # 论坛首页
├─ PostLayoutDemo.tsx      # 帖子详情
├─ BlogLayoutDemo.tsx      # 个人博客
├─ ArticleLayoutDemo.tsx   # 资讯详情
├─ LandingLayoutDemo.tsx   # 营销首页
├─ ShopLayoutDemo.tsx      # 商品列表
├─ DetailLayoutDemo.tsx    # 商品详情
├─ PricingLayoutDemo.tsx   # 价格页
└─ CheckoutLayoutDemo.tsx  # 结算页
```

预览区固定 900×620 以呈现桌面比例，窄屏下横向滚动；每个布局下方有结构要点 / 适用场景 / 落地建议。

> 这些只是静态预览。顶部「打开真实页面」会跳到 `src/demo/` 里对应的可交互路由页面（含 `:productId` / `:slug` / `:threadId` 等参数与页面间跳转）。

## 主题系统：跟随系统 / 浅色 / 深色

- `useTheme()` 维护 `mode: 'system' | 'light' | 'dark'` 与解析后的 `resolved: 'light' | 'dark'`。
- 生效方式：给 `<html>` 加 / 移除 `class="dark"`，并同步 `color-scheme`。
- 「跟随系统」时监听 `prefers-color-scheme` 变化，系统切换深色实时生效。
- 选择写入 `localStorage('maoyusu-theme')`；`index.html` 内联脚本在首屏前应用，刷新不闪白。
- 状态由 `ThemeProvider` 统一提供：任何页面调 `useTheme()` 拿到的都是同一份状态。
- 切换入口在头部右侧；窄屏只显示图标，`aria-label` 与 `sr-only` 文案保留可访问性。

```tsx
const { mode, resolved, transition, setMode, setTransition } = useTheme()
```

### 切换动画与时长

原先只有 `body` 有颜色过渡、卡片和描边是瞬切；排查后还发现 Chrome 对「颜色来自 CSS 变量」
的元素**不会正常启动 transition**（动画对象一直 pending / 每帧重建），所以字体颜色看起来格外迟钝。
现在改成「快照级过渡 + 切换瞬间禁用常驻过渡」：

| 模式           | 实现                              | 说明                                                             |
| -------------- | --------------------------------- | ---------------------------------------------------------------- |
| `fade`（默认） | View Transitions 快照淡入         | 整页（文字、背景、阴影、图标）同步过渡，不会「背景动了文字没动」 |
| `circle`       | View Transitions + `clip-path`    | 从切换按钮中心圆形扩散                                           |
| `none`         | `.theme-instant` 临时禁用所有过渡 | 连元素常驻的 `transition-colors` 一起关掉，避免导航 / 链接慢半拍 |

**时长统一在 `src/config/motion.ts` 配置**，改数字即可：

```ts
export const SPEED_DURATION = {
  fast: { fade: 220, circle: 520, fallback: 200 },
  normal: { fade: 360, circle: 900, fallback: 300 }, // 默认：圆形扩散 0.9s
  slow: { fade: 560, circle: 1500, fallback: 460 },
}
export const DEFAULT_SPEED = 'normal'
```

- 首页「主题与切换动画」卡片里有 **快 / 标准 / 慢** 三档，选择存
  `localStorage('maoyusu-theme-speed')`，圆扩与淡入淡出会一起变化。
- 想微调某一档，只改 `SPEED_DURATION` 里对应的毫秒数；`fallback` 是给不支持
  View Transitions 的浏览器用的降级过渡时长。
- 圆形扩散的缓动在 `CIRCLE_EASING`，默认 `cubic-bezier(0.22, 1, 0.36, 1)`（先快后慢）。

其他规则：

- 动画期间 DOM 里的颜色**立刻**切到目标值，只有快照在过渡，不会「字体滞后」。
- `.theme-instant` 只存在约两帧（两次 `requestAnimationFrame` 后移除），不影响日常 hover / 点击。
- `prefers-reduced-motion: reduce` 时直接切换，无动画。

## 配色与设计令牌

所有颜色定义在 `src/styles/theme.css`：`:root` 是浅色，`.dark` 覆盖同名变量。
组件只写**语义类名**（`bg-surface`、`text-ink-muted`、`border-line`…），不出现任何具体色值。

| 分组 | token                                                      | 工具类                                                  | 用途                                        |
| ---- | ---------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------- |
| 背景 | `--canvas`                                                 | `bg-canvas`                                             | 页面底色                                    |
|      | `--surface` / `-2` / `-3`                                  | `bg-surface` …                                          | 卡片、面板、输入框、凹槽（层级递增）        |
|      | `--raised`                                                 | `bg-raised`                                             | 选中胶囊、浮起元素（暗色下比 surface 更亮） |
| 描边 | `--line` / `--line-strong`                                 | `border-line`                                           | 分割线、控件描边                            |
| 文字 | `--ink` / `-muted` / `-subtle`                             | `text-ink` …                                            | 正文、次要、占位                            |
| 品牌 | `--primary` / `-2` / `-hover` / `-soft` / `--on-primary`   | `bg-primary` …                                          | 渐变主色 = `primary → primary-2`            |
| 状态 | `--success` / `warning` / `danger` / `info` + 各自 `-soft` | `text-success` …                                        | 实色用于图标 / 圆点，`-soft` 用于底色       |
| 圆角 | `--r-field` / `--r-card` / `--r-pill`                      | `rounded-field` / `-card` / `-pill`                     | 输入框 / 卡片 / 胶囊                        |
| 阴影 | `--elev-0/1/2/inset`                                       | `shadow-clay-sm` / `-clay` / `-clay-lg` / `-clay-inset` | 紫调柔光 + 顶部高光                         |

换品牌色只改 `theme.css`：

```css
:root {
  --primary: #0d9488;
  --primary-2: #0ea5e9;
  --primary-hover: #0f766e;
  --primary-soft: #ccfbf1;
}
```

### 新增组件时的约定

1. 颜色 / 圆角 / 阴影一律用 token 工具类，禁止写死 `#fff`、`bg-slate-100`。
2. 容器 `rounded-card`，控件 `rounded-field`，可点元素 `rounded-pill`。
3. 卡片 `shadow-clay`，小元件 `shadow-clay-sm`，凹槽 / 输入框 `shadow-clay-inset`。
4. 状态色用 `success / warning / danger / info` 的 `-soft` 底 + 实色字。

## 组件清单

| 分类 | 组件（`src/components/ui`）                     | 说明                                                          |
| ---- | ----------------------------------------------- | ------------------------------------------------------------- |
| 按钮 | `Button` + `buttonClass()`                      | 6 变体 × 3 尺寸；`buttonClass()` 让 `<Link>` 也能复用按钮样式 |
| 表单 | `Field` / `Input` / `Textarea` / `Select`       | 标签、提示、错误态、前置图标、禁用态                          |
| 选择 | `Switch`、`Checkbox`、`RadioGroup`、`Segmented` | 开关、复选、单选卡、分段控件；`Segmented` 支持 `iconOnly`     |
| 展示 | `Badge`、`Progress`、`Alert`                    | 6 种色调徽标、进度条、可关闭提示条                            |
| 主题 | `ThemeToggle`、`ThemeSettings`                  | 头部三档切换；首页卡片可选动画类型与「快 / 标准 / 慢」时长    |
| 布局 | `PageShell`、`Demo`                             | 页面外壳与子示例小标题                                        |

可选卡片（单选）与标签多选 Chips 是页内示例，可直接抄 `src/sections/SelectionSection.tsx`。

## 交互示例

- **表单**：提交校验姓名 / 邮箱 / 协议，错误红框 + 文案，成功给可关闭提示。
- **表格**：勾选行（含当前页全选）、表头排序、状态徽标、用量进度、分页（4 条 / 页）。
- **反馈**：提示条可关闭、Toast 2.8s 自动消失、骨架屏、空状态。
- **路由**：侧边目录 `NavLink` 高亮当前页；首页卡片与 404 页都能跳转。

## 代码质量：ESLint + Prettier

- `eslint.config.js`（flat config）：`@eslint/js` + `typescript-eslint` + `eslint-plugin-react-hooks`
  - `eslint-plugin-react-refresh`，末尾接 `eslint-config-prettier` 关掉与格式化冲突的规则。
- `.prettierrc.json`：无分号、单引号、行宽 100、尾逗号 all；
  `prettier-plugin-tailwindcss` 会自动把类名按 Tailwind 顺序排序。
- 建议在 VS Code 打开保存格式化：`"editor.defaultFormatter": "esbenp.prettier-vscode"`、
  `"editor.formatOnSave": true`、`"editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }`。

## 截图（可选）

```bash
pnpm dev                                   # 另开终端，保持 5173
node scripts/shot.mjs http://localhost:5173
python scripts/contact_sheet.py            # 拼成 shots/preview-light.png / preview-dark.png
```

脚本会顺带检查：所有路由是否可达、`/components` 是否重定向、三档主题是否按预期落 class、
控制台是否有报错，结果输出到 `shots/routes.json`、`shots/theme-checks.json`。

动画行为可以单独验证（输出每种模式下的 class / 过渡元素数 / View Transition 数量）：

```bash
node scripts/check-theme.mjs http://localhost:5173
```

## 常见问题

- **`ERR_PNPM_IGNORED_BUILDS: esbuild`**：pnpm 10+ 默认禁止依赖跑安装脚本。
  已在 `pnpm-workspace.yaml` 用 `allowBuilds: { esbuild: true }` 放行；仍报错可
  `pnpm approve-builds` 或改用 `npm install`。
- **Windows 上 `pnpm dev` 偶发 `EBUSY: resource busy or locked, watch …tmp`**：
  编辑器工具的原子写入会产生临时目录。`vite.config.ts` 已忽略 `**/*.tmp` 与
  `**/.*.tmpdir/**`，若仍遇到重启 dev server。
- **刷新子路由 404**：生产环境未配置 SPA 回落。见上文「路由结构」的部署提示。
- **Tailwind 类不生效**：确认 `vite.config.ts` 有 `tailwindcss()`、`src/index.css`
  第一行是 `@import "tailwindcss";`，且用到的类是完整字面量（不要拼接类名）。
- **圆形扩散在 Firefox / 旧版 Safari 不生效**：这些浏览器没有 View Transitions API，
  代码会自动回退到 `fade`，功能不受影响。
