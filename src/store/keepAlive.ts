import { defineStore } from "pinia";
import { KeepAliveState } from "@/store/interface";

/**
 * 要保证组件定义的 name 全等于 router中定义的 name ！！！！！！！！
 */

/* id: keepAlive, 必须存在，在所有 Store 中唯一 */
export const useKeepAliveStore = defineStore('keepAlive', {
  state: (): KeepAliveState => ({
    keepAliveName: []
  }),
  actions: <any>{
    // 新增 KeepAliveName
    addKeepAliveName(name: string) {
      !this.keepAliveName.includes(name) && !['Empty'].includes(name) && this.keepAliveName.push(name);
      console.log(this.keepAliveName);
    },
    // 移除 KeepAliveName
    removeKeepAliveName(name: string) {
      if (name) this.keepAliveName = this.keepAliveName.filter((item: any) => item !== name);
    },
    // 更新 KeepAliveName
    updateKeepAliveName(keepAliveName: string[] = []) {
      this.keepAliveName = keepAliveName;
      console.log(this.keepAliveName);
    }
  }
});
