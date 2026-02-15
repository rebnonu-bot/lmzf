/**
 * Storage 封装组合式函数
 */

import { ref, type Ref } from 'vue'
import config from '@/config'

const { storage } = config

/**
 * 使用本地存储
 * @param key 存储键名
 * @param defaultValue 默认值
 * @returns [值, 设置值函数]
 */
export function useStorage<T>(key: string, defaultValue: T): [Readonly<Ref<T>>, (val: T) => void] {
  const storedValue = uni.getStorageSync(key)
  const data = ref<T>(storedValue !== '' ? storedValue : defaultValue) as Ref<T>

  const setValue = (value: T) => {
    data.value = value
    if (value === null || value === undefined) {
      uni.removeStorageSync(key)
    } else {
      uni.setStorageSync(key, value)
    }
  }

  return [data, setValue]
}

/**
 * 使用 Token
 */
export function useToken() {
  const [token, setToken] = useStorage<string>(storage.tokenKey, '')
  const isLoggedIn = () => !!token.value

  const clearToken = () => {
    setToken('')
    uni.removeStorageSync(storage.userKey)
  }

  return {
    token,
    setToken,
    clearToken,
    isLoggedIn,
  }
}

/**
 * 使用用户信息
 */
export function useUserInfo() {
  const [userInfo, setUserInfo] = useStorage<Record<string, any>>(storage.userKey, {})

  const updateUserInfo = (partial: Record<string, any>) => {
    setUserInfo({ ...userInfo.value, ...partial })
  }

  const clearUserInfo = () => {
    setUserInfo({})
  }

  return {
    userInfo,
    setUserInfo,
    updateUserInfo,
    clearUserInfo,
  }
}
