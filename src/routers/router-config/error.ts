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