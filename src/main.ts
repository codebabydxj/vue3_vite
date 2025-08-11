import { createApp } from "vue"
import App from "./App.vue"

/** 全局组件 */
import flexCard from "@/components/flexCard/index.vue"

/** 样式组件 */
import "@/baseStyle/base.scss"
import "@/baseStyle/transition.scss"
import ElementPlus from "element-plus"
import * as ElementIcon from "@element-plus/icons-vue"
import zhCN from "element-plus/es/locale/lang/zh-cn"
import * as AntdIcons from "@vicons/antd"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/baseStyle/element-dark.scss"
import "@/baseStyle/element.scss"

/** 路由 */
import routers from "./routers"
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";

/** 状态管理库 */
import { pinia } from "./store"

/** 全局调用封装路由 */
import { globalRouter } from "@/utils/globalRouter"

/** 加载全局 svg-icon 标签 */
import SvgIcon from "@/icons"

/** 自定义指令 */
import directives from "@/directives"

async function render() {
  const app = createApp(App);
  
  /** 将 globalRouter 方法挂载在全局 */
  app.provide("Router", globalRouter);
  
  /** 注册全局封装组件 */
  app.component("flex-card", flexCard);
  
  /** 注册全局element、antd Icons组件 */
  const Icons = { ...ElementIcon, ...AntdIcons }
  Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
  })

  app.use(pinia);
  await initDynamicRouter(); // 强行让挂载等待路由初始化完成，解决刷新页面，出现404或者白屏的情况
  app.use(routers).use(SvgIcon).use(directives).use(ElementPlus, { locale: zhCN })
  app.mount("#app");
}
render();