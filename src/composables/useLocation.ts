/**
 * 定位相关组合式函数
 */

import { ref } from 'vue'
import config from '@/config'

export interface LocationInfo {
  latitude: number
  longitude: number
  city?: string
  cityCode?: string
  address?: string
}

/**
 * 使用定位
 */
export function useLocation() {
  const location = ref<LocationInfo | null>(null)
  const loading = ref(false)
  const error = ref<string>('')

  /**
   * 获取当前位置
   */
  const getCurrentLocation = (): Promise<LocationInfo> => {
    return new Promise((resolve, reject) => {
      loading.value = true
      error.value = ''

      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          const loc: LocationInfo = {
            latitude: res.latitude,
            longitude: res.longitude,
          }
          location.value = loc
          resolve(loc)
        },
        fail: (err) => {
          error.value = err.errMsg || '获取位置失败'
          reject(err)
        },
        complete: () => {
          loading.value = false
        },
      })
    })
  }

  /**
   * 选择位置
   */
  const chooseLocation = (): Promise<LocationInfo> => {
    return new Promise((resolve, reject) => {
      uni.chooseLocation({
        success: (res) => {
          const loc: LocationInfo = {
            latitude: res.latitude,
            longitude: res.longitude,
            address: res.address,
            city: res.name,
          }
          location.value = loc
          resolve(loc)
        },
        fail: reject,
      })
    })
  }

  /**
   * 逆地理编码（坐标转地址）
   */
  const reverseGeocode = (lat: number, lng: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      // 这里可以接入腾讯地图或高德地图 SDK
      // 示例使用腾讯地图
      uni.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/`,
        data: {
          location: `${lat},${lng}`,
          key: 'YOUR_TENCENT_MAP_KEY', // 需要配置
        },
        success: (res: any) => {
          if (res.data.status === 0) {
            resolve(res.data.result)
          } else {
            reject(new Error(res.data.message))
          }
        },
        fail: reject,
      })
    })
  }

  return {
    location,
    loading,
    error,
    getCurrentLocation,
    chooseLocation,
    reverseGeocode,
  }
}

/**
 * 使用选中的城市
 */
export function useSelectedCity() {
  const cityKey = config.storage.cityKey
  const city = ref<string>(uni.getStorageSync(cityKey) || '北京市')
  const cityCode = ref<string>(uni.getStorageSync(`${cityKey}_code`) || '110100')

  const setCity = (name: string, code: string) => {
    city.value = name
    cityCode.value = code
    uni.setStorageSync(cityKey, name)
    uni.setStorageSync(`${cityKey}_code`, code)
    // 发送城市变更事件
    uni.$emit('city:change', { name, code })
  }

  return {
    city,
    cityCode,
    setCity,
  }
}
