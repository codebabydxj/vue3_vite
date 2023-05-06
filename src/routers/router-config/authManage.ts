export default {
  key: 'authManage',
  title: '系统管理',
  icon: 'Tools',
  access: true,
  routes: [
    {
      path: '/routerLimit',
      key: 'routerLimit',
      access: true,
      meta: {
        permission: {},
      },
      title: '路由权限',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'routerLimit',
          component: () => import('../../views/authManage/routerLimit/index.vue'),
        },
      ],
    },
    {
      path: '/buttonLimit',
      key: 'buttonLimit',
      access: true,
      meta: {
        permission: {},
      },
      title: '按钮权限',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'buttonLimit',
          component: () => import('../../views/authManage/buttonLimit/index.vue'),
        },
      ],
    },
  ],
};
