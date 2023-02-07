export default {
  key: 'error',
  title: '错误页面',
  icon: 'Promotion',
  access: true,
  routes: [
    {
      path: '/403',
      key: 'page403',
      access: true,
      meta: {
        permission: {},
        // hidden: 1,
      },
      title: '403',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'page403',
          component: () => import('../../views/error/page403/index.vue'),
        },
      ],
    },
    {
      path: '/404',
      key: 'page404',
      access: true,
      meta: {
        permission: {},
        // hidden: 1,
      },
      title: '404',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'page404',
          component: () => import('../../views/error/page404/index.vue'),
        },
      ],
    },
    {
      path: '/500',
      key: 'page500',
      access: true,
      meta: {
        permission: {},
        // hidden: 1,
      },
      title: '500',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'page500',
          component: () => import('../../views/error/page500/index.vue'),
        },
      ],
    },
  ],
};
