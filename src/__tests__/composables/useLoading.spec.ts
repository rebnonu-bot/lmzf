import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useLoading, useRefresh, useLoadMore } from '@/composables/useLoading'

// Mock uni API
vi.mock('@dcloudio/uni-app', () => ({
  onShow: vi.fn(),
  onHide: vi.fn(),
}))

// Mock uni global
global.uni = {
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
} as any

describe('useLoading', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should start with loading false', () => {
    const { loading } = useLoading()
    expect(loading.value).toBe(false)
  })

  it('should show loading when calling showLoading', () => {
    const { loading, showLoading } = useLoading()
    showLoading('加载中...')
    expect(loading.value).toBe(true)
    expect(uni.showLoading).toHaveBeenCalledWith({
      title: '加载中...',
      mask: true,
    })
  })

  it('should hide loading when calling hideLoading', () => {
    const { loading, showLoading, hideLoading } = useLoading()
    showLoading()
    hideLoading()
    expect(loading.value).toBe(false)
    expect(uni.hideLoading).toHaveBeenCalled()
  })

  it('should use default title when not provided', () => {
    const { showLoading } = useLoading()
    showLoading()
    expect(uni.showLoading).toHaveBeenCalledWith({
      title: '加载中...',
      mask: true,
    })
  })
})

describe('useRefresh', () => {
  it('should start with refreshing false', () => {
    const { refreshing } = useRefresh()
    expect(refreshing.value).toBe(false)
  })

  it('should set refreshing to true during refresh', async () => {
    const { refreshing, onRefresh } = useRefresh()
    
    let isRefreshingDuringCallback = false
    const callback = async () => {
      isRefreshingDuringCallback = refreshing.value
    }
    
    await onRefresh(callback)
    expect(isRefreshingDuringCallback).toBe(true)
    expect(refreshing.value).toBe(false)
  })

  it('should handle async callback', async () => {
    const { refreshing, onRefresh } = useRefresh()
    
    const asyncCallback = vi.fn().mockResolvedValue(undefined)
    
    await onRefresh(asyncCallback)
    expect(asyncCallback).toHaveBeenCalled()
    expect(refreshing.value).toBe(false)
  })
})

describe('useLoadMore', () => {
  it('should start with correct initial state', () => {
    const { loadingMore, noMore } = useLoadMore()
    expect(loadingMore.value).toBe(false)
    expect(noMore.value).toBe(false)
  })

  it('should set loadingMore to true during load', async () => {
    const { loadingMore, loadMore } = useLoadMore()
    
    const callback = vi.fn().mockResolvedValue(true)
    
    const promise = loadMore(callback)
    expect(loadingMore.value).toBe(true)
    await promise
    expect(loadingMore.value).toBe(false)
  })

  it('should set noMore when callback returns false', async () => {
    const { noMore, loadMore } = useLoadMore()
    
    const callback = vi.fn().mockResolvedValue(false)
    
    await loadMore(callback)
    expect(noMore.value).toBe(true)
  })

  it('should not call callback when already loading', async () => {
    const { loadMore } = useLoadMore()
    
    const callback = vi.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(true), 100))
    )
    
    // Start first load
    const promise1 = loadMore(callback)
    // Try to start second load immediately
    const promise2 = loadMore(callback)
    
    await Promise.all([promise1, promise2])
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should reset state when calling reset', async () => {
    const { noMore, loadMore, reset } = useLoadMore()
    
    const callback = vi.fn().mockResolvedValue(false)
    await loadMore(callback)
    expect(noMore.value).toBe(true)
    
    reset()
    expect(noMore.value).toBe(false)
  })
})
