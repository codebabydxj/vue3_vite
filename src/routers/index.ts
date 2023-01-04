import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { pinia, globalStore } from "@/store";

let store = globalStore(pinia);
let allRoutes: any = [];
store.routerConfig.forEach((item: any) => {
    allRoutes = allRoutes.concat(item.routes);
});
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'main',
        component: () => import('../views/index.vue'),
        redirect: '/welcome',
        children: allRoutes,
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue'),
    },
]
const routers = createRouter({
    history: createWebHistory(),
    routes,
})
/* 路由权限方案：挂载所有路由 + 全局路由守卫判断权限 */
routers.beforeEach((to, from, next) => {
    const idx = allRoutes.findIndex((i: any) => i.path === to.fullPath)
    if (idx === -1) {
        next({ path: '/404' });
    } else {
        next()
    }
})

export default routers;