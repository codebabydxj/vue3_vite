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

  },
});

export { pinia, globalStore };