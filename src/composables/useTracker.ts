/**
 * 埋点相关组合式函数
 */

import { onMounted, onUnmounted } from 'vue'
import { trackPageView, trackClick, trackPerformance } from '@/utils/tracker'

/**
 * 页面浏览埋点
 * @param pageName 页面名称
 * @param params 额外参数
 */
export function usePageView(pageName: string, params?: Record<string, any>) {
  onMounted(() => {
    trackPageView(pageName, params)
  })
}

/**
 * 点击事件埋点
 * @param eventName 事件名称
 * @param params 额外参数
 * @returns 点击处理函数
 */
export function useClickTrack(eventName: string, params?: Record<string, any>) {
  return () => {
    trackClick(eventName, params)
  }
}

/**
 * 性能监控
 * @param metricName 指标名称
 */
export function usePerformanceTrack(metricName: string) {
  const startTime = Date.now()

  onMounted(() => {
    const loadTime = Date.now() - startTime
    trackPerformance(metricName, loadTime, { stage: 'mount' })
  })
}

/**
 * 使用埋点
 */
export function useTracker() {
  return {
    /** 页面浏览 */
    pageView: trackPageView,
    /** 点击事件 */
    click: trackClick,
    /** 性能监控 */
    performance: trackPerformance,
  }
}
