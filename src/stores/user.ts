/**
 * 用户状态管理 (Pinia 风格)
 * 使用 Vue 3 reactive 实现轻量级状态管理
 */

import { reactive, readonly, computed } from 'vue'
import config from '@/config'
import type { UserInfo, LoginResult } from '@/types'
import http from '@/api/request'

const { storage } = config

// 状态接口
interface UserState {
  /** 用户信息 */
  userInfo: UserInfo | null
  /** Token */
  token: string
  /** 刷新 Token */
  refreshToken: string
  /** Token 过期时间 */
  expiresAt: number
  /** 是否已登录 */
  isLoggedIn: boolean
  /** 登录中 */
  loginLoading: boolean
}

// 创建响应式状态
const state = reactive<UserState>({
  userInfo: null,
  token: uni.getStorageSync(storage.tokenKey) || '',
  refreshToken: uni.getStorageSync(`${storage.tokenKey}_refresh`) || '',
  expiresAt: uni.getStorageSync(`${storage.tokenKey}_expires`) || 0,
  isLoggedIn: false,
  loginLoading: false,
})

// 检查登录状态
if (state.token && state.expiresAt > Date.now()) {
  state.isLoggedIn = true
  // 尝试从缓存恢复用户信息
  const cachedUserInfo = uni.getStorageSync(storage.userKey)
  if (cachedUserInfo) {
    try {
      state.userInfo = JSON.parse(cachedUserInfo)
    } catch {
      state.userInfo = null
    }
  }
}

// 计算属性
const getters = {
  /** 用户昵称 */
  nickname: computed(() => state.userInfo?.nickname || '未登录'),
  /** 用户头像 */
  avatar: computed(() => state.userInfo?.avatar || '/static/avatar1.png'),
  /** 用户积分 */
  points: computed(() => state.userInfo?.points || 0),
  /** 用户余额 */
  balance: computed(() => state.userInfo?.balance || 0),
  /** Token 是否即将过期（2小时内） */
  isTokenExpiringSoon: computed(() => {
    if (!state.expiresAt) return false
    return state.expiresAt - Date.now() < 2 * 60 * 60 * 1000
  }),
}

// Actions
const actions = {
  /**
   * 设置用户信息
   */
  setUserInfo(userInfo: UserInfo | null) {
    state.userInfo = userInfo
    if (userInfo) {
      uni.setStorageSync(storage.userKey, JSON.stringify(userInfo))
    } else {
      uni.removeStorageSync(storage.userKey)
    }
  },

  /**
   * 设置 Token
   */
  setToken(token: string, refreshToken: string, expiresIn: number) {
    state.token = token
    state.refreshToken = refreshToken
    state.expiresAt = Date.now() + expiresIn * 1000
    state.isLoggedIn = true

    uni.setStorageSync(storage.tokenKey, token)
    uni.setStorageSync(`${storage.tokenKey}_refresh`, refreshToken)
    uni.setStorageSync(`${storage.tokenKey}_expires`, state.expiresAt)
  },

  /**
   * 清除登录态
   */
  clearAuth() {
    state.userInfo = null
    state.token = ''
    state.refreshToken = ''
    state.expiresAt = 0
    state.isLoggedIn = false

    uni.removeStorageSync(storage.tokenKey)
    uni.removeStorageSync(`${storage.tokenKey}_refresh`)
    uni.removeStorageSync(`${storage.tokenKey}_expires`)
    uni.removeStorageSync(storage.userKey)
  },

  /**
   * 微信小程序登录
   */
  async wxLogin(): Promise<boolean> {
    if (state.loginLoading) return false
    state.loginLoading = true

    try {
      // 1. 获取微信登录 code
      const wxLoginRes = await new Promise<UniApp.LoginRes>((resolve, reject) => {
        uni.login({
          provider: 'weixin',
          success: resolve,
          fail: reject,
        })
      })

      if (!wxLoginRes.code) {
        throw new Error('获取微信登录凭证失败')
      }

      // 2. 调用后端登录接口
      const loginRes = await http.post<LoginResult>('/auth/login', {
        code: wxLoginRes.code,
      })

      // 3. 保存登录态
      this.setToken(loginRes.token, loginRes.refreshToken, loginRes.expiresIn)
      this.setUserInfo(loginRes.userInfo)

      // 4. 发送登录成功事件
      uni.$emit('login:success', loginRes.userInfo)

      return true
    } catch (error) {
      console.error('登录失败:', error)
      uni.showToast({ title: '登录失败，请重试', icon: 'none' })
      return false
    } finally {
      state.loginLoading = false
    }
  },

  /**
   * 刷新 Token
   */
  async refreshAccessToken(): Promise<boolean> {
    if (!state.refreshToken) return false

    try {
      const res = await http.post<LoginResult>('/auth/refresh', {
        refreshToken: state.refreshToken,
      })

      this.setToken(res.token, res.refreshToken, res.expiresIn)
      return true
    } catch (error) {
      // 刷新失败，需要重新登录
      this.clearAuth()
      uni.$emit('token:expired')
      return false
    }
  },

  /**
   * 获取用户信息
   */
  async fetchUserInfo(): Promise<void> {
    if (!state.isLoggedIn) return

    try {
      const userInfo = await http.get<UserInfo>('/user/info')
      this.setUserInfo(userInfo)
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  },

  /**
   * 更新用户信息
   */
  async updateUserInfo(data: Partial<UserInfo>): Promise<boolean> {
    try {
      const updated = await http.put<UserInfo>('/user/info', data)
      this.setUserInfo({ ...state.userInfo, ...updated } as UserInfo)
      return true
    } catch (error) {
      console.error('更新用户信息失败:', error)
      return false
    }
  },

  /**
   * 登出
   */
  async logout(): Promise<void> {
    try {
      if (state.token) {
        await http.post('/auth/logout')
      }
    } catch (error) {
      console.error('登出请求失败:', error)
    } finally {
      this.clearAuth()
      uni.$emit('logout')
    }
  },

  /**
   * 检查登录状态并刷新 Token
   */
  async checkAuth(): Promise<boolean> {
    if (!state.token) return false

    // Token 已过期
    if (state.expiresAt <= Date.now()) {
      return this.refreshAccessToken()
    }

    // Token 即将过期，后台静默刷新
    if (getters.isTokenExpiringSoon.value) {
      this.refreshAccessToken()
    }

    return true
  },
}

// 导出用户 Store
export const useUserStore = () => ({
  state: readonly(state),
  ...getters,
  ...actions,
})

// 默认导出
export default useUserStore
