export default {
  key: 'toolsManage',
  title: '工具箱',
  icon: 'StarFilled',
  access: true,
  routes: [
    {
      path: '/editor',
      key: 'editor',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '编辑器',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'Editor',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/toolsManage/editor/index.vue'),
        },
      ],
    },
    {
      path: '/ppt',
      key: 'ppt',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '幻灯片',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'PPT',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/toolsManage/ppt/index.vue'),
        },
      ],
    },
  ],
};
