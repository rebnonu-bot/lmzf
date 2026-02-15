/**
 * 全局类型声明
 */

import { ComponentInternalInstance } from 'vue'

// 扩展 UniApp 类型
declare module '@dcloudio/types' {
  interface Uni {
    /**
     * 全局事件总线
     */
    $on(eventName: string, callback: (...args: any[]) => void): void
    $off(eventName?: string, callback?: (...args: any[]) => void): void
    $emit(eventName: string, ...args: any[]): void
    $once(eventName: string, callback: (...args: any[]) => void): void
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
