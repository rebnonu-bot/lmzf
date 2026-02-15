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
    nickname: '梅菜扣肉',
    avatar: '/static/avatar1.png',
    level: 'gold',
    coins: 1250,
    coinLabel: '柠檬币',
    coupons: 3,
    joinDays: 12,
    inviteCount: 8,
  } as Partial<UserInfo>,
  
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
