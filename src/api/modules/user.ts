/**
 * 用户相关 API
 * 封装用户相关的所有接口调用
 */

import http from '../request'
import config from '@/config'
import { homeMockData } from '@/config/mock.config'
import type { UserInfo, LoginResult } from '@/types/api.d'

/**
 * 获取用户信息
 */
export async function getUserInfo(): Promise<UserInfo> {
  console.log('[API] getUserInfo 调用, enableMock:', config.api.enableMock);
  if (config.api.enableMock) {
    console.log('[API] 返回 Mock 数据');
    return Promise.resolve(homeMockData.userInfo as UserInfo)
  }
  console.log('[API] 发起 HTTP 请求');
  return http.get<UserInfo>('/user/info')
}

/**
 * 更新用户信息
 */
export async function updateUserInfo(data: Partial<UserInfo>): Promise<UserInfo> {
  if (config.api.enableMock) {
    return Promise.resolve({ ...homeMockData.userInfo, ...data } as UserInfo)
  }
  return http.put<UserInfo>('/user/info', data)
}

/**
 * 微信小程序登录
 */
export async function wxLogin(code: string): Promise<LoginResult> {
  if (config.api.enableMock) {
    return Promise.resolve({
      token: 'mock_token_' + Date.now(),
      refreshToken: 'mock_refresh_' + Date.now(),
      expiresIn: 7200,
      userInfo: homeMockData.userInfo as UserInfo
    })
  }
  return http.post<LoginResult>('/auth/login', { code })
}

/**
 * 刷新 Token
 */
export async function refreshToken(refreshToken: string): Promise<LoginResult> {
  if (config.api.enableMock) {
    return Promise.resolve({
      token: 'mock_token_' + Date.now(),
      refreshToken: 'mock_refresh_' + Date.now(),
      expiresIn: 7200,
      userInfo: homeMockData.userInfo as UserInfo
    })
  }
  return http.post<LoginResult>('/auth/refresh', { refreshToken })
}

/**
 * 用户登出
 */
export async function logout(): Promise<void> {
  if (config.api.enableMock) {
    return Promise.resolve()
  }
  await http.post('/auth/logout')
}

/**
 * 获取用户积分信息
 */
export async function getUserPoints(): Promise<{
  points: number
  deductAmount: number
  todayEarned: number
  totalEarned: number
}> {
  if (config.api.enableMock) {
    return Promise.resolve({
      points: homeMockData.targetPoints,
      deductAmount: homeMockData.targetPoints / 100,
      todayEarned: 156,
      totalEarned: 25890
    })
  }
  return http.get('/api/points')
}

/**
 * 获取柠檬币交易记录
 */
export async function getCoinTransactions(params?: { page: number; pageSize: number }): Promise<{
  list: any[]
  total: number
}> {
  if (config.api.enableMock) {
    return Promise.resolve({
      list: [
        { id: '1', title: '每日签到', time: '2024-03-20 08:30:00', amount: 10, type: 'income' },
        { id: '2', title: '兑换商品', time: '2024-03-19 14:20:00', amount: -50, type: 'expense' },
        { id: '3', title: '邀请好友', time: '2024-03-18 10:00:00', amount: 20, type: 'income' },
      ],
      total: 3
    })
  }
  return http.get('/user/coins/transactions', params)
}

/**
 * 获取积分明细
 */
export async function getPointsHistory(params?: { page: number; pageSize: number; type?: 'all' | 'income' | 'expense' }): Promise<{
  list: any[]
  total: number
}> {
  if (config.api.enableMock) {
    const list = [
      { id: '1', title: '缴纳物业费抵扣', time: '2024-03-20 10:00:00', amount: -500, type: 'expense', category: 'deduct' },
      { id: '2', title: '线下消费返利', time: '2024-03-19 12:30:00', amount: 120, type: 'income', category: 'offline' },
      { id: '3', title: '邀请好友奖励', time: '2024-03-18 09:15:00', amount: 50, type: 'income', category: 'invite' },
      { id: '4', title: '线上购物返利', time: '2024-03-17 15:45:00', amount: 80, type: 'income', category: 'online' },
      { id: '5', title: '系统赠送', time: '2024-03-16 10:00:00', amount: 100, type: 'income', category: 'system' },
    ];
    return Promise.resolve({
      list: params?.type && params.type !== 'all' 
        ? list.filter(item => item.type === params.type)
        : list,
      total: 5
    })
  }
  return http.get('/user/points/history', params)
}

/**
 * 获取钱包明细（佣金记录）
 */
export async function getWalletHistory(params?: { page: number; pageSize: number; type?: 'all' | 'income' | 'expense' }): Promise<{
  list: any[]
  total: number
}> {
  if (config.api.enableMock) {
    const list = [
      { id: '1', title: '邀请好友首单奖励', time: '2024-03-20 14:30:00', amount: 5.00, type: 'income' },
      { id: '2', title: '提现到微信零钱', time: '2024-03-18 16:20:00', amount: -50.00, type: 'expense', status: 'success' },
      { id: '3', title: '下级消费提成', time: '2024-03-17 11:10:00', amount: 2.50, type: 'income' },
    ];
    return Promise.resolve({
      list: params?.type && params.type !== 'all' 
        ? list.filter(item => item.type === params.type)
        : list,
      total: 3
    })
  }
  return http.get('/user/wallet/history', params)
}

/**
 * 申请提现
 */
export async function withdraw(amount: number, method: 'wechat' | 'alipay' | 'bank'): Promise<{ success: boolean, message: string }> {
  if (config.api.enableMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: '提现申请已提交' });
      }, 1000);
    });
  }
  return http.post('/user/wallet/withdraw', { amount, method })
}

/**
 * 获取优惠券列表
 */
export async function getUserCoupons(status: 'unused' | 'used' | 'expired' = 'unused'): Promise<any[]> {
  if (config.api.enableMock) {
    // @ts-ignore
    const allCoupons = homeMockData.coupons || [];
    return Promise.resolve(allCoupons.filter((c: any) => c.status === status));
  }
  return http.get('/user/coupons', { status });
}
