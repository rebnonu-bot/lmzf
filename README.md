# 邻檬智付 (lmzf)

邻檬智家旗下的专业支付服务平台。

**当前版本**: `v0.3.0`

---

## 更新日志

### v0.3.0 (2026-02-15)
- **架构全面升级**:
  - **配置管理**: 多环境配置文件，支持 development / production / test 环境自动切换。
  - **API 层重构**: 完整的请求封装，支持拦截器、错误处理、Token 自动刷新。
  - **状态管理**: 轻量级用户状态管理 (useUserStore)，支持微信小程序登录、登出、Token 刷新。
  - **数据缓存**: 内存缓存 + Storage 持久化双缓存策略，支持过期时间控制。
  - **埋点统计**: 完整的埋点系统，支持页面浏览、点击事件、错误监控、性能追踪。
- **分包优化**: 微信小程序分包加载，优化首屏加载速度。
- **代码规范**: ESLint + Prettier + Husky + lint-staged 完整代码规范工作流。
- **CI/CD**: GitHub Actions 自动化构建、检查、部署工作流。
- **组件封装**: EmptyState、ErrorBoundary、SafeArea 等通用组件。
- **暗黑模式**: 完整的浅色/深色模式适配。

### v0.2.0 (2026-02-13)
- **功能页面全面升级**:
  - **邀请海报**: 新增精美海报分享页面，支持微信分享和保存图片。
  - **门店列表**: 完整的门店搜索与分类筛选，支持距离排序。
  - **CPS 平台**: 电商平台聚合入口，支持小程序跳转和返利展示。
- **首页体验优化**:
  - **骨架屏加载**: 新增优雅的骨架屏加载动画，提升首屏感知速度。
  - **模块间距优化**: 增大模块间距至 48rpx，视觉更舒展。
- **项目清理**: 移除未使用的 camera 页面和资源文件，优化项目结构。

### v0.1.2 (2026-02-13)
- **首页 UI 重大升级**:
  - **毛玻璃视效**: 首页顶部核心区域引入 Glassmorphism（毛玻璃）设计。
  - **布局重构**: 优化积分展示与卡片装饰区域的层级关系。
  - **卡片细节雕琢**: 增强卡片文字对比度与投影效果。
- **交互体验增强**:
  - **数值滚动加载**: 为主积分及抵扣金额添加 `easeOutExpo` 平滑滚动增长动画。
  - **功能引导优化**: 新增"？"信息角标和"去抵扣"按钮。
- **多端适配**: 优化 H5 与小程序端的容器顶部间距。

[查看更多历史版本](./CHANGELOG.md)

---

## 项目简介

