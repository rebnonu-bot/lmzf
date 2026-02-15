# 更新日志 (Changelog)

## [1.1.1] - 2026-02-15

### 架构优化
- **配置管理**：完善多环境配置 (`src/config/`)，支持 development/production/test 自动切换。
- **状态管理**：引入 Pinia 进行用户状态管理 (`src/stores/user.ts`)，支持 Token 自动刷新和持久化。
- **API 封装**：重构请求层 (`src/api/request.ts`)，统一拦截器处理与错误码管理。

### 分包重构
- **小程序分包**：
  - 将邀请海报、门店列表、CPS平台、WebView 拆分为独立分包。
  - 优化 `pages.json` 配置，实现按需加载与预加载策略。
  - 减小主包体积，提升首屏加载速度。

### 工程化
- **代码规范**：集成 ESLint + Prettier + Husky 工作流，确保代码质量。
- **CI/CD**：新增 GitHub Actions 配置 (`.github/workflows/`)，实现自动化构建与检查。
- **类型定义**：完善 TypeScript 类型声明 (`src/types/`)，涵盖 API、业务实体与全局定义。

### 组件与设计
- **基础组件**：新增 EmptyState (空状态)、ErrorBoundary (错误边界)、SafeArea (安全区) 组件。
- **设计系统**：引入暗黑模式支持 (`src/app.dark.json`) 与 SCSS 变量体系 (`src/uni.scss`)。
- **工具库**：封装双缓存机制 (`src/utils/cache.ts`) 与 埋点统计系统 (`src/utils/tracker.ts`)。

---

## [0.3.0] - 2026-02-15

### 架构全面升级
- **配置管理重构** (`src/config/`)
  - 多环境配置文件，支持 development / production / test 自动切换
  - 集中管理 API 地址、超时时间、存储键名等配置
  
- **API 层重构** (`src/api/request.ts`)
  - 完整的请求封装，支持拦截器机制
  - 自动 Token 注入和刷新
  - 统一的错误处理（401/403/404/500 等状态码）
  - 便捷方法：http.get/post/put/delete
  
- **状态管理** (`src/stores/user.ts`)
  - 轻量级用户状态管理 (useUserStore)
  - 支持微信小程序一键登录
  - Token 自动刷新和过期检测
  - 登录态持久化存储
  
- **数据缓存** (`src/utils/cache.ts`)
  - 双缓存架构：内存缓存 + Storage 持久化
  - 支持过期时间控制
  - 带缓存的请求封装 cachedRequest
  
- **埋点统计** (`src/utils/tracker.ts`)
  - 完整的埋点系统
  - 支持页面浏览、点击事件、错误监控、性能追踪
  - 队列批量上报机制

### 分包优化
- **小程序分包加载** (`src/pages.json`)
  - 主包：首页、我的、扫码、城市选择（Tab页）
  - 分包：邀请海报、门店列表、CPS平台、WebView
  - 预加载配置：首页加载时预加载门店和平台分包
  
- **分包目录迁移**
  - `package-invite/pages/invite/`
  - `package-store/pages/stores/`
  - `package-platform/pages/platforms/`
  - `package-webview/pages/webview/`

### 代码规范
- **ESLint + Prettier** (`.eslintrc.cjs`, `.prettierrc`)
  - Vue 3 推荐规则
  - TypeScript 严格检查
  - 自动格式化配置
  
- **Git 工作流** (`.husky/`)
  - pre-commit 钩子：提交前自动运行 lint-staged
  - commit-msg 钩子：提交信息检查（预留）
  - lint-staged：只检查暂存区文件

### CI/CD 自动化
- **GitHub Actions** (`.github/workflows/`)
  - `ci.yml`: 主 CI/CD 流程（检查→构建→部署）
  - `pr-check.yml`: PR 检查工作流
  - 自动部署 H5 到 GitHub Pages
  - 微信小程序自动构建

### 组件封装
- **EmptyState** (`src/components/EmptyState.vue`)
  - 空状态展示组件
  - 支持多种尺寸和自定义操作按钮
  
- **ErrorBoundary** (`src/components/ErrorBoundary.vue`)
  - 错误边界组件
  - 捕获子组件渲染错误
  - 开发环境显示详细错误堆栈
  
- **SafeArea** (`src/components/SafeArea.vue`)
  - 安全区适配组件
  - 支持顶部/底部/双边适配
  - 自动处理刘海屏和底部横条

### 设计系统
- **暗黑模式支持** (`src/uni.scss`, `src/app.dark.json`)
  - CSS 变量定义（浅色/深色自动切换）
  - 完整的色彩体系和灰度阶梯
  - 多平台暗黑模式配置
  
