export default {
  key: 'basic',
  title: '欢迎使用',
  icon: 'HomeFilled',
  access: true,
  routes: [
    {
      path: '/home',
      key: 'home',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: false
      },
      title: '首页',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          meta: {
            permission: {},
            isKeepAlive: false
          },
          component: () => import('../../views/basic/index.vue'),
        }, {
          path: '_empty',
          name: 'Empty',
          component: () => import('../../views/basic/empty/index.vue'),
        },
      ],
    }
  ],
};
