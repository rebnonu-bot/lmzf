/**
 * 全局配置文件
 * 支持多环境：development | production
 */

// 环境类型
export type EnvType = 'development' | 'production' | 'test'

// 当前环境
export const env: EnvType = import.meta.env.MODE as EnvType || 'development'

// 环境配置
export const config = {
  // 应用信息
  app: {
    name: '邻檬智付',
    version: '1.1.1',
    buildVersion: '20250215',
  },
  
  // 环境标识
  env,
  isDev: env === 'development',
  isProd: env === 'production',
  isTest: env === 'test',
  
  // API 配置
  api: {
    // 基础地址
    baseUrl: env === 'production' 
      ? 'https://api.lmzf.com/v1'
      : env === 'test'
        ? 'https://test-api.lmzf.com/v1'
        : 'http://localhost:3000/v1',
    // 超时时间（毫秒）
    timeout: 15000,
    // 是否启用 Mock
    enableMock: env === 'development',
    // Mock 延迟
    mockDelay: 500,
  },
  
  // 存储配置
  storage: {
    // Token 存储键名
    tokenKey: 'access_token',
    // 用户信息存储键名
    userKey: 'user_info',
    // 城市信息存储键名
    cityKey: 'selected_city',
  },
  
  // 分页配置
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
  
  // 功能开关
  features: {
    // 启用埋点
    enableTracker: env === 'production',
    // 启用日志上报
    enableLogReport: env === 'production',
    // 启用性能监控
    enablePerformance: env === 'production',
  },
}

// 导出默认配置
export default config
