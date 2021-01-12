import request from 'services/request';
import { createCache } from 'services/createCache';

export function getDemo(params) {
  return request({
    url: '/test/demo',
    method: 'get',
    isMock: true,
    params
  });
};

export function getTest(params) {
  return request({
    url: '/test/noMock',
    method: 'get',
    params
  });
};

export function getCache(params) {
  return createCache({
    url: '/test/getCache',
    method: 'get',
    isMock: true,
    params
  });
};
