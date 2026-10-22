# 月白ねむ · ASMR Creator

日系 ASMR 创作者个人主页模板：Vite 7 + React 19 + TypeScript 5.9 + Tailwind CSS 4 + React Router 7，沿用同一套 Soft UI（Claymorphism）语义化 token 与明暗双主题。

> 站点内容（主播「月白ねむ」、音声作品、周边、会员）均为虚构演示数据。

## 快速开始

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # 类型检查 + 生产构建
pnpm preview      # 预览构建产物
```

## 命令

| 命令                                | 说明                                                            |
| ----------------------------------- | --------------------------------------------------------------- |
| `pnpm dev`                          | 开发服务器（HMR，`strictPort` 占用 5173）                       |
| `pnpm build`                        | 类型检查 + 构建到 `dist/`                                       |
| `pnpm preview`                      | 本地预览构建产物                                                |
| `pnpm audit`                        | 冒烟审计：路由 / 标题 / 移动端溢出 / 控制台报错（需先启动 dev） |
| `pnpm lint` / `pnpm lint:fix`       | ESLint 检查 / 自动修复                                          |
| `pnpm format` / `pnpm format:check` | Prettier 写入 / 校验                                            |
| `pnpm typecheck`                    | 仅 TypeScript 检查                                              |

## 页面

| 路由           | 说明                                                                       |
| -------------- | -------------------------------------------------------------------------- |
| `/`            | 首页：Hero（头像 + 最新作品试听）、数据、最新情报、直播日程、会员方案、SNS |
| `/works`       | 音声作品：标签筛选 + 30 秒试听（全局单播放器）                             |
| `/news`        | 情报：分类筛选 + 置顶                                                      |
| `/goods`       | 周边：加入购物车演示（本地状态）                                           |
| `/about`       | 关于：简介、设备、FAQ（details）、会员方案、SNS                            |
| `/error/:code` | 403 / 404 / 500 / 502 / 503 状态页                                         |
| `*`            | 站点内 404                                                                 |

## 结构

```
src/
├─ app/            # 路由、Layout、主题上下文、试听状态上下文
├─ components/
│  ├─ creator/     # AudioCard / HeroPlayer / ScheduleList / MembershipTiers / SocialLinks…
│  └─ ui/          # Button / Badge / Switch / Segmented / Field / icons / StatusPage…
├─ data/creator.ts # 站点演示数据（作品、情报、日程、会员、周边、SNS）
├─ hooks/          # useTheme / usePageTitle
├─ pages/          # 首页 / 作品 / 情报 / 周边 / 关于 / 错误页
└─ styles/theme.css# 语义化设计 token（明暗两套）
```

## 设计要点

- **主题**：`html.dark` + 语义 token，三档（跟随系统 / 浅色 / 深色），切换动画可选淡入淡出 / 圆形扩散 / 无动画，时长可在页头设置。
- **字体**：正文 `Noto Sans JP`，展示标题 `Zen Maru Gothic`（圆体，日系创作者站点常用）。
- **配色**：紫罗兰主色 + 新增樱粉 `--blush` 点缀色，明暗各一套值。
- **试听交互**：`AudioPlayerProvider` 全局单实例，同一时间只播放一条音声；波形条随进度染色。
- **响应式**：桌面顶栏导航、移动端胶囊导航；各页面单列 / 双列切换。
- **错误页**：`/error/:code` + `errorElement` 兜底 + `public/` 下的网关静态错误页。

## 部署

BrowserRouter 需要把未知路径回落到 `index.html`：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}

error_page 404 /404.html;
error_page 500 /500.html;
error_page 502 /502.html;
error_page 503 /503.html;
```
