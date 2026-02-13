// Mock 数据存储
const mockStore: Record<string, any> = {};

// 初始化 Mock 数据
export function initMock() {
  // 示例：积分查询接口
  mockStore['/api/points'] = {
    code: 200,
    message: '请求成功',
    data: {
      points: 12993,
      deductAmount: 129.93,
    },
  };

  // 拦截 uni.request
  const originalRequest = uni.request;
  // @ts-ignore
  uni.request = function (options: UniApp.RequestOptions) {
    const url = options.url || '';
    
    // 检查是否有对应的 mock 数据
    for (const key in mockStore) {
      if (url.endsWith(key)) {
        const mockData = mockStore[key];
        setTimeout(() => {
          if (options.success) {
            options.success({
              data: mockData,
              statusCode: 200,
              header: {},
              cookies: [],
              errMsg: 'request:ok',
            } as UniApp.RequestSuccessCallbackResult);
          }
          if (options.complete) {
            options.complete({} as any);
          }
        }, 300);
        return { abort: () => {} } as UniApp.RequestTask;
      }
    }
    
    // 如果没有 mock 数据，调用原始请求
    return originalRequest(options);
  };
}

export default { initMock };
