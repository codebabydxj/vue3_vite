export const errorRouter = [
  {
    path: "/403",
    name: "page403",
    component: () => import("@/components/errorPage/403.vue"),
    title: "403页面",
    meta: {
      permission: {},
    }
  },
  {
    path: "/404",
    name: "page404",
    component: () => import("@/components/errorPage/404.vue"),
    title: "404页面",
    meta: {
      permission: {},
    }
  },
  {
    path: "/500",
    name: "page500",
    component: () => import("@/components/errorPage/500.vue"),
    title: "500页面",
    meta: {
      permission: {},
    }
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/errorPage/404.vue")
  }
];