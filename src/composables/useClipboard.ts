/**
 * 剪贴板操作组合式函数
 * 提供复制文本到剪贴板的功能
 */

import { useLoading } from './useLoading'

export interface UseClipboardOptions {
  /** 复制成功提示文字 */
  successMsg?: string
  /** 是否显示加载状态 */
  showLoading?: boolean
}

/**
 * 使用剪贴板
 * @example
 * ```ts
 * const { copy, copying } = useClipboard()
 * await copy('要复制的文本')
 * ```
 */
export function useClipboard(options: UseClipboardOptions = {}) {
  const { successMsg = '复制成功', showLoading = false } = options
  const { loading: copying, showLoading: show, hideLoading: hide } = useLoading()

  /**
   * 复制文本到剪贴板
   * @param data 要复制的文本
   * @param customMsg 自定义成功提示（可选）
   */
  const copy = async (data: string, customMsg?: string): Promise<boolean> => {
    if (!data) {
      uni.showToast({ title: '复制内容为空', icon: 'none' })
      return false
    }

    if (showLoading) show('复制中...')

    try {
      await uni.setClipboardData({ data })
      uni.showToast({ 
        title: customMsg || successMsg, 
        icon: 'success',
        duration: 1500
      })
      return true
    } catch (error) {
      console.error('复制失败:', error)
      uni.showToast({ title: '复制失败', icon: 'none' })
      return false
    } finally {
      if (showLoading) hide()
    }
  }

  return {
    copy,
    copying
  }
}

export default useClipboard
