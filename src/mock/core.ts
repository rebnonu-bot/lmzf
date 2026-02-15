/**
 * Mock 核心系统
 * 支持 RESTful 路径、HTTP 方法匹配、动态延迟
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface MockHandler {
  /** 响应数据或生成函数 */
  response: ((params: MockContext) => MockResponse | Promise<MockResponse>) | MockResponse
  /** 延迟时间（毫秒） */
  delay?: number | [number, number]
  /** 是否启用 */
  enabled?: boolean
}

export interface MockContext {
  /** 请求 URL */
  url: string
  /** 请求方法 */
  method: HttpMethod
  /** 路径参数 */
  params: Record<string, string>
  /** 查询参数 */
  query: Record<string, string>
  /** 请求体 */
  body?: any
  /** 请求头 */
  headers?: Record<string, string>
}

export interface MockResponse {
  code: number
  message: string
  data?: any
  [key: string]: any
}

// Mock 规则存储: Map<method:path, MockHandler>
const mockRules = new Map<string, MockHandler>()

// 路径参数正则缓存
const pathRegexCache = new Map<string, { regex: RegExp; paramNames: string[] }>()

/**
 * 编译路径为正则表达式
 * @example /api/user/:id -> /^\/api\/user\/([^/]+)$/ 
 */
function compilePath(path: string): { regex: RegExp; paramNames: string[] } {
  if (pathRegexCache.has(path)) {
    return pathRegexCache.get(path)!
  }

  const paramNames: string[] = []
  // 将 :param 替换为捕获组
  const regexStr = path.replace(/:([^/]+)/g, (_, name) => {
    paramNames.push(name)
    return '([^/]+)'
  })
  
  const regex = new RegExp(`^${regexStr}$`)
  const result = { regex, paramNames }
  pathRegexCache.set(path, result)
  return result
}

/**
 * 解析查询字符串
 */
function parseQuery(url: string): Record<string, string> {
  const query: Record<string, string> = {}
  const queryIndex = url.indexOf('?')
  if (queryIndex === -1) return query
  
  const queryStr = url.slice(queryIndex + 1)
  const pairs = queryStr.split('&')
  
  for (const pair of pairs) {
    const [key, value] = pair.split('=').map(decodeURIComponent)
    if (key) query[key] = value || ''
  }
  
  return query
}

/**
 * 提取路径
 */
function extractPath(url: string): string {
  // 移除协议和域名
  const pathMatch = url.match(/^(?:https?:\/\/[^/]+)?(\/[^?]*)/)
  return pathMatch?.[1] ?? url.split('?')[0]!
}

/**
 * 生成延迟时间
 */
