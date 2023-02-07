import { App } from "vue";
import SvgIcon from '@/components/svg-icon/index.vue' // svg component
import "virtual:svg-icons-register"; // vite-plugin-svg-icons库的时候启动项目报错解决方案: yarn add fast-glob -D

const svgIconPlugin = {
  install(app: App): void {
    // 全局挂载
    app.component("svg-icon", SvgIcon);
  },
};

export default svgIconPlugin;