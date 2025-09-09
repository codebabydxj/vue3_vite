/** 
 * 全局默认配置项
*/

// 首页地址（默认）
export const HOME_URL: string = "/home";

// 登录页地址（默认）
export const LOGIN_URL: string = "/login";

// 首页路由地址
export const HOME_ROUTE: Array<any> = [{ title: '工作台',  name: 'Home', route: HOME_URL, realPath: HOME_URL, close: false }];

// 默认主题颜色
export const DEFAULT_PRIMARY: string = "#409EFF";

// 路由白名单地址（本地存在的路由 staticRouter.ts 中）
export const ROUTER_WHITE_LIST: string[] = ["/500", "/403"];
