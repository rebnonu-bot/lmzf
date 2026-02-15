/**
 * 图片懒加载指令
 * 使用 IntersectionObserver 实现
 */

import type { Directive, DirectiveBinding } from 'vue'

interface LazyOptions {
  /** 图片 URL */
  src?: string
  /** 占位图 URL */
  placeholder?: string
  /** 错误时显示的图片 */
  error?: string
  /** 根边距，提前加载 */
  rootMargin?: string
  /** 阈值 */
  threshold?: number
}

// 图片加载状态
const imageCache = new Set<string>()

// 默认配置（不含 src，因为 src 是必填的）
const defaultOptions: Required<Omit<LazyOptions, 'src'>> = {
  placeholder: '/static/placeholder.png',
  error: '/static/error.png',
  rootMargin: '50px',
  threshold: 0,
}

// IntersectionObserver 实例
let observer: IntersectionObserver | null = null

/**
 * 创建观察器
 */
function createObserver(options: LazyOptions): IntersectionObserver {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          loadImage(img)
          observer?.unobserve(img)
        }
      })
    },
    {
      rootMargin: options.rootMargin || defaultOptions.rootMargin,
      threshold: options.threshold ?? defaultOptions.threshold,
    }
  )

  return observer
}

/**
 * 加载图片
 */
function loadImage(img: HTMLImageElement): void {
  const src = img.dataset.src
  if (!src) return

  // 如果已缓存，直接显示
  if (imageCache.has(src)) {
    img.src = src
    img.classList.add('lazy-loaded')
    return
  }

  // 创建新图片对象预加载
  const image = new Image()
  
  image.onload = () => {
    img.src = src
    img.classList.add('lazy-loaded')
    imageCache.add(src)
  }
  
  image.onerror = () => {
    img.src = img.dataset.error || defaultOptions.error
    img.classList.add('lazy-error')
  }
  
  image.src = src
}

/**
 * 懒加载指令
 * @example
 * <image v-lazy="imageUrl" />
 * <image v-lazy="{ src: imageUrl, placeholder: '/static/loading.png' }" />
 */
const lazyLoad: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | LazyOptions>) {
    // 只处理 image 标签
    if (el.tagName !== 'IMAGE' && el.tagName !== 'IMG') {
      console.warn('[v-lazy] Directive should be used on image element')
      return
    }

    const img = el as HTMLImageElement
    const options = typeof binding.value === 'string' 
      ? { ...defaultOptions } 
      : { ...defaultOptions, ...binding.value }
    
    const src = typeof binding.value === 'string' ? binding.value : binding.value?.src

    if (!src) {
      console.warn('[v-lazy] Image src is required')
      return
    }

    // 保存配置
    img.dataset.src = src
    img.dataset.error = options.error

    // 显示占位图
    img.src = options.placeholder

    // 添加加载样式
    img.classList.add('lazy-loading')

    // 使用原生 loading="lazy" 作为降级方案
    if ('loading' in HTMLImageElement.prototype) {
      img.loading = 'lazy'
    }

    // 使用 IntersectionObserver
    const obs = createObserver(options)
    obs.observe(img)
  },

  updated(el: HTMLElement, binding: DirectiveBinding<string | LazyOptions>) {
    const img = el as HTMLImageElement
    const newSrc = typeof binding.value === 'string' ? binding.value : binding.value?.src
    
    if (newSrc && newSrc !== img.dataset.src) {
      img.dataset.src = newSrc
      img.classList.remove('lazy-loaded')
      img.classList.add('lazy-loading')
      img.src = (typeof binding.value === 'string' ? defaultOptions.placeholder : binding.value?.placeholder) || defaultOptions.placeholder
      
      const obs = createObserver(typeof binding.value === 'object' ? binding.value : {})
      obs.observe(img)
    }
  },

  unmounted(el: HTMLElement) {
    observer?.unobserve(el)
  },
}

/**
 * 批量预加载图片
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map((url) => {
      return new Promise<void>((resolve) => {
        if (imageCache.has(url)) {
          resolve()
          return
        }
        
        const img = new Image()
        img.onload = () => {
          imageCache.add(url)
          resolve()
        }
        img.onerror = () => resolve()
        img.src = url
      })
    })
  )
}

/**
 * 清除图片缓存
 */
export function clearImageCache(): void {
  imageCache.clear()
}

export default lazyLoad
export type { LazyOptions }
