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
      title: '使用ProTable',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'useProTable',
          component: () => import('../../views/proTable/useProTable/index.vue'),
        },
      ],
    },
  ],
};
