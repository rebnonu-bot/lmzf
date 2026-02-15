# 邻檬智付 (lmzf) - AI Agent 开发指南

> 本文档面向 AI 编程助手，包含项目架构、开发规范和技术细节。请在进行代码修改前仔细阅读。

## 项目概览

**邻檬智付**是邻檬智家旗下的专业支付服务平台，主打"物业费减免"概念。用户通过线上线下消费积累数字积分，积分可用于抵扣物业费用。

### 核心功能
- 数字积分展示与抵扣计算
- 线下门店消费返积分
- 线上CPS电商平台返利
- 邀请返利机制
- 多城市门店搜索

### 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | Vue 3 + Composition API |
| 跨平台方案 | UniApp 3.0 |
| 构建工具 | Vite 5.2.8 |
| 语言 | TypeScript 4.9 |
| UI 组件库 | TDesign UniApp |
| 样式预处理器 | Less |
| 路由 | UniApp 内置路由 |

### 支持平台
- H5 (主要部署目标)
- 微信小程序 (mp-weixin)
- 支付宝小程序 (mp-alipay)
- 其他小程序平台（百度、抖音、QQ等）

---

## 项目结构

```
lmzf/
├── src/
│   ├── pages/                    # 页面目录
│   │   ├── home/index.vue        # 首页 - 积分展示、功能入口
│   │   ├── my/index.vue          # 我的 - 个人中心
│   │   ├── scan/index.vue        # 扫码 - 沉浸式扫一扫
│   │   ├── city-select/index.vue # 城市选择
│   │   ├── invite/poster.vue     # 邀请海报
│   │   ├── stores/index.vue      # 门店列表
│   │   ├── platforms/index.vue   # CPS 平台
│   │   └── webview/index.vue     # 内置浏览器
│   ├── components/               # 全局组件
│   │   ├── CustomTabBar.vue      # 自定义底部导航
│   │   ├── LocationHeader.vue    # 顶部定位组件
│   │   ├── PageSkeleton.vue      # 骨架屏加载
│   │   └── PageLoader.vue        # 全屏加载动画
│   ├── api/
│   │   └── request.ts            # 请求封装
│   ├── utils/
│   │   ├── cityData.ts           # 城市数据
│   │   └── eventBus.ts           # 事件总线
│   ├── mock/
│   │   └── index.ts              # Mock 数据拦截
│   ├── styles/
│   │   ├── variable.less         # 全局样式变量
│   │   └── uni.scss              # UniApp 全局样式
│   ├── static/                   # 静态资源
│   ├── main.ts                   # 应用入口
│   ├── App.vue                   # 根组件
│   ├── pages.json                # 页面配置
│   ├── manifest.json             # 应用配置（含各平台配置）
│   └── config.ts                 # 全局配置
├── index.html                    # H5 入口
├── vite.config.ts                # Vite 配置
├── tsconfig.json                 # TypeScript 配置
├── package.json                  # 依赖管理
├── deploy.js                     # FTP 部署脚本
├── MASTER.md                     # UI 设计规范
└── CHANGELOG.md                  # 更新日志
```

---

## 开发命令

```bash
# 安装依赖（必须使用 --legacy-peer-deps）
npm install --legacy-peer-deps

# 开发服务器
npm run dev           # 默认启动 H5 开发服务器
npm run dev:h5        # H5 开发
npm run dev:mp-weixin # 微信小程序开发

# 构建
npm run build:h5        # 构建 H5 生产包 → dist/build/h5/
npm run build:mp-weixin # 构建微信小程序 → dist/build/mp-weixin/

# 部署
npm run deploy          # 执行 deploy.js 部署到 FTP

# 类型检查
npm run type-check      # 运行 vue-tsc 检查
```

---

## 设计系统

项目采用 **Minimalist Tech Blue（极简科技蓝）** 设计语言。

### 色彩规范

```
主色:           #3B82F6 (科技蓝)
背景色:         #F4F9FF (极浅蓝灰)
标题色:         #334155 (深灰蓝)
描述色:         #64748B (中灰蓝)
边框/分割线:    rgba(255, 255, 255, 0.6)
毛玻璃背景:     rgba(255, 255, 255, 0.75)
```

### 渐变色

```css
/* 顶部背景 */
linear-gradient(180deg, #3B82F6 0%, #60A5FA 70%, #F4F9FF 100%)

/* 毛玻璃卡片 */
background: rgba(255, 255, 255, 0.75);
backdrop-filter: blur(24rpx);
```

### 尺寸规范

```
页面内边距:     32rpx
模块间距:       48rpx
大卡片圆角:     32rpx
小卡片圆角:     24rpx
按钮圆角:       28rpx - 40rpx
悬浮阴影:       0 16rpx 40rpx rgba(59, 130, 246, 0.12)
```

### 字体规范

```
一级标题:       40rpx, Bold
二级标题:       32rpx, Bold
正文/标签:      26rpx, Medium
辅助说明:       24rpx, Regular
数字字体:       'DIN Alternate'
```

完整设计规范请参考 [MASTER.md](./MASTER.md)。

---

## 代码风格规范

### Vue 文件结构

