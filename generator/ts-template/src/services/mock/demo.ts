// demo接口
export function getDemo() {
  return {
    isOpen: true,
    url: 'mock/test/demo',
    type: 'get',
    data: {
      msg: 'success',
      code: 0,
      data: {
        token: '4344323121398'
      }
    }
  };
}

// 缓存demo接口
export function getCache() {
  return {
    url: 'mock/test/getCache',
    type: 'get',
    data: {
      msg: 'success',
      code: 0,
      data: {
        token: '4344323121398'
      },
      success: true
    }
  };
}
