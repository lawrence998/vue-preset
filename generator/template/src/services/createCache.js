/**
 * 接口缓存方法
 */
import request from './request';
import myLocalStorage from '@/common/utils/myLocalStorage';
import {
  isEmpty,
  isEmptyObject
} from 'utils';

// 接口缓存时间 3小时
const cacheTime = 3 * 3600 * 1000;
const createCache = async function (obj) {
  if (obj) {
    let cacheName = obj.url;

    if (!isEmpty(obj.params) && !isEmptyObject(obj.params)) {
      Object.keys(obj.params).forEach((item, index) => {
        if (obj['params'][item]) {
          cacheName += `${index === 0 ? '?' : '&'}${item}=${obj['params'][item]}`;
        }
      });
    }

    const data = myLocalStorage.getItem(cacheName);
    const errArr = ['', null, undefined];
    if (!errArr.includes(data) && data !== false) {
      return data;
    }
    const res = await request(obj);
    if (res.success) {
      myLocalStorage.setItem({
        name: cacheName,
        expires: obj.cacheTime ? obj.cacheTime : cacheTime,
        value: res
      });
      return res;
    } else {
      let message;
      if (res.data) {
        if (res.data.message) {
          message = res.data.message;
        } else if (res.data.error_info) {
          message = res.data.error_info.msg;
        }
      }
      if (message) {
        // Message({
        //   type: 'error',
        //   message: message
        // });
      }
      return res;
    }
  }
};

export {
  createCache
};
