import { http } from '@/api/request'
import config from '@/config'

export interface InviteInfo {
  code: string
  inviteCount: number
  pointsReward: number
  cashReward: number
  rules: string[]
}

export const getInviteInfo = () => {
  if (config.api.enableMock) {
    return Promise.resolve({
      code: 'LMZF888',
      inviteCount: 12,
      pointsReward: 2400,
      cashReward: 120.50,
      rules: [
        '1. 每邀请一位好友注册并认证，奖励 200 积分',
        '2. 好友首次消费，奖励 10% 现金返利',
        '3. 积分可用于抵扣物业费',
        '4. 现金奖励可提现至钱包'
      ]
    } as InviteInfo)
  }
  return http.get<InviteInfo>('/invite/info')
}

export const getPoster = () => {
  if (config.api.enableMock) {
    // 返回一个占位图或本地图片路径
    return Promise.resolve('https://tdesign.gtimg.com/mobile/demos/swiper1.png')
  }
  return http.get<{ url: string }>('/invite/poster').then(res => res.url)
}
