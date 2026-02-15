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
