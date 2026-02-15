/**
 * 数据缓存管理
 * 支持内存缓存 + Storage 持久化
 */

// 缓存项接口
interface CacheItem<T> {
  /** 数据 */
  data: T
  /** 过期时间戳 */
  expireAt: number
  /** 创建时间 */
  createdAt: number
}

// 缓存配置
export interface CacheOptions {
  /** 缓存键名 */
  key: string
  /** 过期时间（毫秒），默认 5 分钟 */
  expire?: number
  /** 是否持久化到 Storage */
  persistent?: boolean
}

// 内存缓存存储
const memoryCache = new Map<string, CacheItem<any>>()

// 默认过期时间：5 分钟
const DEFAULT_EXPIRE = 5 * 60 * 1000

/**
 * 缓存管理类
 */
export class CacheManager {
  /**
   * 设置缓存
   */
  static set<T>(key: string, data: T, expire: number = DEFAULT_EXPIRE): void {
    const cacheItem: CacheItem<T> = {
      data,
      expireAt: Date.now() + expire,
      createdAt: Date.now(),
    }

    memoryCache.set(key, cacheItem)
  }

  /**
   * 获取缓存
   */
  static get<T>(key: string): T | null {
    const item = memoryCache.get(key)

    if (!item) return null

    // 检查是否过期
    if (Date.now() > item.expireAt) {
      memoryCache.delete(key)
      return null
    }

    return item.data as T
  }

  /**
   * 删除缓存
   */
  static delete(key: string): void {
    memoryCache.delete(key)
  }

  /**
   * 清空缓存
   */
  static clear(): void {
    memoryCache.clear()
  }

  /**
   * 检查缓存是否存在且有效
   */
  static has(key: string): boolean {
    const item = memoryCache.get(key)
    if (!item) return false
    if (Date.now() > item.expireAt) {
      memoryCache.delete(key)
      return false
    }
    return true
  }

  /**
   * 获取或设置缓存（包装异步请求）
   */
  static async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    expire: number = DEFAULT_EXPIRE
  ): Promise<T> {
    // 先尝试从缓存获取
    const cached = this.get<T>(key)
    if (cached !== null) {
      return cached
    }

    // 执行请求
    const data = await fetcher()

    // 存入缓存
    this.set(key, data, expire)

    return data
  }
}

/**
 * Storage 持久化缓存
 */
export class PersistentCache {
  /**
   * 设置持久化缓存
   */
  static set<T>(key: string, data: T, expire: number = DEFAULT_EXPIRE): void {
    const cacheItem: CacheItem<T> = {
      data,
      expireAt: Date.now() + expire,
      createdAt: Date.now(),
    }

    try {
      uni.setStorageSync(`cache_${key}`, cacheItem)
    } catch (error) {
      console.error('Storage 写入失败:', error)
    }
  }

  /**
   * 获取持久化缓存
   */
  static get<T>(key: string): T | null {
    try {
      const item = uni.getStorageSync(`cache_${key}`) as CacheItem<T> | undefined

      if (!item) return null

      // 检查是否过期
      if (Date.now() > item.expireAt) {
        uni.removeStorageSync(`cache_${key}`)
        return null
      }

      return item.data
    } catch (error) {
      console.error('Storage 读取失败:', error)
      return null
    }
  }

  /**
   * 删除持久化缓存
   */
  static delete(key: string): void {
    try {
      uni.removeStorageSync(`cache_${key}`)
    } catch (error) {
      console.error('Storage 删除失败:', error)
    }
  }

  /**
   * 清空所有缓存（以 cache_ 开头的键）
   */
  static clear(): void {
    try {
      const keys = uni.getStorageInfoSync().keys
      keys.forEach((key) => {
        if (key.startsWith('cache_')) {
          uni.removeStorageSync(key)
        }
      })
    } catch (error) {
      console.error('Storage 清空失败:', error)
    }
  }
}

/**
 * 业务缓存键名常量
 */
export const CacheKeys = {
  /** 首页数据 */
  HOME_DATA: 'home_data',
  /** 用户信息 */
  USER_INFO: 'user_info',
  /** 城市列表 */
  CITY_LIST: 'city_list',
  /** 门店列表 */
  STORE_LIST: 'store_list',
  /** 平台列表 */
  PLATFORM_LIST: 'platform_list',
  /** 轮播图 */
  BANNER_LIST: 'banner_list',
  /** 公告列表 */
  NOTICE_LIST: 'notice_list',
} as const

/**
 * 业务缓存过期时间（毫秒）
 */
export const CacheExpires = {
  /** 首页数据：2 分钟 */
  HOME_DATA: 2 * 60 * 1000,
  /** 用户信息：10 分钟 */
  USER_INFO: 10 * 60 * 1000,
  /** 城市列表：1 小时 */
  CITY_LIST: 60 * 60 * 1000,
  /** 门店列表：5 分钟 */
  STORE_LIST: 5 * 60 * 1000,
  /** 平台列表：30 分钟 */
  PLATFORM_LIST: 30 * 60 * 1000,
  /** 轮播图：10 分钟 */
  BANNER_LIST: 10 * 60 * 1000,
  /** 公告列表：10 分钟 */
  NOTICE_LIST: 10 * 60 * 1000,
} as const

/**
 * 带缓存的请求封装
 */
export async function cachedRequest<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  expire: number = DEFAULT_EXPIRE,
  options: {
    /** 强制刷新，忽略缓存 */
    forceRefresh?: boolean
    /** 使用持久化缓存 */
    persistent?: boolean
  } = {}
): Promise<T> {
  const { forceRefresh = false, persistent = false } = options

  // 不强制刷新时，先查缓存
  if (!forceRefresh) {
    const cached = persistent
      ? PersistentCache.get<T>(cacheKey)
      : CacheManager.get<T>(cacheKey)

    if (cached !== null) {
      return cached
    }
  }

  // 执行请求
  const data = await fetcher()

  // 存入缓存
  if (persistent) {
    PersistentCache.set(cacheKey, data, expire)
  } else {
    CacheManager.set(cacheKey, data, expire)
  }

  return data
}

export default CacheManager
