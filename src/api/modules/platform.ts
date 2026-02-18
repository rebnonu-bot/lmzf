import { http } from '@/api/request'
import config from '@/config'

export interface Platform {
  id: string
  name: string
  icon: string
  bgColor: string
  rebate: string
  url: string
  miniProgram?: string
  category: string
}

export interface PlatformCategory {
  name: string
  platforms: Platform[]
}

/**
 * 获取电商平台列表
 */
export async function getPlatformList(): Promise<PlatformCategory[]> {
  if (config.api.enableMock) {
    const categories: PlatformCategory[] = [
      {
        name: '综合电商',
        platforms: [
          { id: '1', name: '京东', icon: 'JD', bgColor: '#E4393C', rebate: '返5%', url: 'https://www.jd.com', miniProgram: 'wx91d27dbf599dff74', category: '综合电商' },
          { id: '2', name: '淘宝', icon: 'TB', bgColor: '#FF5000', rebate: '返3%', url: 'https://www.taobao.com', category: '综合电商' },
          { id: '3', name: '拼多多', icon: 'PDD', bgColor: '#E02E24', rebate: '返2%', url: 'https://www.pinduoduo.com', miniProgram: 'wx32540bd863b27570', category: '综合电商' },
          { id: '4', name: '苏宁', icon: 'SN', bgColor: '#FF6600', rebate: '返4%', url: 'https://www.suning.com', category: '综合电商' }
        ]
      },
      {
        name: '生活服务',
        platforms: [
          { id: '5', name: '美团', icon: 'MT', bgColor: '#FFC300', rebate: '返3%', url: 'https://www.meituan.com', miniProgram: 'wxde8ac0a21135c07d', category: '生活服务' },
          { id: '6', name: '饿了么', icon: 'ELM', bgColor: '#0085FF', rebate: '返2%', url: 'https://www.ele.me', miniProgram: 'wxece3a9a4c82f58c9', category: '生活服务' },
          { id: '7', name: '滴滴', icon: 'DD', bgColor: '#FF7D00', rebate: '返2%', url: 'https://www.didiglobal.com', miniProgram: 'wxaf35009675aa0b2a', category: '生活服务' },
          { id: '8', name: '猫眼', icon: 'MY', bgColor: '#EF4239', rebate: '返5%', url: 'https://www.maoyan.com', category: '生活服务' }
        ]
      },
      {
        name: '图书文娱',
        platforms: [
          { id: '9', name: '当当', icon: 'DD', bgColor: '#FF2832', rebate: '返4%', url: 'https://www.dangdang.com', category: '图书文娱' },
          { id: '10', name: '严选', icon: 'YX', bgColor: '#B4A078', rebate: '返3%', url: 'https://you.163.com', miniProgram: 'wx5d5e7705d5f5d5e5', category: '图书文娱' }
        ]
      }
    ];

    return Promise.resolve(categories);
  }
  return http.get('/platforms');
}
