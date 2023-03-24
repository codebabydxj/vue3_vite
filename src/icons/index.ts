/** 使用方式
 * <svg-icon name="svg命名" :iconStyle="{ width: '100px', height: '100px'}" />
 */
import { App } from "vue";
import SvgIcon from '@/components/svgIcon/index.vue' // svg component
import "virtual:svg-icons-register"; // vite-plugin-svg-icons库的时候启动项目报错解决方案: yarn add fast-glob -D

const svgIconPlugin = {
  install(app: App): void {
    // 全局挂载
    app.component("svg-icon", SvgIcon);
  },
};

export default svgIconPlugin;