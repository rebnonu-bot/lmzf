/**
 * 全局类型声明
 */

import { ComponentInternalInstance } from 'vue'

// 全局数据类型
export interface GlobalData {
  userInfo: {
    id: string
    nickname: string
    avatar: string
    level: string
  } | null
}

// 事件总线类型
export interface EventBus {
  events: Record<string, Array<(...args: unknown[]) => void>>
  on: (event: string, callback: (...args: unknown[]) => void) => void
  off: (event: string, callback?: (...args: unknown[]) => void) => void
  emit: (event: string, ...args: unknown[]) => void
}

// 滚动事件类型
export interface ScrollEvent {
  detail: {
    scrollLeft: number
    scrollTop: number
    scrollHeight: number
    scrollWidth: number
  }
}

declare global {
  // 扩展 UniApp 类型
  interface Uni {
    /**
     * 全局数据
     */
    $globalData: GlobalData
    /**
     * 全局事件总线
     */
    $eventBus: EventBus
    /**
     * 全局事件监听
     */
    $on(eventName: string, callback: (...args: unknown[]) => void): void
    $off(eventName?: string, callback?: (...args: unknown[]) => void): void
    $emit(eventName: string, ...args: unknown[]): void
    $once(eventName: string, callback: (...args: unknown[]) => void): void
  }
}

// 扩展 Vue 实例属性
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // 可以在这里添加全局属性
  }
}

// 全局变量
declare const uni: UniNamespace.Uni

// 图片模块声明
declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

// CSS 模块声明
declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

export {}
