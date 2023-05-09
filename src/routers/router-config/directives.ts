export default {
  key: 'directives',
  title: '自定义指令',
  icon: 'Opportunity',
  access: true,
  routes: [
    {
      path: '/copyDirect',
      key: 'copyDirect',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '复制指令',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'CopyDirect',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/directives/copyDirect/index.vue'),
        }
      ],
    },
    {
      path: '/watermarkDirect',
      key: 'watermarkDirect',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '水印指令',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'WatermarkDirect',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/directives/watermarkDirect/index.vue'),
        }
      ],
    },
    {
      path: '/dragDirect',
      key: 'dragDirect',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '拖拽指令',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'DragDirect',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/directives/dragDirect/index.vue'),
        }
      ],
    },
    {
      path: '/debounceDirect',
      key: 'debounceDirect',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '防抖指令',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'DebounceDirect',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/directives/debounceDirect/index.vue'),
        }
      ],
    },
    {
      path: '/throttleDirect',
      key: 'throttleDirect',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '节流指令',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'ThrottleDirect',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/directives/throttleDirect/index.vue'),
        }
      ],
    },
    {
      path: '/longpressDirect',
      key: 'longpressDirect',
      access: true,
      meta: {
        permission: {},
        isKeepAlive: true
      },
      title: '长按指令',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'LongpressDirect',
          meta: {
            permission: {},
            isKeepAlive: true
          },
          component: () => import('../../views/directives/longpressDirect/index.vue'),
        }
      ],
    }
  ],
};
