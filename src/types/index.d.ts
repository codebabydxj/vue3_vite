declare module 'pinia'
declare interface Window {
  vm: any
}
declare module 'axios-jsonp'
declare namespace NodeJS {
  type Timer = any;
  type Timeout = any;
}

/* __APP_INFO__ */
declare const __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    dependencies: Recordable<string>;
    devDependencies: Recordable<string>;
  };
  lastBuildTime: string;
};