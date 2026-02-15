/**
 * 统一错误处理模块
 * 提供错误捕获、提示、上报功能
 */

import config from '@/config'

/** 错误级别 */
export type ErrorLevel = 'info' | 'warn' | 'error' | 'fatal'

/** 错误信息结构 */
export interface AppError {
  /** 错误消息 */
  message: string
  /** 错误级别 */
  level: ErrorLevel
  /** 错误代码 */
  code?: string | number
  /** 错误详情 */
  detail?: unknown
  /** 发生时间 */
  timestamp: number
  /** 发生页面 */
  page?: string
}

/** 错误处理选项 */
export interface ErrorHandlerOptions {
  /** 是否显示错误提示 */
  showToast?: boolean
  /** 自定义错误提示文字 */
  toastMessage?: string
  /** 是否上报错误 */
  report?: boolean
  /** 错误级别 */
  level?: ErrorLevel
  /** 上下文信息 */
  context?: Record<string, unknown>
}

/**
 * 显示错误提示
 */
export function showErrorToast(message: string, duration = 2000): void {
  uni.showToast({
    title: message,
    icon: 'none',
    duration
  })
}

/**
 * 显示成功提示
 */
export function showSuccessToast(message: string, duration = 1500): void {
  uni.showToast({
    title: message,
    icon: 'success',
    duration
  })
}

/**
 * 上报错误到服务器
 */
export async function reportError(error: AppError): Promise<void> {
  if (!config.features.enableLogReport) return

  try {
    await uni.request({
      url: `${config.api.baseUrl}/log/error`,
      method: 'POST',
      data: {
        ...error,
        platform: uni.getSystemInfoSync().platform,
        appVersion: config.app.version,
      }
    })
  } catch (e) {
    console.error('[ErrorReport] 上报失败:', e)
  }
}

/**
 * 统一错误处理
 * @param error 错误对象或错误消息
 * @param options 处理选项
 */
export function handleError(
  error: Error | string | unknown,
  options: ErrorHandlerOptions = {}
): AppError {
  const {
    showToast = true,
    toastMessage,
    report = true,
    level = 'error',
    context = {}
  } = options

  // 构建错误对象
  const appError: AppError = {
    message: error instanceof Error ? error.message : String(error),
    level,
    timestamp: Date.now(),
    detail: error,
    ...context
  }

  // 控制台输出
  const logFn = level === 'error' || level === 'fatal' 
    ? console.error 
    : level === 'warn' 
      ? console.warn 
      : console.log
  logFn('[AppError]', appError)

  // 显示用户提示
  if (showToast) {
    const message = toastMessage || getDefaultErrorMessage(level)
    showErrorToast(message)
  }

  // 上报错误
  if (report && (level === 'error' || level === 'fatal')) {
    reportError(appError)
  }

  return appError
}

/**
 * 获取默认错误提示消息
 */
function getDefaultErrorMessage(level: ErrorLevel): string {
  switch (level) {
    case 'fatal':
      return '系统异常，请稍后重试'
    case 'error':
      return '操作失败，请重试'
    case 'warn':
      return '操作可能未成功，请检查'
    default:
      return '请稍后重试'
  }
}

/**
 * 包装异步函数，自动捕获错误
 * @param fn 异步函数
 * @param errorMessage 错误提示消息
 * @returns 包装后的函数
 */
export function withErrorHandler<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  errorMessage?: string
): (...args: Parameters<T>) => Promise<ReturnType<T> | undefined> {
  return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
    try {
      return await fn(...args) as ReturnType<T>
    } catch (error) {
      handleError(error, {
        toastMessage: errorMessage,
        context: { function: fn.name }
      })
      return undefined
    }
  }
}

/**
 * 创建带错误处理的函数
 * 适用于需要自定义错误处理的场景
 */
export function createSafeFunction<T extends (...args: unknown[]) => unknown>(
  fn: T,
  options: ErrorHandlerOptions = {}
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    try {
      return fn(...args) as ReturnType<T>
    } catch (error) {
      handleError(error, options)
      return undefined
    }
  }
}

/**
 * 初始化全局错误监听
 * 在 App.vue 中调用
 */
export function initGlobalErrorHandler(): void {
  // 监听未处理的 Promise 错误
  uni.onUnhandledRejection?.((res) => {
    handleError(res.reason || '未处理的 Promise 错误', {
      level: 'error',
      context: { type: 'unhandledRejection' }
    })
  })

  // 监听页面错误
  uni.onError?.((err) => {
    handleError(err, {
      level: 'fatal',
      context: { type: 'globalError' }
    })
  })
}

export default {
  handleError,
  showErrorToast,
  showSuccessToast,
  reportError,
  withErrorHandler,
  createSafeFunction,
  initGlobalErrorHandler
}
