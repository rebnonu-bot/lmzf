import { http } from '@/api/request'
import config from '@/config'
import { homeMockData } from '@/config/mock.config'

/**
 * 账单类型定义
 */
export interface Bill {
  id: string
  title: string
  amount: number
  month: string
  type: string
  status: 'unpaid' | 'paid'
  deadline: string
  desc?: string
}

/**
 * 获取待缴账单列表
 */
export async function getUnpaidBills(): Promise<Bill[]> {
  if (config.api.enableMock) {
    // @ts-ignore
    const bills = (homeMockData.bills || []) as Bill[]
    return Promise.resolve(bills)
  }
  return http.get('/bills/unpaid')
}

/**
 * 支付账单
 * @param billIds 账单ID列表
 * @param deduction 抵扣信息
 */
export async function payBills(
  billIds: string[], 
  deduction: { 
    points?: number, 
    coins?: number, 
    couponId?: string 
  }
): Promise<{ success: boolean; orderId: string }> {
  if (config.api.enableMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          orderId: `ORD${Date.now()}`
        })
      }, 1000)
    })
  }
  return http.post('/bills/pay', { billIds, deduction })
}
