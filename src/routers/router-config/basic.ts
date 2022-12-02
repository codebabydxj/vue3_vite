export default {
  key: 'basic',
  title: '基本信息',
  icon: 'HomeFilled',
  access: true,
  routes: [
    {
      path: '/welcome',
      key: 'welcome',
      access: true,
      meta: {
        permission: {},
      },
      title: '欢迎使用',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          component: () => import('../../views/basic/index.vue'),
        }, {
          path: '_empty',
          component: () => import('../../views/basic/empty/index.vue'),
        },
      ],
    },
    {
      path: '/404',
      key: 'error404',
      access: true,
      meta: {
        permission: {},
        hidden: 1,
      },
      title: '404',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '/404',
          component: () => import('../../views/error404/index.vue'),
        },
      ],
    },
  ],
};
