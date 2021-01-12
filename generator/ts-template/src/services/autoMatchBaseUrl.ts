import mockBaseUrl from '@/config/urlMap';
import { domainName } from '@/config';

/**
 * 根据前缀，自动匹配基础的url
 * 根据项目所需，自己扩展
 * @param prefix 接口前缀
 * @param url 接口地址
 * @param isMock 是否需要mock数据
 * @returns {string}
 */
export default function autoMatchBaseUrl (prefix = '', url = '', isMock = false) {
  return isMock ? mockBaseUrl[url] : domainName[prefix];
}
