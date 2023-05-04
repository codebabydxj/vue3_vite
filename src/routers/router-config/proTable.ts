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
      },
      title: '使用 ProTable',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'useProTable',
          component: () => import('../../views/proTable/useProTable/index.vue'),
        },
      ],
    },
    {
      path: '/useTreeFilter',
      key: 'useTreeFilter',
      access: true,
      meta: {
        permission: {},
      },
      title: '使用 TreeFilter',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'useTreeFilter',
          component: () => import('../../views/proTable/useTreeFilter/index.vue'),
        },
      ],
    },
  ],
};
