/**
 * 应用常量配置
 * 集中管理应用级别的硬编码配置
 */

/** 应用信息 */
export const APP_INFO = {
  /** 应用名称 */
  name: '邻檬智付',
  /** 应用标语 */
  slogan: '让天下没有难收的物业费',
  /** 版本号 */
  version: '1.3.0',
  /** 构建版本 */
  buildVersion: '20250215',
  /** 版权信息 */
  copyright: '© 2026 邻檬智家 版权所有',
} as const

/** 联系方式 */
export const CONTACT = {
  /** 客服微信 */
  wechat: 'lingmeng2024',
  /** 客服电话 */
  phone: '400-888-8888',
  /** 服务时间 */
  serviceHours: '周一至周日 9:00-21:00',
  /** 服务时间标签 */
  serviceHoursTag: '全年无休',
} as const

/** 公司信息 */
export const COMPANY = {
  /** 公司名称 */
  name: '邻檬智付',
  /** 品牌名 */
  brand: '邻檬智家',
  /** 公司简介 */
  description: '邻檬智付是邻檬智家旗下的专业支付服务平台，致力于为社区业主提供便捷、安全的物业费缴纳及积分抵扣服务。',
} as const

/** 积分相关配置 */
export const POINTS = {
  /** 积分抵扣比例（1元 = 100积分） */
  exchangeRate: 100,
  /** 最小抵扣积分 */
  minDeductPoints: 100,
  /** 最大抵扣比例 */
  maxDeductRatio: 0.5,
} as const

/** 邀请返利配置 */
export const INVITE = {
  /** 返利比例 */
  rebateRatio: 0.02,
  /** 返利描述 */
  description: '新用户首单后，您将永久获得其订单2%的积分奖励。',
} as const

/** 链接地址 */
export const LINKS = {
  /** 用户协议 */
  userAgreement: '/pages/webview/index?url=https://lmzf.com/agreement',
  /** 隐私政策 */
  privacyPolicy: '/pages/webview/index?url=https://lmzf.com/privacy',
} as const

/** 动画配置（毫秒） */
export const ANIMATION = {
  /** 页面加载延迟 */
  pageLoadDelay: 800,
  /** 积分动画持续时间 */
  pointsDuration: 1500,
  /** 骨架屏最小显示时间 */
  skeletonMinDuration: 500,
  /** Toast 显示时长 */
  toastDuration: 2000,
  /** 下拉刷新超时 */
  pullDownRefreshTimeout: 800,
} as const
