export default {
  key: 'authManage',
  title: '系统管理',
  icon: 'Tools',
  access: true,
  routes: [
    {
      path: '/departManage',
      key: 'departManage',
      access: true,
      meta: {
        permission: {},
      },
      title: '部门管理',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'departManage',
          component: () => import('../../views/authManage/departManage/index.vue'),
        },
      ],
    },
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
          name: 'userManage',
          component: () => import('../../views/authManage/userManage/index.vue'),
        },
      ],
    },
  ],
};
