/**
 * 埋点统计管理
 * 支持页面浏览、事件点击、性能监控
 */

import config from '@/config'

const { features } = config

// 埋点数据接口
interface TrackData {
  /** 事件类型 */
  type: 'pageview' | 'click' | 'error' | 'performance'
  /** 事件名称 */
  event: string
  /** 页面路径 */
  page?: string
  /** 额外参数 */
  params?: Record<string, any>
  /** 时间戳 */
  timestamp: number
  /** 用户 ID */
  userId?: string
  /** 会话 ID */
  sessionId: string
  /** 设备信息 */
  device?: UniApp.GetSystemInfoResult
}

// 队列最大长度
const MAX_QUEUE_SIZE = 50

// 上报间隔（毫秒）
const REPORT_INTERVAL = 10000

// 埋点队列
let trackQueue: TrackData[] = []

// 会话 ID
let sessionId = ''

// 用户 ID
let currentUserId = ''

// 设备信息
let deviceInfo: UniApp.GetSystemInfoResult | null = null

// 上报定时器
let reportTimer: ReturnType<typeof setInterval> | null = null

// 是否初始化
let isInitialized = false

/**
 * 初始化埋点
 */
export function initTracker(): void {
  if (isInitialized) return
  if (!features.enableTracker) {
    console.log('[Tracker] 埋点功能已禁用')
    return
  }

  // 生成会话 ID
  sessionId = generateSessionId()

  // 获取设备信息
  deviceInfo = uni.getSystemInfoSync()

  // 启动定时上报
  startAutoReport()

  // 监听应用生命周期
  setupLifecycleTracking()

  isInitialized = true
  console.log('[Tracker] 初始化完成')
}

/**
 * 设置用户 ID
 */
export function setTrackerUserId(userId: string): void {
  currentUserId = userId
}

/**
 * 生成会话 ID
 */
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 创建埋点数据
 */
function createTrackData(
  type: TrackData['type'],
  event: string,
  params?: Record<string, any>
): TrackData {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]

  return {
    type,
    event,
    page: currentPage?.route || '',
    params,
    timestamp: Date.now(),
    userId: currentUserId || undefined,
    sessionId,
    device: deviceInfo || undefined,
  }
}

/**
 * 添加埋点到队列
 */
function addToQueue(data: TrackData): void {
  trackQueue.push(data)

  // 队列满时立即上报
  if (trackQueue.length >= MAX_QUEUE_SIZE) {
    flushQueue()
  }
}

/**
 * 页面浏览埋点
 */
export function trackPageView(pageName: string, params?: Record<string, any>): void {
  if (!isInitialized) return

  const data = createTrackData('pageview', pageName, params)
  addToQueue(data)
}

/**
 * 点击事件埋点
 */
export function trackClick(eventName: string, params?: Record<string, any>): void {
  if (!isInitialized) return

  const data = createTrackData('click', eventName, params)
  addToQueue(data)
}

/**
 * 错误埋点
 */
export function trackError(error: Error, params?: Record<string, any>): void {
  if (!isInitialized) return

  const data = createTrackData('error', error.name || 'Error', {
    message: error.message,
    stack: error.stack,
    ...params,
  })
  addToQueue(data)
}

/**
 * 性能埋点
 */
export function trackPerformance(metricName: string, value: number, params?: Record<string, any>): void {
  if (!isInitialized) return

  const data = createTrackData('performance', metricName, {
    value,
    unit: 'ms',
    ...params,
  })
  addToQueue(data)
}

/**
 * 上报队列数据
 */
async function flushQueue(): Promise<void> {
  if (trackQueue.length === 0) return

  const data = [...trackQueue]
  trackQueue = []

  try {
    // 这里替换为实际上报接口
    await reportToServer(data)
  } catch (error) {
    // 上报失败，数据回滚
    trackQueue = [...data, ...trackQueue].slice(0, MAX_QUEUE_SIZE)
    console.error('[Tracker] 上报失败:', error)
  }
}

/**
 * 上报到服务器
 */
async function reportToServer(data: TrackData[]): Promise<void> {
  // 生产环境实际上报
  if (config.isProd) {
    // 示例：使用 Beacon API 或 Fetch 上报
    try {
      uni.request({
        url: `${config.api.baseUrl}/tracker/report`,
        method: 'POST',
        data: { events: data },
        header: {
          'Content-Type': 'application/json',
        },
        // 静默上报，不处理响应
        success: () => {},
        fail: () => {},
      })
    } catch {
      // 静默处理
    }
  } else {
    // 开发环境打印日志
    console.log('[Tracker] 上报数据:', data)
  }
}

/**
 * 启动自动上报
 */
function startAutoReport(): void {
  if (reportTimer) return

  reportTimer = setInterval(() => {
    flushQueue()
  }, REPORT_INTERVAL)
}

/**
 * 停止自动上报
 */
function stopAutoReport(): void {
  if (reportTimer) {
    clearInterval(reportTimer)
    reportTimer = null
  }
}

/**
 * 设置生命周期监听
 */
function setupLifecycleTracking(): void {
  // 应用显示
  uni.onAppShow(() => {
    trackPageView('app_show')
  })

  // 应用隐藏时上报
  uni.onAppHide(() => {
    flushQueue()
  })
}

/**
 * 销毁埋点
 */
export function destroyTracker(): void {
  stopAutoReport()
  flushQueue()
  isInitialized = false
}

/**
 * 立即上报
 */
export function flushTracker(): Promise<void> {
  return flushQueue()
}

// 默认导出
export default {
  init: initTracker,
  setUserId: setTrackerUserId,
  pageView: trackPageView,
  click: trackClick,
  error: trackError,
  performance: trackPerformance,
  flush: flushTracker,
  destroy: destroyTracker,
}
