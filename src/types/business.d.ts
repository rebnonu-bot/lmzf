/**
 * 业务类型定义
 */

// 门店信息
export interface StoreInfo {
  id: string
  name: string
  logo?: string
  address: string
  phone?: string
  latitude: number
  longitude: number
  distance?: number
  rating?: number
  businessHours?: string
  tags?: string[]
  images?: string[]
  description?: string
}

// 积分记录
export interface PointsRecord {
  id: string
  type: 'income' | 'expense'
  amount: number
  description: string
  createTime: string
  orderNo?: string
}

// 订单信息
export interface OrderInfo {
  id: string
  orderNo: string
  status: number
  amount: number
  discountAmount?: number
  payAmount: number
  payMethod?: string
  createTime: string
  payTime?: string
  storeId?: string
  storeName?: string
  items?: OrderItem[]
}

// 订单商品
export interface OrderItem {
  id: string
  name: string
  image?: string
  price: number
  quantity: number
  specs?: string
}

// CPS 平台
export interface PlatformInfo {
  id: string
  name: string
  logo: string
  description?: string
  cashbackRate?: string
  miniProgramAppId?: string
  path?: string
  url?: string
  sort?: number
  isHot?: boolean
}

// 邀请信息
export interface InviteInfo {
  inviteCode: string
  inviteCount: number
  totalReward: number
  posterUrl?: string
}

// 首页数据
export interface HomeData {
  points: number
  balance: number
  banners?: BannerInfo[]
  notices?: NoticeInfo[]
  categories?: CategoryInfo[]
}

// 轮播图
export interface BannerInfo {
  id: string
  image: string
  title?: string
  link?: string
  type?: 'page' | 'web' | 'mini'
}

// 公告
export interface NoticeInfo {
  id: string
  title: string
  content?: string
  createTime: string
}

// 分类
export interface CategoryInfo {
  id: string
  name: string
  icon: string
  link?: string
}
