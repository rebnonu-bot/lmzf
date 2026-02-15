/**
 * 常量统一导出
 */

export * from './enums'

// 默认分页参数
export const DEFAULT_PAGE_PARAMS = {
  page: 1,
  pageSize: 20,
}

// 最大分页大小
export const MAX_PAGE_SIZE = 100

// 正则表达式
export const REGEX = {
  // 手机号
  PHONE: /^1[3-9]\d{9}$/,
  // 邮箱
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  // 身份证号
  ID_CARD: /^\d{17}[\dXx]$|^\d{15}$/,
  // 金额（最多两位小数）
  AMOUNT: /^\d+(\.\d{1,2})?$/,
  // 验证码（6位数字）
  CODE: /^\d{6}$/,
}

// 时间常量
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
}

// 文件大小限制
export const FILE_SIZE = {
  KB: 1024,
  MB: 1024 * 1024,
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILE_SIZE: 50 * 1024 * 1024,  // 50MB
}