本项目是基于 [tdesign-uniapp-starter](https://github.com/novlan1/tdesign-uniapp-starter) 开发的 UniApp 项目，采用了 TDesign 企业级设计体系。

## 技术栈

- **框架**: Vue 3 + UniApp 3.0
- **UI 组件库**: [TDesign UniApp](https://tdesign.tencent.com/mobile-vue/)
- **构建工具**: Vite
- **语言**: TypeScript
- **代码规范**: ESLint + Prettier + Husky
- **CI/CD**: GitHub Actions

---

## 项目结构

```
src/
├── api/                    # API 请求
│   └── request.ts          # 请求封装（拦截器、错误处理）
├── components/             # 组件
│   ├── CustomTabBar.vue
│   ├── LocationHeader.vue
│   ├── EmptyState.vue      # 空状态组件 ✅
│   ├── ErrorBoundary.vue   # 错误边界组件 ✅
│   ├── PageSkeleton.vue
│   ├── PageLoader.vue
│   └── SafeArea.vue        # 安全区适配 ✅
├── composables/            # Vue3 组合式函数 ✅
│   ├── useStorage.ts
│   ├── useLoading.ts
│   ├── useLocation.ts
│   ├── useTracker.ts       # 埋点组合式函数 ✅
│   └── index.ts
├── config/                 # 配置 ✅
│   └── index.ts            # 多环境配置
├── constants/              # 常量 ✅
│   ├── enums.ts
│   └── index.ts
├── mock/                   # Mock 数据
├── package-invite/         # 邀请分包 ✅
│   └── pages/invite/
├── package-platform/       # 平台分包 ✅
│   └── pages/platforms/
├── package-store/          # 门店分包 ✅
│   └── pages/stores/
├── package-webview/        # WebView 分包 ✅
│   └── pages/webview/
├── pages/                  # 主包页面
│   ├── home/index.vue
│   ├── my/index.vue
│   ├── scan/index.vue
│   └── city-select/index.vue
├── static/                 # 静态资源
├── stores/                 # 状态管理 ✅
│   └── user.ts             # 用户状态管理
├── styles/                 # 样式
│   └── variable.less
├── types/                  # TypeScript 类型 ✅
│   ├── api.d.ts
│   ├── business.d.ts
│   ├── global.d.ts
│   └── index.ts
├── utils/                  # 工具函数
│   ├── cache.ts            # 缓存管理 ✅
│   ├── cityData.ts
│   ├── eventBus.ts
│   └── tracker.ts          # 埋点统计 ✅
├── App.vue
├── main.ts
├── manifest.json
├── pages.json              # 分包配置 ✅
└── uni.scss                # 主题变量 ✅
```

---

## 核心功能

### 1. 配置管理

```typescript
import config from '@/config'

// 获取 API 地址
config.api.baseUrl

// 判断环境
config.isDev  // true/false

// 获取存储键名
config.storage.tokenKey
```

### 2. 用户状态管理

```typescript
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 登录
await userStore.wxLogin()

// 获取用户信息
await userStore.fetchUserInfo()

// 登出
await userStore.logout()
```

### 3. 数据缓存

```typescript
import { CacheManager, CacheKeys, CacheExpires } from '@/utils/cache'

// 内存缓存
CacheManager.set('key', data, 60000)
const data = CacheManager.get('key')

// 持久化缓存
PersistentCache.set(CacheKeys.HOME_DATA, data, CacheExpires.HOME_DATA)

// 带缓存的请求
const data = await cachedRequest(
  CacheKeys.HOME_DATA,
  () => http.get('/home'),
  CacheExpires.HOME_DATA
)
```

### 4. 埋点统计

```typescript
import { usePageView, useClickTrack } from '@/composables'
import { trackClick } from '@/utils/tracker'

// 页面埋点
usePageView('home', { from: 'tab' })

// 点击埋点
const handleClick = () => {
  trackClick('button_click', { id: 'submit' })
}

// 或使用组合式函数
const trackBuy = useClickTrack('buy_click')
```

### 5. 分包加载

主包（Tab 页）+ 4 个分包：
- `package-invite` - 邀请海报
- `package-store` - 门店列表
- `package-platform` - CPS 平台
- `package-webview` - 内置浏览器

预加载配置：首页加载时预加载门店和平台分包。

---

## 设计系统

### 色彩规范
- **主色**: `#3B82F6` (科技蓝)
- **渐变**: `linear-gradient(135deg, #3B82F6, #60A5FA)`
- **背景**: `#F4F9FF` (极浅蓝灰)
- **卡片**: 毛玻璃效果 `backdrop-filter: blur(20rpx)`

### 暗黑模式
```scss
// 自动适配
.my-component {
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

### 圆角规范
- **大卡片**: 32rpx
- **小卡片**: 24rpx
- **按钮**: 28rpx - 40rpx

---

## 开发规范

### 代码检查
```bash
# 检查并修复代码
npm run lint

# 格式化代码
npm run format

# TypeScript 检查
npm run type-check
```

### Git 提交
```bash
# 提交前会自动运行 lint-staged
# 检查 .vue,.ts,.tsx 文件
```

---

## 快速开始

### 安装依赖
```bash
npm install --legacy-peer-deps
```

### 初始化 husky
```bash
npm run prepare
```

### 运行项目
```bash
# H5 运行
npm run dev:h5

# 微信小程序运行
npm run dev:mp-weixin
```

### 构建项目
```bash
# 构建 H5
npm run build:h5

# 构建微信小程序
npm run build:mp-weixin
```

### 部署 H5
```bash
# 自动构建并部署到 FTP
node deploy.js
```

---

## CI/CD

### GitHub Actions 工作流

- **CI Pipeline**: 代码检查、构建测试、部署
- **PR Check**: PR 时代码检查和构建测试

### 触发条件
- `push` 到 `main` 或 `develop` 分支
- `pull_request` 到 `main` 或 `develop` 分支

---

## 详细文档

- [开发规范](./MASTER.md)
- [更新日志](./CHANGELOG.md)
