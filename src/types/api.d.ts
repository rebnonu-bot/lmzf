/**
 * API 类型定义
 */

// 通用响应结构
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp?: number
}

// 分页请求参数
export interface PageParams {
  page?: number
  pageSize?: number
}

// 分页响应结构
export interface PageResult<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// 用户等级
export type UserLevel = 'copper' | 'silver' | 'gold'

// 用户信息
export interface UserInfo {
  id: string
  nickname: string
  avatar?: string
  phone?: string
  points?: number
  balance?: number
  /** 用户等级 */
  level?: UserLevel
  /** 柠檬币数量 */
  coins?: number
  /** 优惠券数量 */
  coupons?: number
  /** 加入天数 */
  joinDays?: number
  /** 邀请人数 */
  inviteCount?: number
  /** 柠檬币标签 */
  coinLabel?: string
  /** 是否已绑定房产 */
  hasHouse?: boolean
}

// 城市信息
export interface CityInfo {
  code: string
  name: string
  province?: string
  pinyin?: string
}

// 登录参数
export interface LoginParams {
  code: string
  encryptedData?: string
  iv?: string
}

// 登录响应
export interface LoginResult {
  token: string
  refreshToken: string
  expiresIn: number
  userInfo: UserInfo
}

// HTTP 错误
export interface HttpError {
  statusCode: number
  message: string
  data?: any
}
