import { createApp } from 'vue'
import { globalRouter } from '@/utils/globalRouter'

// 全局组件
import flexCard from '@/components/flexCard/index.vue'

import App from './App.vue'
import { pinia } from './store'
import routers from './routers'
import ElementUI from 'element-plus'
import * as ElementIcon from '@element-plus/icons-vue'
import zhCN from 'element-plus/es/locale/lang/zh-cn'
import * as AntdIcons from '@vicons/antd'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/base-style/base.scss'
import '@/base-style/element.scss'
import SvgIcon from '@/icons'
import directives from '@/directives'
/* px转rem 自适应 */
// import '@/utils/rem' 

let app: any = null
app = createApp(App)

app.use(pinia)
app.use(routers)

// 将globalRouter方法挂载在全局
app.provide('globalRouter', globalRouter);

app.use(ElementUI, {
  locale: zhCN
})

// 加载全局 SVG
app.use(SvgIcon)

// 加载全局自定义指令
app.use(directives)

app.component('flex-card', flexCard);

const Icons = { ...ElementIcon, ...AntdIcons }
Object.keys(Icons).forEach(key => {
  app.component(key, (Icons as any)[key])
})

app.mount('#app')
