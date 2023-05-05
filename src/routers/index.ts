import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { globalStore } from '@/store'
import routerConfig from '@/routers/router-config';
import { errorRouter } from './router-config/error';
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
    history: createWebHistory(), // createWebHashHistory (hash)
    routes: [...routes, ...errorRouter],
    strict: false,
    scrollBehavior: () => ({ left: 0, top: 0 })
})
/* 路由权限方案：挂载所有路由 + 全局路由守卫判断权限 */
// const allGuardRouter: any = [...allRoutes, ...routes.slice(1), { path: '/welcome/_empty', name: 'empty' }]
routers.beforeEach((to, from, next) => {
    const myStore = globalStore()

    NProgress.start();

    /** 1.判断是否是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页 */
    if (to.path.toLocaleLowerCase() === '/login') {
        if (myStore.userInfo.token) return routers.back()
        return next();
    }
    
    /** 2.判断是否有 Token，没有重定向到 login 页面 */
    if (!myStore.userInfo.token) {
        return next({ path: '/login', replace: true });
    }

    /** 3.判断如果是路由不存在的页面，直接进入404页面 */
    // const idx = allGuardRouter.findIndex((i: any) => i.path === to.path)
    // if (idx === -1) return next({ path: '/404' });

    /** 4.正常访问页面 */
    next()
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