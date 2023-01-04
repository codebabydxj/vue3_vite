export default {
  key: 'authManage',
  title: '权限管理',
  icon: 'Setting',
  access: true,
  routes: [
    {
      path: '/authManage',
      key: 'authManage',
      access: true,
      meta: {
        permission: {},
      },
      title: '部门管理',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'authManage',
          component: () => import('../../views/authManage/index.vue'),
        },
      ],
    },
  ],
};
