export default {
  key: 'userManage',
  title: '用户管理',
  icon: 'Avatar',
  access: true,
  routes: [
    {
      path: '/userManage',
      key: 'userManage',
      access: true,
      meta: {
        permission: {},
      },
      title: '角色分配',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          component: () => import('../../views/userManage/index.vue'),
        },
      ],
    },
  ],
};