function generateDelay(delay: MockHandler['delay']): number {
  if (!delay) return 300
  if (typeof delay === 'number') return delay
  if (Array.isArray(delay)) {
    const [min, max] = delay
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  return 300
}

/**
 * 匹配 Mock 规则
 */
function matchRule(method: HttpMethod, url: string): { handler: MockHandler; params: Record<string, string> } | null {
  const path = extractPath(url)
  
  for (const [key, handler] of mockRules) {
    if (!handler.enabled && handler.enabled !== undefined) continue
    
    const [ruleMethod, rulePath] = key.split(':')
    if (ruleMethod && ruleMethod !== method) continue
    
    const { regex, paramNames } = compilePath(rulePath || key)
    const match = path.match(regex)
    
    if (match) {
      const params: Record<string, string> = {}
      paramNames.forEach((name, index) => {
        const value = match[index + 1]
        if (value !== undefined) {
          params[name] = value
        }
      })
      return { handler, params }
    }
  }
  
  return null
}

/**
 * 注册 Mock 规则
 * @param method HTTP 方法或完整键名
 * @param path 路径（支持 :param 参数）
 * @param handler Mock 处理器
 * 
 * @example
 * register('GET', '/api/user/:id', { response: { code: 200, data: {} } })
 * register('POST', '/api/login', { 
 *   response: (ctx) => ({ code: 200, data: { token: 'xxx' } }),
 *   delay: [100, 500] // 随机延迟 100-500ms
 * })
 */
export function register(
  method: HttpMethod | string,
  path: string,
  handler: MockHandler
): void {
  const key = `${method}:${path}`
  mockRules.set(key, { enabled: true, ...handler })
}

/**
 * 注册 RESTful 资源
 * @param basePath 基础路径
 * @param resource 资源处理器
 * 
 * @example
 * registerResource('/api/users', {
 *   index: () => ({ list: [] }),    // GET /api/users
 *   show: (ctx) => ({ id: ctx.params.id }), // GET /api/users/:id
 *   create: (ctx) => ctx.body,      // POST /api/users
 *   update: (ctx) => ctx.body,      // PUT /api/users/:id
 *   destroy: () => ({ success: true }) // DELETE /api/users/:id
 * })
 */
export interface ResourceHandlers {
  index?: (ctx: MockContext) => MockResponse | Promise<MockResponse>
  show?: (ctx: MockContext) => MockResponse | Promise<MockResponse>
  create?: (ctx: MockContext) => MockResponse | Promise<MockResponse>
  update?: (ctx: MockContext) => MockResponse | Promise<MockResponse>
  destroy?: (ctx: MockContext) => MockResponse | Promise<MockResponse>
}

export function registerResource(basePath: string, resource: ResourceHandlers): void {
  if (resource.index) {
    register('GET', basePath, { response: resource.index })
  }
  if (resource.show) {
    register('GET', `${basePath}/:id`, { response: resource.show })
  }
  if (resource.create) {
    register('POST', basePath, { response: resource.create })
  }
  if (resource.update) {
    register('PUT', `${basePath}/:id`, { response: resource.update })
    register('PATCH', `${basePath}/:id`, { response: resource.update })
  }
  if (resource.destroy) {
    register('DELETE', `${basePath}/:id`, { response: resource.destroy })
  }
}

/**
 * 启用/禁用 Mock 规则
 */
export function setEnabled(key: string, enabled: boolean): void {
  const rule = mockRules.get(key)
  if (rule) {
    rule.enabled = enabled
  }
}

/**
 * 清除所有规则
 */
export function clear(): void {
  mockRules.clear()
  pathRegexCache.clear()
}

/**
 * 获取所有规则
 */
export function getRules(): Map<string, MockHandler> {
  return new Map(mockRules)
}

/**
 * 创建 Mock 响应
 */
async function createMockResponse(
  handler: MockHandler,
  context: MockContext
): Promise<MockResponse> {
  if (typeof handler.response === 'function') {
    return await handler.response(context)
  }
  return handler.response
}

/**
 * 执行 Mock 请求
 */
export async function executeMock(
  method: HttpMethod,
  url: string,
  options: {
    data?: any
    header?: Record<string, string>
  } = {}
): Promise<{ response: MockResponse; delay: number } | null> {
  const match = matchRule(method, url)
  if (!match) return null
  
  const { handler, params } = match
  const query = parseQuery(url)
  
  const context: MockContext = {
    url,
    method,
    params,
    query,
    body: options.data,
    headers: options.header,
  }
  
  const delay = generateDelay(handler.delay)
  const response = await createMockResponse(handler, context)
  
  return { response, delay }
}

/**
 * 初始化 Mock 拦截器
 */
export function initMockInterceptor(): void {
  const originalRequest = uni.request
  
  // @ts-ignore
  uni.request = function (options: UniApp.RequestOptions): UniApp.RequestTask {
    const method = (options.method?.toUpperCase() || 'GET') as HttpMethod
    const url = options.url || ''
    
    // 创建任务对象（使用类型断言满足接口要求）
    const task: UniApp.RequestTask = {
      abort: () => {},
      onHeadersReceived: () => task,
      offHeadersReceived: () => task,
    }
    
    executeMock(method, url, {
      data: options.data,
      header: options.header as Record<string, string>,
    }).then((result) => {
      if (result) {
        // 使用 Mock 数据
        setTimeout(() => {
          if (options.success) {
            options.success({
              data: result.response,
              statusCode: 200,
              header: {},
              cookies: [],
              errMsg: 'request:ok',
            } as UniApp.RequestSuccessCallbackResult)
          }
          if (options.complete) {
            options.complete({} as any)
          }
        }, result.delay)
      } else {
        // 没有匹配的规则，调用原始请求
        const originalTask = (originalRequest(options) as unknown) as UniApp.RequestTask
        task.abort = originalTask.abort.bind(originalTask)
      }
    })
    
    return task
  }
}
