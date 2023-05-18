import { defineStore } from "pinia";
import { KeepAliveState } from "@/store/interface";

/**
 * 要保证组件定义的 name 全等于 router中定义的 name ！！！！！！！！
 */
export const useKeepAliveStore = defineStore({
  /* id: 必须存在，在所有 Store 中唯一 */
  id: 'keepAlive',
  state: (): KeepAliveState => ({
    keepAliveName: []
  }),
  actions: <any>{
    // 新增 KeepAliveName
    addKeepAliveName(name: string) {
      !this.keepAliveName.includes(name) && !['Home', 'Empty'].includes(name) && this.keepAliveName.push(name);
      console.log(this.keepAliveName);
    },
    // 移除 KeepAliveName
    removeKeepAliveName(name: string) {
      this.keepAliveName = this.keepAliveName.filter((item: any) => item !== name);
      console.log(this.keepAliveName);
    },
    // 更新 KeepAliveName
    updateKeepAliveName(keepAliveName: string[] = []) {
      this.keepAliveName = keepAliveName.filter((item: any) => item !== 'Home');
      console.log(this.keepAliveName);
    }
  }
});
