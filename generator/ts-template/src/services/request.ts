/**
 *
 * @authors lawrence998
 * @description https://github.com/mzabriskie/axios
 * 安卓4.4.3一下的手机还是不支持Promise的,需要引入npm install babel-polyfill和npm install babel-runtime，在入口文件上加上即可
 * import 'babel-polyfill';
 */

import Qs from 'qs';
import axios from 'axios';
import autoMatchBaseUrl from './autoMatchBaseUrl';
import { TIMEOUT, BASE_PREFIX } from '@/constant';
import { addPending, removePending } from './pending';

const codeMessage: object = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

// 检测请求状态
function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (response) {
    const { status, statusText } = response;
    if ((status >= 200 && status < 300) || status === 304) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      return response.data;
    }
    return {
      status,
      msg: codeMessage[status] || statusText
    };
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  };
}

function responseLog(response) {
  if (process.env.NODE_ENV === 'development') {
    const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255
    )},${Math.round(Math.random() * 255)})`;
    console.log(
      '%c┍------------------------------------------------------------------┑',
      `color:${randomColor};`
    );
    console.log('| 请求地址：', response.config.url);
    console.log('| 请求参数：', Qs.parse(response.config.data));
    console.log('| 返回数据：', response.data);
    console.log(
      '%c┕------------------------------------------------------------------┙',
      `color:${randomColor};`
    );
  }
}

/**
 * 全局请求扩展配置
 * 添加一个请求拦截器 （于transformRequest之前处理）
 */
const axiosConfig = {
  success: (config) => {
    // 在请求开始前，对之前的请求做检查取消操作
    removePending(config);
    // 将当前请求添加到 pending 中
    addPending(config);
    // 以下代码，鉴权token,可根据具体业务增删。
    // demo示例:
    if (config['url'].indexOf('operatorQry') !== -1) {
      config.headers['accessToken'] =
        'de4738c67e1bb450be71b660f0716aa4675860cec1ff9bc23d800efb40519cf3';
    }
    return config;
  },
  error: (error) => Promise.reject(error)
};

/**
 * 全局请求响应处理
 * 添加一个返回拦截器 （于transformResponse之后处理）
 * 返回的数据类型默认是json，若是其他类型（text）就会出现问题，因此用try,catch捕获异常
 */
const axiosResponse = {
  success: (response) => {
    // 在请求结束后，移除本次请求
    removePending(response);
    responseLog(response);
    window.$eventBus.$emit('isBrokenNetwork', false);
    return checkStatus(response);
  },
  error: (error) => {
    const { response, code } = error;
    if (axios.isCancel(error)) {
      console.error('repeated request: ' + error.message);
    } else {
      // handle error code
    }
    // 接口请求异常统一处理
    if (code === 'ECONNABORTED') {
      // Timeout error
      console.log('Timeout error', code);
    }
    if (response) {
      // 请求已发出，但是不在2xx的范围
      // 对返回的错误进行一些处理
      return Promise.reject(checkStatus(response));
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      console.log('断网了~');
      window.$eventBus.$emit('isBrokenNetwork', true);
    }
  }
};

// 创建axios实例
const instance = axios.create({
  // baseURL: process.env.BASE_URL,
  timeout: TIMEOUT // 请求超时时间
});

instance.interceptors.request.use(axiosConfig.success, axiosConfig.error);
instance.interceptors.response.use(axiosResponse.success, axiosResponse.error);

/**
 * 基于axios ajax请求
 * @param url
 * @param method
 * @param timeout
 * @param prefix 用来拼接url地址
 * @param data
 * @param headers
 * @param dataType
 * @returns {Promise.<T>}
 */
export default async function request({
  method = 'post',
  timeout = TIMEOUT,
  prefix = BASE_PREFIX,
  data = {},
  headers = {},
  dataType = 'json',
  url = '',
  isMock = false
}) {
  try {

    const baseURL = autoMatchBaseUrl(prefix, url, isMock);

    const formatHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      ...headers
    };

    const defaultConfig: any = {
      baseURL,
      url,
      method,
      params: data,
      data,
      timeout,
      headers: formatHeaders,
      responseType: dataType,
      ifHandleError: true // 是否统一处理接口失败(提示)
    };
    console.log('defaultConfig: ', defaultConfig);

    if (method === 'get') {
      defaultConfig.data = {};
    } else {
      defaultConfig.params = {};

      const contentType = headers['Content-Type'];

      if (typeof contentType !== 'undefined') {
        if (contentType.indexOf('multipart') !== -1) {
          // 类型 `multipart/form-data;`
          defaultConfig.data = data;
        } else if (contentType.indexOf('json') !== -1) {
          // 类型 `application/json`
          // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
          defaultConfig.data = JSON.stringify(data);
        } else {
          // 类型 `application/x-www-form-urlencoded`
          // 服务器收到的raw body(原始数据) name=homeway&key=nokey
          defaultConfig.data = Qs.stringify(data);
        }
      }

    }
    const res: any = await instance(defaultConfig);

    if (!res && !res.success && defaultConfig.ifHandleError) {
      // 自定义参数，是否允许全局提示错误信息
      // Message({
      //   message: res.msg || '请求处理失败！',
      //   type: 'error',
      //   duration: 3000,
      //   showClose: true
      // });
    }
    return res;
  } catch (error) {
    return error;
  }

}

// 上传文件封装
export const uploadFile = (obj: any) => {
  return request({
    url: obj.url,
    method: 'post',
    data: obj.formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
