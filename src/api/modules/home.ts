/**
 * 首页相关 API
 * 封装首页数据相关的所有接口调用
 */

import http from '../request'
import config from '@/config'
import { homeMockData } from '@/config/mock.config'

/** 首页 Banner */
export interface Banner {
  id: string
  image: string
  title: string
  link: string
}

/** 公告 */
export interface Notice {
  id: string
  title: string
  createTime: string
}

/** 首页数据 */
export interface HomeData {
  banners: Banner[]
  notices: Notice[]
}

/**
 * 获取首页数据
 */
export async function getHomeData(): Promise<HomeData> {
  if (config.api.enableMock) {
    return Promise.resolve({
      banners: [
        { id: '1', image: '/static/banner1.png', title: '物业费减免', link: '/pages/home/index' },
        { id: '2', image: '/static/banner2.png', title: '邀请返利', link: '/package-invite/pages/invite/poster' }
      ],
      notices: [
        { id: '1', title: '系统升级公告', createTime: '2026-02-15' },
        { id: '2', title: '春节活动开始啦', createTime: '2026-02-10' }
      ]
    })
  }
  return http.get<HomeData>('/api/home')
}

/**
 * 获取 Banner 列表
 */
export async function getBanners(): Promise<Banner[]> {
  if (config.api.enableMock) {
    return Promise.resolve([
      { id: '1', image: '/static/banner1.png', title: '物业费减免', link: '/pages/home/index' },
      { id: '2', image: '/static/banner2.png', title: '邀请返利', link: '/package-invite/pages/invite/poster' }
    ])
  }
  return http.get<Banner[]>('/api/banners')
}

/**
 * 获取公告列表
 */
export async function getNotices(): Promise<Notice[]> {
  if (config.api.enableMock) {
    return Promise.resolve([
      { id: '1', title: '系统升级公告', createTime: '2026-02-15' },
      { id: '2', title: '春节活动开始啦', createTime: '2026-02-10' }
    ])
  }
  return http.get<Notice[]>('/api/notices')
}

/**
 * 获取积分展示配置
 * 用于积分数字动画等
 */
export function getPointsConfig() {
  // 这个配置可以来自接口或本地
  return {
    targetPoints: homeMockData.targetPoints,
    animationDuration: 1500
  }
}
