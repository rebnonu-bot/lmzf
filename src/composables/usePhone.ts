/**
 * 电话拨打组合式函数
 * 提供拨打电话和验证手机号功能
 */

import { useLoading } from './useLoading'

export interface UsePhoneOptions {
  /** 是否显示加载状态 */
  showLoading?: boolean
}

/**
 * 验证手机号格式
 * @param phone 手机号
 */
export function isValidPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 格式化手机号（添加空格分隔）
 * @param phone 手机号
 */
export function formatPhone(phone: string): string {
  if (!isValidPhone(phone)) return phone
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
}

/**
 * 使用电话功能
 * @example
 * ```ts
 * const { call, validate } = usePhone()
 * await call('400-888-8888')
 * ```
 */
export function usePhone(options: UsePhoneOptions = {}) {
  const { showLoading = false } = options
  const { loading: calling, showLoading: show, hideLoading: hide } = useLoading()

  /**
   * 拨打电话
   * @param phoneNumber 电话号码
   * @param validateFormat 是否验证手机号格式（默认不验证，支持座机）
   */
  const call = async (
    phoneNumber: string, 
    validateFormat = false
  ): Promise<boolean> => {
    if (!phoneNumber) {
      uni.showToast({ title: '电话号码为空', icon: 'none' })
      return false
    }

    // 清理号码中的非数字和横线
    const cleanNumber = phoneNumber.replace(/\s/g, '').replace(/-/g, '')

    if (validateFormat && !isValidPhone(cleanNumber)) {
      uni.showToast({ title: '手机号格式不正确', icon: 'none' })
      return false
    }

    if (showLoading) show('正在拨打...')

    try {
      await uni.makePhoneCall({ phoneNumber: cleanNumber })
      return true
    } catch (error) {
      // 用户取消拨打也会进入这里，不做错误提示
      console.log('拨打取消或失败:', error)
      return false
    } finally {
      if (showLoading) hide()
    }
  }

  return {
    call,
    calling,
    isValidPhone,
    formatPhone
  }
}

export default usePhone
