/**
 * 错误处理组合式函数
 * 在 Vue 组件中统一处理错误
 */

import { ref } from 'vue'
import {
  handleError,
  showErrorToast,
  showSuccessToast,
  createSafeFunction,
  type ErrorHandlerOptions,
  type ErrorLevel
} from '@/utils/errorHandler'

export interface UseErrorHandlerOptions {
  /** 默认错误提示 */
  defaultErrorMessage?: string
  /** 是否自动上报 */
  autoReport?: boolean
  /** 组件名称（用于错误定位） */
  componentName?: string
}

/**
 * 使用错误处理
 * @example
 * ```ts
 * const { error, handle, wrap, clear } = useErrorHandler({ componentName: 'MyPage' })
 * 
 * // 直接处理错误
 * handle('发生错误')
 * 
 * // 包装异步函数
 * const fetchData = wrap(async () => {
 *   return await api.getData()
 * })
 * ```
 */
export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const { 
    defaultErrorMessage = '操作失败', 
    autoReport = true,
    componentName 
  } = options

  // 当前错误状态
  const error = ref<string | null>(null)
  const errorLevel = ref<ErrorLevel>('error')
  const loading = ref(false)

  /**
   * 处理错误
   */
  const handle = (err: unknown, opts: ErrorHandlerOptions = {}) => {
    error.value = err instanceof Error ? err.message : String(err)
    errorLevel.value = opts.level || 'error'
    
    return handleError(err, {
      showToast: true,
      toastMessage: defaultErrorMessage,
      report: autoReport,
      ...opts,
      context: {
        component: componentName,
        ...opts.context
      }
    })
  }

  /**
   * 清除错误状态
   */
  const clear = () => {
    error.value = null
    errorLevel.value = 'error'
  }

  /**
   * 包装异步函数
   */
  const wrap = <T extends (...args: unknown[]) => Promise<unknown>>(
    fn: T,
    opts: ErrorHandlerOptions = {}
  ) => {
    return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
      loading.value = true
      clear()
      
      try {
        const result = await fn(...args)
        return result as ReturnType<T>
      } catch (err) {
        handle(err, opts)
        return undefined
      } finally {
        loading.value = false
      }
    }
  }

  /**
   * 安全执行（同步）
   */
  const safe = <T extends (...args: unknown[]) => unknown>(
    fn: T,
    opts: ErrorHandlerOptions = {}
  ) => {
    return createSafeFunction(fn, {
      ...opts,
      context: {
        component: componentName,
        ...opts.context
      }
    })
  }

  /**
   * 显示成功提示
   */
  const success = (message: string) => {
    showSuccessToast(message)
    clear()
  }

  /**
   * 显示错误提示（不记录错误）
   */
  const toast = (message: string) => {
    showErrorToast(message)
  }

  return {
    // 状态
    error,
    errorLevel,
    loading,
    // 方法
    handle,
    clear,
    wrap,
    safe,
    success,
    toast
  }
}

export default useErrorHandler
