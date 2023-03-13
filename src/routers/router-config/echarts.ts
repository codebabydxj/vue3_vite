export default {
  key: 'echarts',
  title: 'Echarts',
  icon: 'TrendCharts',
  access: true,
  routes: [
    {
      path: '/waterChart',
      key: 'waterChart',
      access: true,
      meta: {
        permission: {},
      },
      title: '水球图',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'waterChart',
          component: () => import('../../views/echarts/waterChart/index.vue'),
        }
      ],
    },
    {
      path: '/columnChart',
      key: 'columnChart',
      access: true,
      meta: {
        permission: {},
      },
      title: '柱状图',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'columnChart',
          component: () => import('../../views/echarts/columnChart/index.vue'),
        }
      ],
    },
    {
      path: '/lineChart',
      key: 'lineChart',
      access: true,
      meta: {
        permission: {},
      },
      title: '折线图',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'lineChart',
          component: () => import('../../views/echarts/lineChart/index.vue'),
        }
      ],
    },
    {
      path: '/pieChart',
      key: 'pieChart',
      access: true,
      meta: {
        permission: {},
      },
      title: '饼图',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'pieChart',
          component: () => import('../../views/echarts/pieChart/index.vue'),
        }
      ],
    },
    {
      path: '/radarChart',
      key: 'radarChart',
      access: true,
      meta: {
        permission: {},
      },
      title: '雷达图',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'radarChart',
          component: () => import('../../views/echarts/radarChart/index.vue'),
        }
      ],
    },
    {
      path: '/nestedChart',
      key: 'nestedChart',
      access: true,
      meta: {
        permission: {},
      },
      title: '嵌套环形图',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'nestedChart',
          component: () => import('../../views/echarts/nestedChart/index.vue'),
        }
      ],
    }
  ],
};
