import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import routerConfig from '@/routers/router-config';
import NProgress from "@/config/nprogress";

let allRoutes: any = [];
routerConfig.forEach((item: any) => {
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
const allGuardRouter: any = [...allRoutes, ...routes.slice(1), { path: '/welcome/_empty', name: 'empty' }]
routers.beforeEach((to, from, next) => {
	NProgress.start();

    const idx = allGuardRouter.findIndex((i: any) => i.path === to.fullPath)
    if (idx === -1) {
        next({ path: '/404' });
    } else {
        next()
    }
})
/** 路由跳转结束 */
routers.afterEach(() => {
	NProgress.done();
});

/** 路由跳转错误 */
routers.onError(error => {
	NProgress.done();
	console.warn("路由错误", error.message);
});

export default routers;