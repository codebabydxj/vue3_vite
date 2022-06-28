/**
 * 使用
 * import { pinia, globalStore } from '@/store'
 * let store = globalStore(pinia);
 */
import { createPinia, defineStore } from 'pinia'
import routerConfig from '@/routers/router-config';

const pinia = createPinia()

const globalStore = defineStore('useGlobalStore', {
  state: () => {
    return {
      routerConfig,
      currentRoute: '/',
      routes: [],
      // 常量
      consts: [],
      userInfo: {},
    }
  },
  getters: {

  },
  actions: {
    setCurrentRoute(rootPath: any) {
      const state: any = globalStore();
      state.currentRoute = rootPath;
    },
    addRoute(route: any) {
      const state: any = globalStore();
      state.routes.push(route);
    },
    updateRoute(options: any) {
      const state: any = globalStore();
      Object.keys(state.routes[options.index]).forEach((key) => {
        if (options.route[key]) {
          state.routes[options.index][key] = options.route[key];
        }
      });
    },
    delRoute(options: any) {
      const state: any = globalStore();
      if (options.item) {
        state.routes.splice(options.index, options.count, options.item);
      } else {
        state.routes.splice(options.index, options.count);
      }
    },
    setConsts(consts: any) {
      const state: any = globalStore();
      state.consts = consts;
    },
    setUserInfo(userInfo: any) {
      const state: any = globalStore();
      state.userInfo = userInfo;
    },
    logout() {
      const state: any = globalStore();
      // 清空用户信息
      state.userInfo = {};
      // 清空导航栏
      state.currentRoute = '/';
      state.routes = [];
      // 清空所有菜单权限
      state.routerConfig.forEach((v: any) => { v.access = false; });
    },
  },
});

export { pinia, globalStore };