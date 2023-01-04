export default {
  key: 'error',
  title: '错误页面',
  icon: 'Promotion',
  access: false,
  routes: [
    {
      path: '/404',
      key: 'error404',
      access: true,
      meta: {
        permission: {},
        hidden: 1,
      },
      title: '404页面',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: '404',
          component: () => import('../../views/error404/index.vue'),
        },
      ],
    },
  ],
};
