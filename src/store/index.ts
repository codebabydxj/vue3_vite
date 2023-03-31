/**
 * 使用
 * import { globalStore } from '@/store'
 * let store = globalStore();
 */
import { createPinia, defineStore } from 'pinia'
import routerConfig from '@/routers/router-config';
import _localStorage from '@/utils/storage/localStorage';

const pinia = createPinia()

const globalStore = defineStore('useGlobalStore', {
  state: () => {
    return {
      routerConfig,
      currentRoute: '/',
      routes: <any>[{title: '欢迎使用', route: '/welcome', realPath: '/welcome'}],
      // 常量
      consts: <any>[],
      userInfo: <any>{},
      winSize: <any>{},
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
      if (route.route !== '/welcome') {
        this.routes.push(route);
      }
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
    setWinSize(winSize: any) {
      this.winSize = winSize;
    },
    logout() {
      // const state: any = globalStore();
      // 1.清空用户信息
      this.userInfo = {};
      // 2.清空导航栏
      this.currentRoute = '/';
      this.routes = [];
      // 3.清空所有菜单权限
      this.routerConfig.forEach((v: any) => { v.access = false; });
      // 4.清空token
      _localStorage.remove('TOKEN')
    },
  },
});

export { pinia, globalStore };