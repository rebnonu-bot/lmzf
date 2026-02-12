# 邻檬智付 (lmzf)

邻檬智家旗下的专业支付服务平台。

**当前版本**: `v0.1.0`

## 更新日志

### v0.1.0 (2024-07-13)
- **UI 优化**: 重新设计首页支付卡片装饰图标。
  - 引入支付宝、微信支付、安全盾牌、小程序等品牌图标。
  - 采用“小清新”马卡龙色系渐变设计。
  - 实现 3D 悬浮与动态浮动效果。
  - 极致精简尺寸，提升视觉精致度。
- **项目构建**: 完成 H5 端生产环境编译测试。

## 项目简介
本项目是基于 [tdesign-uniapp-starter](https://github.com/novlan1/tdesign-uniapp-starter) 开发的 UniApp 项目，采用了 TDesign 企业级设计体系。

## 技术栈
- **框架**: Vue 3 + UniApp
- **UI 组件库**: [TDesign UniApp](https://tdesign.tencent.com/mobile-vue/)
- **构建工具**: Vite
- **语言**: TypeScript

## 开发规范
详细的设计与开发规范请参考 [MASTER.md](./MASTER.md)。

## 快速开始

### 安装依赖
```bash
npm install --legacy-peer-deps
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