```vue
<template>
  <!-- 页面容器统一使用 scroll-view -->
  <scroll-view class="page-container" scroll-y>
    <!-- 内容区域 -->
  </scroll-view>
</template>

<script setup lang="ts">
// 1. 导入外部依赖
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';

// 2. 导入组件
import CustomTabBar from '@/components/CustomTabBar.vue';

// 3. 导入工具/配置
import config from '@/config';

// 4. 类型定义（如有）
interface UserInfo {
  nickname: string;
  level: 'copper' | 'silver' | 'gold';
}

// 5. 响应式数据
const loading = ref(true);
const userInfo = ref<UserInfo>({ ... });

// 6. 计算属性
const currentLevel = computed(() => { ... });

// 7. 方法定义
const handleAction = () => { ... };

// 8. 生命周期
onShow(() => { ... });
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  height: 100vh;
  background-color: #F4F9FF;
}
</style>
```

### 命名规范

- **组件名**: PascalCase（如 `CustomTabBar.vue`）
- **页面目录**: 小写 + 连字符（如 `city-select/`）
- **变量/函数**: camelCase
- **常量**: 大写 + 下划线
- **类名**: 小写 + 连字符（BEM 风格）

### 样式编写规范

1. **使用 rpx 单位** 进行响应式适配
2. **scoped 样式** 避免污染
3. **导入变量文件** `@import '@/styles/variable.less';`
4. **条件编译** 区分平台：
   ```css
   /* #ifdef MP-WEIXIN */
   padding-top: 160rpx;
   /* #endif */
   /* #ifndef MP-WEIXIN */
   padding-top: 120rpx;
   /* #endif */
   ```

---

## 路由与页面配置

页面配置统一在 `src/pages.json` 中管理：

```json
{
  "pages": [{
    "path": "pages/home/index",
    "style": {
      "navigationStyle": "custom",
      "enablePullDownRefresh": true
    }
  }]
}
```

导航方式：
- `uni.switchTab({ url: '/pages/home/index' })` - Tab 切换
- `uni.navigateTo({ url: '/pages/stores/index' })` - 页面跳转
- `uni.navigateBack()` - 返回

---

## 组件使用

### TDesign 组件

组件已自动按需引入，无需手动导入：

```vue
<template>
  <t-button theme="primary">按钮</t-button>
  <t-icon name="home" size="48rpx" color="#3B82F6" />
</template>
```

常用组件前缀：`t-`（如 `t-button`, `t-icon`, `t-cell`）

### 自定义组件

```vue
<script setup lang="ts">
import CustomTabBar from '@/components/CustomTabBar.vue';
</script>
```

---

## 网络请求

使用封装的 request 方法：

```typescript
import request from '@/api/request';

// GET 请求
const data = await request('/api/points', 'GET');

// POST 请求
const result = await request('/api/order', 'POST', { id: 1 });
```

### Mock 数据

开发模式下启用 Mock（`src/config.ts` 中设置 `isMock: true`）：

```typescript
// src/mock/index.ts
mockStore['/api/new-feature'] = {
  code: 200,
  message: '请求成功',
  data: { ... }
};
```

---

## 平台适配注意事项

### H5 vs 小程序差异

1. **导航栏高度**: 
   - 小程序需要更高的顶部间距（160rpx）
   - H5 使用 120rpx

2. **字体加载**:
   - TDesign 图标字体在小程序中可能加载失败
   - 已在 `App.vue` 中使用本地字体文件修复

3. **安全区域**:
   ```css
   padding-bottom: env(safe-area-inset-bottom);
   ```

### 条件编译

```typescript
// #ifdef MP-WEIXIN
// 仅微信小程序
// #endif

// #ifndef H5
// 非 H5 平台
// #endif

// #ifdef APP-PLUS
// App 端
// #endif
```

---

## 部署流程

### H5 部署

1. 修改 `deploy.js` 中的 FTP 配置：
   ```javascript
   const config = {
     user: "your-ftp-username",
     password: "your-ftp-password",
     host: "your-ftp-host",
     remoteRoot: "/lmzf/"
   };
   ```

2. 执行部署：
   ```bash
   npm run deploy
   ```

### 小程序部署

1. 构建对应平台代码：
   ```bash
   npm run build:mp-weixin
   ```

2. 使用微信开发者工具导入 `dist/build/mp-weixin` 目录

---

## 重要文件说明

| 文件 | 说明 |
|------|------|
| `src/manifest.json` | 应用配置，包含各平台 appid、权限等 |
| `src/pages.json` | 页面路由、导航栏、TabBar 配置 |
| `src/config.ts` | 全局配置，控制 Mock、API 地址等 |
| `src/App.vue` | 应用根组件，包含全局样式和初始化逻辑 |
| `vite.config.ts` | Vite 构建配置，含路径别名 @ |

---

## 开发注意事项

1. **必须使用 `--legacy-peer-deps`** 安装依赖，因 TDesign 组件库依赖关系较复杂

2. **字体加载**: TDesign 图标通过本地字体文件加载，避免小程序 ERR_CACHE_MISS 错误

3. **scroll-view**: 页面滚动容器统一使用 `scroll-view`，禁用 `page` 全局滚动

4. **骨架屏**: 首页使用 `PageSkeleton` 组件实现加载过渡，其他页面可参照实现

5. **底部导航**: 使用 `CustomTabBar` 组件实现中间凸起的扫码按钮效果，需在页面中手动引入并配合 `uni.hideTabBar()`

6. **更新检测**: App.vue 中已集成微信小程序更新提示

---

## 版本信息

- **当前版本**: v0.2.0
- **Vue**: 3.4.21
- **UniApp**: 3.0.0-4080420251103001
- **TDesign UniApp**: 0.7.1

---

## 参考文档

- [UniApp 文档](https://uniapp.dcloud.net.cn/)
- [TDesign Mobile Vue](https://tdesign.tencent.com/mobile-vue/)
- [Vue 3 文档](https://cn.vuejs.org/)
