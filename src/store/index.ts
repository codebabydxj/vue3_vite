/**
 * 使用
 * import { globalStore } from '@/store'
 * const myStore: any = globalStore();
 * 
 * pinia可以直接使用storeToRefs响应式修改state的值
 * import { storeToRefs } from 'pinia'
 * let { pagination } = storeToRefs(myStore)
 */
import { createPinia, defineStore } from 'pinia';
import routerConfig from '@/routers/router-config';
import piniaPluginPersist from 'pinia-plugin-persistedstate';
import piniaPersistConfig from "@/config/piniaPersist";
import _localStorage from '@/utils/storage/localStorage';

const globalStore = defineStore({
  /* id: 必须存在，在所有 Store 中唯一 */
	id: 'GlobalState',
  state: () => {
    return {
      routerConfig,
      currentRoute: '/',
      routes: <any>[{title: '欢迎使用', route: '/welcome', realPath: '/welcome'}],
      // 常量
      consts: <any>[],
      userInfo: <any>{},
      winSize: <any>{},
      pagination: <boolean>false,
      maxHeight: <any>'200px',
      themeConfig: <any>{
        // 默认 主题颜色
        primary: '#409EFF',
        // 深色模式
        isDark: false,
        // 灰色模式
        isGrey: false,
        // 色弱模式
        isWeak: false,
        // 折叠菜单
        isCollapse: true,
      }
    }
  },
  getters: <any>{},
  actions: <any>{
    setCurrentRoute(rootPath: any) {
      // const state: any = globalStore();
      // state.currentRoute = rootPath;
      this.currentRoute = rootPath;
    },
    addRoute(route: any) {
      if (route.route !== '/welcome') {
        this.routes.push(route);
      }
    },
    updateRoute(options: any) {
      Object.keys(this.routes[options.index]).forEach((key) => {
        if (options.route[key]) {
          this.routes[options.index][key] = options.route[key];
        }
      });
    },
    delRoute(options: any) {
      if (options.item) {
        this.routes.splice(options.index, options.count, options.item);
      } else {
        this.routes.splice(options.index, options.count);
      }
    },
    setConsts(consts: any) {
      this.consts = consts;
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    setWinSize(winSize: any) {
      this.winSize = winSize;
    },
    setMaxHeight(maxHeight: any) {
      this.maxHeight = maxHeight;
    },
    setPagination(pagination: any) {
      this.pagination = pagination
    },
    setThemeConfig(themeConfig: any) {
			this.themeConfig = themeConfig;
		},
    logout() {
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
  persist: piniaPersistConfig('GlobalState', ['themeConfig'])
});

// piniaPluginPersist(持久化存储)
const pinia = createPinia()
pinia.use(piniaPluginPersist);

export { pinia, globalStore };