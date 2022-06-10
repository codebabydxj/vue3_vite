export default {
  key: 'basic',
  title: '基本信息',
  icon: '',
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
  ],
};
