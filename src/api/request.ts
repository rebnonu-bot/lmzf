/**
 * HTTP 请求封装
 * 支持：拦截器、错误处理、Token 刷新、请求取消
 */

import config from '@/config'
import type { ApiResponse, HttpError } from '@/types/api.d'

const { api, storage, isDev } = config

// 请求方法类型
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// 请求配置选项
interface RequestOptions {
  /** 请求方法 */
  method?: RequestMethod
  /** 请求数据 */
  data?: Record<string, any>
  /** 自定义请求头 */
  headers?: Record<string, string>
  /** 是否显示加载提示 */
  showLoading?: boolean
  /** 加载提示文字 */
  loadingText?: string
  /** 是否跳过拦截器 */
  skipInterceptor?: boolean
  /** 超时时间（毫秒） */
  timeout?: number
}

// 请求拦截器
interface RequestInterceptor {
  onBeforeRequest?: (options: any) => any | Promise<any>
  onRequestError?: (error: any) => any | Promise<any>
}

// 响应拦截器
interface ResponseInterceptor {
  onResponse?: (response: any) => any | Promise<any>
  onResponseError?: (error: HttpError) => any | Promise<any>
}

// 拦截器集合
const requestInterceptors: RequestInterceptor[] = []
const responseInterceptors: ResponseInterceptor[] = []

/**
 * 添加请求拦截器
 */
export function addRequestInterceptor(interceptor: RequestInterceptor) {
  requestInterceptors.push(interceptor)
}

/**
 * 添加响应拦截器
 */
export function addResponseInterceptor(interceptor: ResponseInterceptor) {
  responseInterceptors.push(interceptor)
}

/**
 * 获取 Token
 */
function getToken(): string | null {
  try {
    return uni.getStorageSync(storage.tokenKey) || null
  } catch {
    return null
  }
}

/**
 * 处理 HTTP 错误
 */
function handleHttpError(error: HttpError): never {
  const { statusCode, message } = error
  
  // 根据状态码处理不同错误
  switch (statusCode) {
    case 401:
      // Token 失效，清除登录态并跳转登录
      uni.removeStorageSync(storage.tokenKey)
      uni.removeStorageSync(storage.userKey)
      // 发送登录过期事件
      uni.$emit('token:expired')
      throw new Error('登录已过期，请重新登录')
      
    case 403:
      throw new Error('没有权限执行此操作')
      
    case 404:
      throw new Error('请求的资源不存在')
      
    case 500:
    case 502:
    case 503:
      throw new Error('服务器繁忙，请稍后再试')
      
    case 0:
    case -1:
      throw new Error('网络连接失败，请检查网络')
      
    default:
      throw new Error(message || `请求失败(${statusCode})`)
  }
}

/**
 * 统一请求方法
 */
async function request<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    data = {},
    headers = {},
    showLoading = false,
    loadingText = '加载中...',
    timeout = api.timeout,
  } = options

  // 构建完整 URL
  const fullUrl = url.startsWith('http') ? url : `${api.baseUrl}${url}`

  // 构建请求头
  const header: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-App-Version': config.app.version,
    'X-Request-ID': generateRequestId(),
    ...headers,
  }

  // 添加认证 Token
  const token = getToken()
  if (token) {
    header.Authorization = `Bearer ${token}`
  }

  // 显示加载提示
  if (showLoading) {
    uni.showLoading({ title: loadingText, mask: true })
  }

  try {
    // 执行请求前拦截器
    let requestOptions = { url: fullUrl, method, data, header, timeout }
    for (const interceptor of requestInterceptors) {
      if (interceptor.onBeforeRequest) {
        requestOptions = await interceptor.onBeforeRequest(requestOptions)
      }
    }

    // 发送请求
    const response = await new Promise<UniApp.RequestSuccessCallbackResult>(
      (resolve, reject) => {
        uni.request({
          ...requestOptions,
          success: resolve,
          fail: (err) => {
            reject({ statusCode: 0, message: err.errMsg || '网络请求失败' })
          },
        })
      }
    )

    // 隐藏加载提示
    if (showLoading) {
      uni.hideLoading()
    }

    const { statusCode, data: responseData } = response

    // 检查 HTTP 状态码
    if (statusCode < 200 || statusCode >= 300) {
      throw { statusCode, message: 'HTTP Error', data: responseData }
    }

    // 执行业务响应拦截器
    let result = responseData
    for (const interceptor of responseInterceptors) {
      if (interceptor.onResponse) {
        result = await interceptor.onResponse(result)
      }
    }

    // Mock 延迟（开发环境）
    if (api.enableMock && api.mockDelay > 0) {
      await delay(api.mockDelay)
    }

    return result as T

  } catch (error: any) {
    // 隐藏加载提示
    if (showLoading) {
      uni.hideLoading()
    }

    // 执行错误拦截器
    for (const interceptor of responseInterceptors) {
      if (interceptor.onResponseError) {
        const handled = await interceptor.onResponseError(error)
        if (handled) return handled
      }
    }

    // 处理错误
    if (error.statusCode) {
      return handleHttpError(error)
    }
    
    throw error
  }
}

/**
 * 生成请求 ID
 */
function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 延迟函数
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 显示错误提示
 */
function showErrorToast(message: string) {
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000,
  })
}

// ==================== 便捷请求方法 ====================

export const http = {
  /** GET 请求 */
  get<T = any>(url: string, params?: Record<string, any>, options?: Omit<RequestOptions, 'method' | 'data'>) {
    // 构建带查询参数的 URL
    const queryString = params
      ? '?' + Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
          .join('&')
      : ''
    return request<T>(url + queryString, { ...options, method: 'GET' })
  },

  /** POST 请求 */
  post<T = any>(url: string, data?: Record<string, any>, options?: Omit<RequestOptions, 'method' | 'data'>) {
    return request<T>(url, { ...options, method: 'POST', data })
  },

  /** PUT 请求 */
  put<T = any>(url: string, data?: Record<string, any>, options?: Omit<RequestOptions, 'method' | 'data'>) {
    return request<T>(url, { ...options, method: 'PUT', data })
  },

  /** DELETE 请求 */
  delete<T = any>(url: string, params?: Record<string, any>, options?: Omit<RequestOptions, 'method' | 'data'>) {
    const queryString = params
      ? '?' + Object.entries(params)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
          .join('&')
      : ''
    return request<T>(url + queryString, { ...options, method: 'DELETE' })
  },

  /** PATCH 请求 */
  patch<T = any>(url: string, data?: Record<string, any>, options?: Omit<RequestOptions, 'method' | 'data'>) {
    return request<T>(url, { ...options, method: 'PATCH', data })
  },
}

// 默认导出
export default http
