/**
 * 事件总线
 * 类型安全的发布订阅模式实现
 */

export interface EventBus {
  events: Record<string, Array<(...args: unknown[]) => void>>
  on: (event: string, callback: (...args: unknown[]) => void) => void
  off: (event: string, callback?: (...args: unknown[]) => void) => void
  emit: (event: string, ...args: unknown[]) => void
}

/**
 * 创建事件总线实例
 */
export default function createBus(): EventBus {
  return {
    events: {},
    on(event: string, callback: (...args: unknown[]) => void) {
      if (!this.events[event]) this.events[event] = []
      this.events[event]!.push(callback)
    },
    off(event: string, callback?: (...args: unknown[]) => void) {
      if (!this.events[event]) return
      if (!callback) this.events[event] = []
      else {
        const index = this.events[event]!.indexOf(callback)
        if (index !== -1) this.events[event]!.splice(index, 1)
      }
    },
    emit(event: string, ...args: unknown[]) {
      if (this.events[event]) {
        this.events[event]!.forEach((callback) => callback(...args))
      }
    },
  }
}
