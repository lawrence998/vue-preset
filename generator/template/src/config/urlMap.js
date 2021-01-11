/**
 * 远程接口地址和本地mock地址映射表
 * key：接口地址
 * value：本地Mock地址
 */
const mockBaseUrl = 'mock';
export default {
  '/test/demo': mockBaseUrl,
  '/test/getCache': mockBaseUrl
};
