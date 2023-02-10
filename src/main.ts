import { createApp } from 'vue'
import { globalFunc } from '@/utils/globalFunc'

// 全局组件
import flexCard from '@/components/flex-card.vue'

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
import SvgIcon from '@/icons'
/* px转rem 自适应 */
// import '@/utils/rem' 

let app: any = null
app = createApp(App)

app.use(pinia)
app.use(routers)

// 将globalFunc方法挂载在全局
app.provide('globalFunc', globalFunc);

app.use(ElementUI, {
  locale: zhCN
})

// 加载全局 SVG
app.use(SvgIcon)

app.component('flex-card', flexCard);

const Icons = { ...ElementIcon, ...AntdIcons }
Object.keys(Icons).forEach(key => {
  app.component(key, (Icons as any)[key])
})

app.mount('#app')