- **SCSS 变量系统**
  - 主色调、辅助色、灰度定义
  - 圆角、间距、字号规范
  - 阴影、动画效果预设
  - 混入函数（flex-center、text-ellipsis 等）

### 类型定义
- **完整 TS 类型** (`src/types/`)
  - `api.d.ts`: API 请求/响应类型
  - `business.d.ts`: 业务实体类型
  - `global.d.ts`: 全局类型声明

### 开发工具
- **脚手架** (`scripts/`，已迁移至外部)
  - 快速创建项目、页面、组件、API、组合式函数
  - 完整的项目模板和代码生成
  
- **开发规范文档**
  - `DEVELOPMENT_GUIDE.md`: 完整开发规范指南
  - `UI_COLOR_GUIDE.md`: UI 色彩速查表

### 目录结构优化
```
src/
├── api/                    # API 层（重写）
├── components/             # 新增通用组件
├── composables/            # 新增组合式函数
├── config/                 # 新增配置目录
├── constants/              # 新增常量目录
├── package-*/              # 分包目录
├── stores/                 # 新增状态管理
├── types/                  # 新增类型定义
└── utils/                  # 新增缓存、埋点
```

---

## [1.1.0] - 2026-02-13

### 新增
- **全量业务同步**：以本地稳定版本为主，强制同步全量业务模块至远程仓库。
- **UI 深度优化**：
  - 首页登录/已登录状态的条件渲染。
  - 动态等级勋章系统（金/银/铜牌自动切换）。
  - 成就标签系统（加入天数、邀请人数）。
  - 登录引导模块采用毛玻璃特效与柠檬主题配色。
- **字体规范**：全量数字统一应用 `DIN Alternate` 字体。
- **业务页面**：集成邀请海报、门店列表、CPS 平台、WebView 容器等。
- **基础组件**：新增骨架屏加载 (`PageSkeleton`) 与 页面加载器 (`PageLoader`)。

### 优化
- **布局适配**：解决 H5 与小程序端的间距差异。
- **DOM 层级**：移除冗余的 `uni-view` 容器，优化渲染性能。
- **部署流程**：集成 FTP 自动化部署脚本 `deploy.js`。
- **资源管理**：对旧版资源进行分类备份 (`backup/`)，保持目录整洁。

---

## [0.2.0] - 2026-02-13

### 新增
- **邀请海报页面** (`pages/invite/poster.vue`)
  - 精美的邀请海报展示，支持分享功能
  - 毛玻璃卡片设计，金色奖励高亮
  - 微信分享和保存海报按钮

- **门店列表页面** (`pages/stores/index.vue`)
  - 完整的门店搜索功能
  - 水平滚动分类筛选（餐饮、零售、服务等）
  - 门店卡片展示（Logo、标签、距离、地址）

- **CPS 平台页面** (`pages/platforms/index.vue`)
  - 电商平台网格展示（4列布局）
  - 支持微信小程序跳转导航
  - WebView 兜底方案支持
  - 返利比例徽章展示

- **骨架屏加载组件** (`components/PageSkeleton.vue`)
  - 首页加载状态骨架屏
  - 渐变闪烁动画效果
  - 与整体设计系统保持一致

### 优化
- **首页模块间距**: 从 32rpx 增大到 48rpx，视觉呼吸感更佳
- **底部安全间距**: 从 40rpx 增大到 60rpx
- **滚动体验**: 修复门店和平台页面的滚动问题
- **文字截断**: 修复门店卡片地址文字溢出问题

### 清理
- 移除未使用的 camera 页面及相关组件
- 清理冗余的 SVG 图标和 mock 图片
- 备份旧文件至 `backup/` 目录

## [0.1.6] - 2026-02-13

### 变更
- 同步最新的业务组件和页面代码（CustomTabBar, LocationHeader, Home, My, Scan 等）
- 完善页面配置

## [0.1.5] - 2026-02-13

### 变更
- 完成 H5 编译文件向 FTP 服务器的自动化部署
- 部署路径：`/lmzf/`

## [0.1.4] - 2026-02-13

### 变更
- 优化 FTP 部署脚本，支持自动创建 `lmzf` 远程目录

## [0.1.3] - 2026-02-13

### 变更
- 更新项目版本至 0.1.3
- 增加部署方案说明

## [0.1.2] - 2026-02-13

### 新增
- 同步远程仓库代码，集成大量业务页面
- 完善 H5 预览环境配置

## [0.1.1] - 2026-02-13

### 新增
- 初始化项目结构
- 添加 uni-app 基础配置
- 集成 TDesign UniApp 组件库
- 实现基础页面：首页、登录、我的、城市选择、扫码

### 依赖
- @dcloudio/uni-app: 3.0.0-4080420251103001
- @tdesign/uniapp: UI 组件库
- vue: 3.x

---

## 版本说明

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。
