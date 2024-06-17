import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useGlobalStore } from '@/store'
import { staticRouter, errorRouter } from './modules/staticRouter'
import { initDynamicRouter } from "./modules/dynamicRouter"
import NProgress from "@/config/nprogress"

/**
 * @description 📚 路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单唯一命名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 是否缓存
 * */

const mode = 'history'; // 路由模式  hash  history

// 创建路由模式
const routerMode = {
    hash: () => createWebHashHistory(),
    history: () => createWebHistory()
}

/** 创建路由 */
const routers = createRouter({
    history: routerMode[mode](),
    routes: [...staticRouter, ...errorRouter],
    strict: false,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

let lockFlag: any = true;

/* 路由权限方案：挂载所有路由 + 全局路由守卫判断权限 */
routers.beforeEach(async (to, from, next) => {
    /** 1.获取store */
    const myStore = useGlobalStore()

    /** 2.开启进度条 */
    NProgress.start();

    /** 3.判断是否是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页 */
    if (to.path.toLocaleLowerCase() === '/login') {
        if (myStore.userInfo.token) return routers.back();
        resetRouter();
        return next();
    }
    
    /** 4.判断是否有 Token，没有重定向到 login 页面 */
    if (!myStore.userInfo.token) {
        return next({ path: '/login', replace: true });
    }

    /** 5.判断是否是锁屏状态 */
    if (myStore.themeConfig.isLockScreen && lockFlag) {
        lockFlag = false;
        return next({ path: '/lockScreen', replace: true });
    }
    
    /** 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由 */
    if (!myStore.getMenuList.length) {
        await initDynamicRouter();
        return next({ ...to, replace: true });
    }
    
    /** 7.存储 routerName 做按钮权限筛选 */
    myStore.setRouteName(to.name as string);

    /** 8.正常访问页面 */
    next()
})

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
    const myStore = useGlobalStore()
    myStore.flatMenuList.forEach((route: any) => {
        const { name } = route;
        if (name && routers.hasRoute(name)) routers.removeRoute(name);
    });
};

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