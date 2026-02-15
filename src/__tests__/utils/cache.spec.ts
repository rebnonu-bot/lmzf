import { describe, it, expect, beforeEach } from 'vitest'
import { CacheManager, PersistentCache, CacheKeys, CacheExpires } from '@/utils/cache'

describe('CacheManager', () => {
  beforeEach(() => {
    CacheManager.clear()
  })

  it('should set and get cache', () => {
    CacheManager.set('test-key', { name: 'test' }, 60000)
    const result = CacheManager.get('test-key')
    expect(result).toEqual({ name: 'test' })
  })

  it('should return null for expired cache', () => {
    CacheManager.set('expired-key', { name: 'test' }, -1)
    const result = CacheManager.get('expired-key')
    expect(result).toBeNull()
  })

  it('should return null for non-existent key', () => {
    const result = CacheManager.get('non-existent')
    expect(result).toBeNull()
  })

  it('should delete cache', () => {
    CacheManager.set('delete-key', { name: 'test' })
    CacheManager.delete('delete-key')
    const result = CacheManager.get('delete-key')
    expect(result).toBeNull()
  })

  it('should check if cache exists', () => {
    CacheManager.set('exists-key', { name: 'test' })
    expect(CacheManager.has('exists-key')).toBe(true)
    expect(CacheManager.has('not-exists')).toBe(false)
  })

  it('should use getOrSet to fetch and cache data', async () => {
    const fetcher = vi.fn().mockResolvedValue({ data: 'fetched' })
    
    // First call should fetch
    const result1 = await CacheManager.getOrSet('fetch-key', fetcher, 60000)
    expect(result1).toEqual({ data: 'fetched' })
    expect(fetcher).toHaveBeenCalledTimes(1)
    
    // Second call should use cache
    const result2 = await CacheManager.getOrSet('fetch-key', fetcher, 60000)
    expect(result2).toEqual({ data: 'fetched' })
    expect(fetcher).toHaveBeenCalledTimes(1) // Not called again
  })
})

describe('CacheKeys', () => {
  it('should have correct cache key constants', () => {
    expect(CacheKeys.HOME_DATA).toBe('home_data')
    expect(CacheKeys.USER_INFO).toBe('user_info')
    expect(CacheKeys.CITY_LIST).toBe('city_list')
    expect(CacheKeys.STORE_LIST).toBe('store_list')
  })
})

describe('CacheExpires', () => {
  it('should have correct expiration times', () => {
    expect(CacheExpires.HOME_DATA).toBe(2 * 60 * 1000) // 2 minutes
    expect(CacheExpires.USER_INFO).toBe(10 * 60 * 1000) // 10 minutes
    expect(CacheExpires.CITY_LIST).toBe(60 * 60 * 1000) // 1 hour
  })
})
