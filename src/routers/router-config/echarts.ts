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
        isKeepAlive: true
      },
      title: '水球图',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'WaterChart',
          meta: {
            permission: {},
            isKeepAlive: true
          },
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
        isKeepAlive: true
      },
      title: '柱状图',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'ColumnChart',
          meta: {
            permission: {},
            isKeepAlive: true
          },
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
        isKeepAlive: true
      },
      title: '折线图',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'LineChart',
          meta: {
            permission: {},
            isKeepAlive: true
          },
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
        isKeepAlive: true
      },
      title: '饼图',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'PieChart',
          meta: {
            permission: {},
            isKeepAlive: true
          },
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
        isKeepAlive: true
      },
      title: '雷达图',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'RadarChart',
          meta: {
            permission: {},
            isKeepAlive: true
          },
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
        isKeepAlive: true
      },
      title: '嵌套环形图',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'NestedChart',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/echarts/nestedChart/index.vue'),
        }
      ],
    }
  ],
};
