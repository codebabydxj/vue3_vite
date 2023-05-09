export default {
  key: 'assembly',
  title: '常用组件',
  icon: 'Briefcase',
  access: true,
  routes: [
    {
      path: '/svgIcon',
      key: 'svgIcon',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: 'SVG 图标',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'SvgIcon',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/assembly/svgIcon/index.vue'),
        }
      ],
    },
    {
      path: '/treeFilter',
      key: 'treeFilter',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '树形筛选器',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'TreeFilter',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/assembly/treeFilter/index.vue'),
        }
      ],
    },
    {
      path: '/batchImport',
      key: 'batchImport',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '批量添加数据',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'BatchImport',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/assembly/batchImport/index.vue'),
        }
      ],
    },
    {
      path: '/selectIcon',
      key: 'selectIcon',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '图标选择器',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'SelectIcon',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/assembly/selectIcon/index.vue'),
        }
      ],
    },
  ],
};
