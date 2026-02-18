/**
 * Mock 数据配置
 * 开发环境使用的模拟数据
 */

import type { UserInfo } from '@/types/api.d'

// 首页模拟数据
export const homeMockData = {
  // 目标积分（用于动画展示）
  targetPoints: 12993,
  
  // 用户信息
  userInfo: {
    id: '1',
    nickname: '梅菜扣肉',
    avatar: '/static/avatar1.png',
    phone: '13800138000',
    points: 12993,
    balance: 129.93,
    level: 'gold',
    coins: 1250,
    coinLabel: '柠檬币',
    coupons: 3,
    joinDays: 12,
    inviteCount: 8,
    hasHouse: false,
  } as UserInfo,
  
  // 等级配置
  levelConfig: {
    copper: {
      name: '铜牌推广者',
      bg: 'linear-gradient(135deg, #A16207, #78350F)',
      color: '#FEF3C7',
      tagColor: '#A16207',
    },
    silver: {
      name: '银牌推广者',
      bg: 'linear-gradient(135deg, #64748B, #334155)',
      color: '#F1F5F9',
      tagColor: '#64748B',
    },
    gold: {
      name: '金牌推广者',
      bg: 'linear-gradient(135deg, #F59E0B, #D97706)',
      color: '#FFFBEB',
      tagColor: '#D97706',
    },
  } as const,
  
  // 合作伙伴信息
  partners: {
    lmzj: { name: '邻檬智家', desc: '智慧社区服务提供商，致力于打造便民生活服务平台' },
    allinpay: { name: '通联支付', desc: '拥有央行支付牌照，提供安全稳定的支付通道服务' },
    psbc: { name: '邮储银行', desc: '国有大型商业银行，为资金提供托管保障' },
  } as const,
  
  // 柠檬币交易记录 (为了匹配余额 1250，我们假设有一笔较大的初始收入或历史积累)
  coinTransactions: [
    { id: '1', title: '邀请好友奖励', time: '2026-02-18 10:30', amount: 50, type: 'income' },
    { id: '2', title: '兑换优惠券', time: '2026-02-17 15:20', amount: -100, type: 'expense' },
    { id: '3', title: '每日签到', time: '2026-02-17 09:00', amount: 10, type: 'income' },
    { id: '4', title: '参与活动奖励', time: '2026-02-16 14:00', amount: 200, type: 'income' },
    { id: '5', title: '完善个人信息', time: '2026-02-15 11:20', amount: 30, type: 'income' },
    { id: '6', title: '系统赠送', time: '2026-02-01 00:00', amount: 1060, type: 'income' },
  ],

  // 优惠券数据
  coupons: [
    {
      id: '1',
      name: '邻檬智家超市 50元代金券',
      amount: 50,
      type: 'cash', // cash: 代金券, discount: 折扣券
      minSpend: 200, // 满200可用
      status: 'unused', // unused: 未使用, used: 已使用, expired: 已过期
      validStartTime: '2026-02-01',
      validEndTime: '2026-03-31',
      description: '全场通用，不与其它优惠同享',
      storeName: '邻檬智家超市'
    },
    {
      id: '2',
      name: '社区家政服务 8折券',
      amount: 0.8,
      type: 'discount',
      minSpend: 0,
      status: 'unused',
      validStartTime: '2026-02-15',
      validEndTime: '2026-02-28',
      description: '仅限保洁服务使用',
      storeName: '邻檬到家'
    },
    {
      id: '3',
      name: '周边餐饮 10元红包',
      amount: 10,
      type: 'cash',
      minSpend: 30,
      status: 'used',
      validStartTime: '2026-01-01',
      validEndTime: '2026-01-31',
      description: '仅限合作餐饮商户',
      storeName: '味美轩餐饮'
    },
    {
      id: '4',
      name: '洗车服务 免费体验券',
      amount: 0,
      type: 'free', // free: 免费券
      minSpend: 0,
      status: 'expired',
      validStartTime: '2025-12-01',
      validEndTime: '2025-12-31',
      description: '标准洗车一次',
      storeName: '洁净洗车行'
    }
  ],

  // 待缴账单
  bills: [
    {
      id: 'B202602001',
      title: '2026年2月物业管理费',
      amount: 280.00,
      month: '2026-02',
      type: 'property', // property: 物业费, parking: 车位费, water: 水费, electricity: 电费
      status: 'unpaid',
      deadline: '2026-02-28',
      desc: '含公共区域维护、清洁、绿化费用'
    },
    {
      id: 'B202602002',
      title: '2026年2月车位管理费',
      amount: 80.00,
      month: '2026-02',
      type: 'parking',
      status: 'unpaid',
      deadline: '2026-02-28',
      desc: '地下车位 B-102'
    },
    {
      id: 'B202601003',
      title: '2026年1月公摊水电费',
      amount: 45.50,
      month: '2026-01',
      type: 'water',
      status: 'unpaid',
      deadline: '2026-01-31',
      desc: '电梯及公共照明分摊'
    }
  ],

  // 客服信息
  contact: {
    wechat: 'lingmeng2024',
    phone: '400-888-8888',
    workTime: '周一至周日 9:00-21:00',
  },
}

// 我的页面模拟数据
export const myMockData = {
  version: '1.0.0',
}
