/**
 * 使用
 * import { globalStore } from '@/store'
 * let store = globalStore();
 */
import { createPinia, defineStore } from 'pinia'
import routerConfig from '@/routers/router-config';

const pinia = createPinia()

const globalStore = defineStore('useGlobalStore', {
  state: () => {
    return {
      routerConfig,
      currentRoute: '/',
      routes: <any>[],
      // 常量
      consts: <any>[],
      userInfo: <any>{},
    }
  },
  getters: <any>{

  },
  actions: <any>{
    setCurrentRoute(rootPath: any) {
      // const state: any = globalStore();
      // state  .currentRoute = rootPath;
      this.currentRoute = rootPath;
    },
    addRoute(route: any) {
      // const state: any = globalStore();
      // state.routes.push(route);
      this.routes.push(route);
    },
    updateRoute(options: any) {
      // const state: any = globalStore();
      Object.keys(this.routes[options.index]).forEach((key) => {
        if (options.route[key]) {
          this.routes[options.index][key] = options.route[key];
        }
      });
    },
    delRoute(options: any) {
      // const state: any = globalStore();
      if (options.item) {
        this.routes.splice(options.index, options.count, options.item);
      } else {
        this.routes.splice(options.index, options.count);
      }
    },
    setConsts(consts: any) {
      // const state: any = globalStore();
      this.consts = consts;
    },
    setUserInfo(userInfo: any) {
      // const state: any = globalStore();
      this.userInfo = userInfo;
    },
    logout() {
      // const state: any = globalStore();
      // 清空用户信息
      this.userInfo = {};
      // 清空导航栏
      this.currentRoute = '/';
      this.routes = [];
      // 清空所有菜单权限
      this.routerConfig.forEach((v: any) => { v.access = false; });
    },
  },
});

export { pinia, globalStore };