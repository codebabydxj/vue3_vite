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
    }
  },
  getters: {

  },
  actions: {
    logout(state: any) {
      // 清空用户信息
      state.user = {};
      // 清空导航栏
      state.currentRoute = '/';
      state.routes = [];
      // 清空所有菜单权限
      state.routerConfig.forEach((v: any) => { v.access = false; });
    },
  },
});

export { pinia, globalStore };