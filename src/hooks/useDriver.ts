import { computed } from "vue";
import { globalStore } from "@/store";
import { driver, DriveStep, Config } from 'driver.js';
import 'driver.js/dist/driver.css';

export default driver;
// 根据业务进行的封装
export const useDriver = (steps: DriveStep[] = [], options: Config = {}, onceKey?: string) => {
  const myStore: any = globalStore()
  const themeConfig = computed(() => myStore.themeConfig)
  
  let driverObj: any = null
  const obj: any = {
    smoothScroll: false,
    allowClose: false,
    stagePadding: 0,
    // showButtons: [
    //   "previous",
    //   'next',
    //   "close"
    // ],
    progressText: "{{current}}/{{total}}",
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '关闭',
    // showProgress: true,
    steps,
    ...options,
    onDestroyStarted: () => {
      myStore.setThemeConfig({ ...themeConfig.value, isOpenGuide: false })
      driverObj.destroy()
    },
  } as Config

  if (steps.length <= 1) {
    obj.showButtons = ['next']
  }
 
  driverObj = driver(obj)
  driverObj.drive()

  return driverObj
}