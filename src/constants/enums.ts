/**
 * 枚举常量定义
 */

// 订单状态
export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

// 支付状态
export enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  PARTIAL = 'partial',
  REFUNDED = 'refunded',
}

// 支付方式
export enum PaymentMethod {
  WECHAT = 'wechat',
  ALIPAY = 'alipay',
  UNIONPAY = 'unionpay',
  BALANCE = 'balance',
}

// 用户等级
export enum UserLevel {
  NORMAL = 1,
  VIP = 2,
  SVIP = 3,
}

// 页面路径枚举（用于跳转，避免硬编码）
export enum PagePath {
  HOME = '/pages/home/index',
  MY = '/pages/my/index',
  SCAN = '/pages/scan/index',
  CITY_SELECT = '/pages/city-select/index',
  STORES = '/package-store/pages/stores/index',
  PLATFORMS = '/package-platform/pages/platforms/index',
  INVITE_POSTER = '/package-invite/pages/invite/poster',
  WEBVIEW = '/package-webview/pages/webview/index',
}

// 存储键名枚举
export enum StorageKey {
  TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  USER_INFO = 'user_info',
  CITY = 'selected_city',
  SEARCH_HISTORY = 'search_history',
  SETTINGS = 'app_settings',
}

// 事件名称枚举
export enum EventName {
  TOKEN_EXPIRED = 'token:expired',
  LOGIN_SUCCESS = 'login:success',
  LOGOUT = 'logout',
  CITY_CHANGE = 'city:change',
  PAY_SUCCESS = 'pay:success',
}

// HTTP 状态码
export enum HttpCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

// 业务状态码
export enum BusinessCode {
  SUCCESS = 0,
  ERROR = 1,
  TOKEN_EXPIRED = 1001,
  TOKEN_INVALID = 1002,
  PARAM_ERROR = 2001,
  NOT_FOUND = 3001,
  SYSTEM_ERROR = 5001,
}
