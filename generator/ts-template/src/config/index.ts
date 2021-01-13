/**
 * 配置开发环境和线上环境的切换
 * baseUrl:域名地址
 */
// 域名地址
let domainName = {};
switch (process.env.VUE_APP_ENVIRONMENT) {
  case 'development':
    domainName = {
      baseUrl: 'http://demo-dev.com'
    };
    break;
  case 'test':
    domainName = {
      baseUrl: 'http://demo-test.com'
    };
    break;
  case 'beta':
    domainName = {
      baseUrl: 'https://demo-beta.demo.com'
    };
    break;
  case 'production':
    domainName = {
      baseUrl: 'https://demo.com'
    };
    break;
  default:
    domainName = {
      baseUrl: 'http://demo-dev.com'
    };
}

export {
  domainName
};
