/// <reference types="vitest/globals" />
/// <reference types="@vue/test-utils" />

import type { ComponentPublicInstance } from 'vue'

declare global {
  // Vitest 全局函数
  const describe: typeof import('vitest').describe
  const it: typeof import('vitest').it
  const expect: typeof import('vitest').expect
  const vi: typeof import('vitest').vi
  const beforeEach: typeof import('vitest').beforeEach
  const afterEach: typeof import('vitest').afterEach
  const beforeAll: typeof import('vitest').beforeAll
  const afterAll: typeof import('vitest').afterAll

  // 扩展 Vue 组件类型
  export declare type VueWrapper<T extends ComponentPublicInstance> = import('@vue/test-utils').VueWrapper<T>
}

export {}
