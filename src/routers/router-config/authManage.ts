export default {
  key: 'authManage',
  title: '系统管理',
  icon: 'Tools',
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
