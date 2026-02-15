/**
 * Loading 状态管理组合式函数
 */

import { ref } from 'vue'

/**
 * 使用加载状态
 */
export function useLoading() {
  const loading = ref(false)

  const showLoading = (title?: string) => {
    loading.value = true
    uni.showLoading({
      title: title || '加载中...',
      mask: true,
    })
  }

  const hideLoading = () => {
    loading.value = false
    uni.hideLoading()
  }

  return {
    loading,
    showLoading,
    hideLoading,
  }
}

/**
 * 使用刷新状态
 */
export function useRefresh() {
  const refreshing = ref(false)
  const triggered = ref(false)

  const onRefresh = async (callback: () => Promise<void>) => {
    refreshing.value = true
    triggered.value = true
    
    try {
      await callback()
    } finally {
      refreshing.value = false
      triggered.value = false
    }
  }

  return {
    refreshing,
    triggered,
    onRefresh,
  }
}

/**
 * 使用加载更多状态
 */
export function useLoadMore() {
  const loadingMore = ref(false)
  const noMore = ref(false)

  const loadMore = async (callback: () => Promise<boolean>) => {
    if (loadingMore.value || noMore.value) return
    
    loadingMore.value = true
    try {
      const hasMore = await callback()
      noMore.value = !hasMore
    } finally {
      loadingMore.value = false
    }
  }

  const reset = () => {
    loadingMore.value = false
    noMore.value = false
  }

  return {
    loadingMore,
    noMore,
    loadMore,
    reset,
  }
}
