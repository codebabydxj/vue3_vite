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
      },
      title: 'SVG 图标',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'svgIcon',
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
      },
      title: '树形筛选器',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'treeFilter',
          component: () => import('../../views/assembly/treeFilter/index.vue'),
        }
      ],
    },
    {
      path: '/bachImport',
      key: 'bachImport',
      access: true,
      meta: {
        permission: {},
      },
      title: '批量添加数据',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'bachImport',
          component: () => import('../../views/assembly/bachImport/index.vue'),
        }
      ],
    },
  ],
};
