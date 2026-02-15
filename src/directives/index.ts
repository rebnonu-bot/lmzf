/**
 * 指令统一导出
 */

import lazyLoad from './lazyLoad'
export { preloadImages, clearImageCache } from './lazyLoad'
export type { LazyOptions } from './lazyLoad'
export { lazyLoad }

// 所有指令
export const directives = {
  lazy: lazyLoad,
}

/**
 * 注册所有指令
 * @param app Vue 应用实例
 */
export function registerDirectives(app: any) {
  Object.entries(directives).forEach(([name, directive]) => {
    app.directive(name, directive)
  })
}

export default directives
