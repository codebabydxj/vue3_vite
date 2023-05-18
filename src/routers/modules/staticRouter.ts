import { RouteRecordRaw } from "vue-router";

/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/index.vue'),
    redirect: '/basic/home',
    children: [],
  },
  {
    path: "/empty",
    name: "Empty",
    meta: {
      title: "过渡白屏页面"
    },
    component: () => import('@/views/basic/empty/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: "登录"
    },
    component: () => import('@/views/login/index.vue'),
  },
];

export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/errorPage/403.vue"),
    title: "403页面",
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/errorPage/404.vue"),
    title: "404页面",
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/errorPage/500.vue"),
    title: "500页面",
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/errorPage/404.vue")
  }
];