/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, unknown>
  export default component
}

// Vite 环境变量类型扩展
interface ImportMetaEnv {
  readonly MODE: 'development' | 'production' | 'test'
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
