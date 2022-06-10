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
routers.beforeEach((to, from, next) => {
    next()
})

export default routers;