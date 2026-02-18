import { http } from '@/api/request'
import config from '@/config'

export interface Store {
  id: string
  name: string
  address: string
  distance: string
  pointsRate: string
  tags: string[]
  category: string
  image?: string
  latitude?: number
  longitude?: number
}

/**
 * 获取门店列表
 */
export async function getStoreList(params?: { 
  keyword?: string, 
  category?: string, 
  latitude?: number, 
  longitude?: number,
  city?: string,
  page?: number,
  pageSize?: number
}): Promise<{ list: Store[], total: number }> {
  if (config.api.enableMock) {
    const stores: Store[] = [
      {
        id: '1',
        name: '邻檬便利店（阳光店）',
        address: '赣州市章贡区阳光路123号',
        distance: '0.5km',
        pointsRate: '消费1元得2积分',
        tags: ['支持抵扣', '24小时'],
        category: 'supermarket',
        latitude: 25.83,
        longitude: 114.93
      },
      {
        id: '2',
        name: '美味轩餐厅',
        address: '赣州市章贡区红旗大道88号',
        distance: '1.2km',
        pointsRate: '消费1元得3积分',
        tags: ['新开业', '满减'],
        category: 'food',
        latitude: 25.84,
        longitude: 114.94
      },
      {
        id: '3',
        name: '活力健身房',
        address: '赣州市章贡区体育中心2楼',
        distance: '2.0km',
        pointsRate: '消费1元得1积分',
        tags: ['支持抵扣'],
        category: 'fitness',
        latitude: 25.85,
        longitude: 114.92
      },
      {
        id: '4',
        name: '靓车坊洗车',
        address: '赣州市章贡区建设路56号',
        distance: '3.5km',
        pointsRate: '消费1元得2积分',
        tags: ['会员价'],
        category: 'car',
        latitude: 25.82,
        longitude: 114.91
      },
      {
        id: '5',
        name: '康乐大药房',
        address: '赣州市章贡区健康路99号',
        distance: '0.8km',
        pointsRate: '消费1元得1积分',
        tags: ['医保定点'],
        category: 'pharmacy',
        latitude: 25.835,
        longitude: 114.935
      },
      {
        id: '6',
        name: '美丽人生美容院',
        address: '赣州市章贡区美容街12号',
        distance: '1.5km',
        pointsRate: '消费1元得5积分',
        tags: ['新开业', '体验价'],
        category: 'beauty',
        latitude: 25.845,
        longitude: 114.945
      }
    ];

    let filtered = stores;

    if (params?.city) {
      // Simple includes check for city
      filtered = filtered.filter(s => s.address.includes(params.city!));
    }

    if (params?.keyword) {
      filtered = filtered.filter(s => s.name.includes(params.keyword!));
    }

    if (params?.category && params.category !== 'all') {
      filtered = filtered.filter(s => s.category === params.category);
    }
    
    const total = filtered.length;
    const start = ((params?.page || 1) - 1) * (params?.pageSize || 10);
    const list = filtered.slice(start, start + (params?.pageSize || 10));

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          list,
          total
        });
      }, 500);
    });
  }
    // 关键词过滤
    if (params?.keyword) {
      const kw = params.keyword.toLowerCase();
      filtered = filtered.filter(s => s.name.toLowerCase().includes(kw) || s.address.toLowerCase().includes(kw));
    }

    // 分类过滤
    if (params?.category && params.category !== 'all') {
      filtered = filtered.filter(s => s.category === params.category);
    }

    // 模拟分页
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const list = filtered.slice(start, start + pageSize);

    return Promise.resolve({
      list,
      total: filtered.length
    });
  }
  return http.get('/stores', params);
}

/**
 * 获取门店详情
 */
export async function getStoreDetail(id: string): Promise<Store> {
  if (config.api.enableMock) {
    const list = await getStoreList();
    const store = list.list.find(s => s.id === id);
    if (store) {
      return Promise.resolve(store);
    }
    return Promise.reject(new Error('Store not found'));
  }
  return http.get(`/stores/${id}`);
}
