/**
 * Mock 数据模块
 * 使用增强版 Mock 核心系统
 */

import {
  initMockInterceptor,
  register,
  registerResource,
  type MockContext,
  type MockResponse,
} from './core'
import config from '@/config'
import { homeMockData } from '@/config/mock.config'

/**
 * 初始化 Mock 数据
 */
let initialized = false

export function initMock() {
  if (!config.api.enableMock || initialized) return
  
  initialized = true
  
  // 初始化拦截器
  initMockInterceptor()
  
  // 注册首页相关 Mock
  registerHomeMocks()
  
  // 注册用户相关 Mock
  registerUserMocks()
  
  // 注册门店相关 Mock
  registerStoreMocks()
  
  console.log('[Mock] Mock 系统已初始化')
}

/**
 * 首页相关 Mock
 */
function registerHomeMocks(): void {
  // 获取积分信息
  register('GET', '/api/points', {
    response: (): MockResponse => ({
      code: 200,
      message: '请求成功',
      data: {
        points: 12993,
        deductAmount: 129.93,
        todayEarned: 156,
        totalEarned: 25890,
      },
    }),
    delay: [200, 500],
  })
  
  // 获取首页数据
  register('GET', '/api/home', {
    response: (): MockResponse => ({
      code: 200,
      message: '请求成功',
      data: {
        banners: [
          { id: '1', image: '/static/banner1.png', title: '物业费减免', link: '/pages/home/index' },
          { id: '2', image: '/static/banner2.png', title: '邀请返利', link: '/package-invite/pages/invite/poster' },
        ],
        notices: [
          { id: '1', title: '系统升级公告', createTime: '2026-02-15' },
          { id: '2', title: '春节活动开始啦', createTime: '2026-02-10' },
        ],
      },
    }),
    delay: 300,
  })

  // 柠檬币交易记录
  register('GET', '/api/user/coins/transactions', {
    response: (): MockResponse => {
      // 从配置中获取数据，保证与 mock.config.ts 一致
      const transactions = homeMockData.coinTransactions || [
        { id: '1', title: '邀请好友奖励', time: '2026-02-18 10:30', amount: 50, type: 'income' },
        { id: '2', title: '兑换优惠券', time: '2026-02-17 15:20', amount: -100, type: 'expense' },
        { id: '3', title: '每日签到', time: '2026-02-17 09:00', amount: 10, type: 'income' },
        { id: '4', title: '参与活动奖励', time: '2026-02-16 14:00', amount: 200, type: 'income' },
        { id: '5', title: '完善个人信息', time: '2026-02-15 11:20', amount: 30, type: 'income' },
        { id: '6', title: '系统赠送', time: '2026-02-01 00:00', amount: 1060, type: 'income' },
      ];
      
      return {
        code: 200,
        message: '请求成功',
        data: {
          list: transactions,
          total: transactions.length
        },
      }
    },
    delay: 400,
  })
}

/**
 * 用户相关 Mock
 */
