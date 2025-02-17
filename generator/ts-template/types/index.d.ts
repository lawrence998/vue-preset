interface Window {
  LOCAL_CONFIG?: any;
  LightSDK?: any;
  $eventBus?: any;
}

// @winner-fed/cloud-utils -> webpack alias utils
declare module 'utils';

declare module '@/*';

declare module 'services/*';

declare module '*.png';

declare module '*.gif';
