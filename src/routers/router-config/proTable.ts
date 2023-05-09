export default {
  key: 'proTable',
  title: '超级表格',
  icon: 'TableOutlined',
  access: true,
  routes: [
    {
      path: '/useProTable',
      key: 'useProTable',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '使用 ProTable',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'UseProTable',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/proTable/useProTable/index.vue'),
        },
        {
          path: 'details',
          name: 'Details',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/proTable/useProTable/details.vue'),
        },
      ],
    },
    {
      path: '/useTreeFilter',
      key: 'useTreeFilter',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '使用 TreeFilter',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'UseTreeFilter',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/proTable/useTreeFilter/index.vue'),
        },
      ],
    },
  ],
};