function registerUserMocks(): void {
  // RESTful 用户资源
  registerResource('/api/users', {
    // GET /api/users
    index: (): MockResponse => ({
      code: 200,
      message: '请求成功',
      data: {
        list: [
          { id: '1', nickname: '用户1', level: 'gold' },
          { id: '2', nickname: '用户2', level: 'silver' },
        ],
        total: 2,
      },
    }),
    
    // GET /api/users/:id
    show: (ctx: MockContext): MockResponse => ({
      code: 200,
      message: '请求成功',
      data: {
        id: ctx.params.id,
        nickname: '梅菜扣肉',
        avatar: '/static/avatar1.png',
        level: 'gold',
        coins: 1250,
        coinLabel: '柠檬币',
        coupons: 3,
        joinDays: 12,
        inviteCount: 8,
        points: 12993,
        balance: 129.93,
      },
    }),
    
    // POST /api/users
    create: (ctx: MockContext): MockResponse => ({
      code: 200,
      message: '创建成功',
      data: {
        id: Date.now().toString(),
        ...ctx.body,
        createTime: new Date().toISOString(),
      },
    }),
    
    // PUT /api/users/:id
    update: (ctx: MockContext): MockResponse => ({
      code: 200,
      message: '更新成功',
      data: {
        id: ctx.params.id,
        ...ctx.body,
        updateTime: new Date().toISOString(),
      },
    }),
    
    // DELETE /api/users/:id
    destroy: (ctx: MockContext): MockResponse => ({
      code: 200,
      message: '删除成功',
      data: { id: ctx.params.id },
    }),
  })
  
  // 登录
  register('POST', '/auth/login', {
    response: (ctx: MockContext): MockResponse => {
      const { code } = ctx.body || {}
      
      if (!code) {
        return { code: 400, message: '缺少登录凭证' }
      }
      
      return {
        code: 200,
        message: '登录成功',
        data: {
          token: 'mock_token_' + Date.now(),
          refreshToken: 'mock_refresh_' + Date.now(),
          expiresIn: 7200,
          userInfo: {
            id: '1',
            nickname: '梅菜扣肉',
            avatar: '/static/avatar1.png',
            level: 'gold',
            points: 12580,
            balance: 88.88,
            coins: 100,
            coinLabel: '柠檬币',
            coupons: 5,
            joinDays: 100,
            inviteCount: 10
          },
        },
      }
    },
    delay: 500,
  })
  
  // 刷新 Token
  register('POST', '/auth/refresh', {
    response: (ctx: MockContext): MockResponse => {
      const { refreshToken } = ctx.body || {}
      
      if (!refreshToken) {
        return { code: 401, message: '缺少刷新令牌' }
      }
      
      return {
        code: 200,
        message: '刷新成功',
        data: {
          token: 'mock_token_' + Date.now(),
          refreshToken: 'mock_refresh_' + Date.now(),
          expiresIn: 7200,
        },
      }
    },
    delay: 300,
  })
  
  // 登出
  register('POST', '/auth/logout', {
    response: (): MockResponse => ({
      code: 200,
      message: '登出成功',
    }),
    delay: 200,
  })
}

/**
 * 门店相关 Mock
 */
function registerStoreMocks(): void {
  // 门店列表
  register('GET', '/api/stores', {
    response: (ctx: MockContext): MockResponse => {
      const { page = 1, pageSize = 20, city } = ctx.query
      
      const stores = Array.from({ length: Number(pageSize) }, (_, i) => ({
        id: String((Number(page) - 1) * Number(pageSize) + i + 1),
        name: `门店${i + 1}`,
        address: `${city || '北京'}市朝阳区某街道${i + 1}号`,
        phone: '400-888-8888',
        latitude: 39.9 + Math.random() * 0.1,
        longitude: 116.4 + Math.random() * 0.1,
        distance: Math.floor(Math.random() * 5000),
        rating: (4 + Math.random()).toFixed(1),
        businessHours: '09:00-21:00',
        tags: ['优惠', '返现'],
      }))
      
      return {
        code: 200,
        message: '请求成功',
        data: {
          list: stores,
          total: 100,
          page: Number(page),
          pageSize: Number(pageSize),
          hasMore: Number(page) * Number(pageSize) < 100,
        },
      }
    },
    delay: [300, 800],
  })
  
  // 门店详情
  register('GET', '/api/stores/:id', {
    response: (ctx: MockContext): MockResponse => ({
      code: 200,
      message: '请求成功',
      data: {
        id: ctx.params.id,
        name: '示例门店',
        address: '北京市朝阳区某街道1号',
        phone: '400-888-8888',
        latitude: 39.9,
        longitude: 116.4,
        rating: '4.8',
        businessHours: '09:00-21:00',
        tags: ['优惠', '返现', '积分翻倍'],
        images: ['/static/store1.png', '/static/store2.png'],
        description: '这是一家优质的合作门店，消费可获积分返现。',
      },
    }),
    delay: 300,
  })
}

// 导出核心 API 供外部使用
export { register, registerResource }
export type { MockContext, MockResponse, MockHandler } from './core'

export default { initMock, register, registerResource }
