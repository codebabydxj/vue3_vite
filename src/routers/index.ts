import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { globalStore } from '@/store'
import routerConfig from '@/routers/router-config';
import { errorRouter } from './router-config/error';
import NProgress from "@/config/nprogress";

/**
 * @description 📚 路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单唯一命名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.hidden ==> 是否隐藏
 * @param meta.isKeepAlive ==> 是否缓存
 * */

let allRoutes: any = [];
routerConfig.forEach((item: any) => {
    allRoutes = allRoutes.concat(item.routes);
});
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../views/index.vue'),
        redirect: '/home',
        children: allRoutes,
    },
    {
        path: '/login',
        name: 'Login',
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
// const allGuardRouter: any = [...allRoutes, ...routes.slice(1), { path: '/home/_empty', name: 'empty' }]
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