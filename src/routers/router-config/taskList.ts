export default {
  key: 'taskList',
  title: '任务清单',
  icon: 'List',
  access: true,
  routes: [
    {
      path: '/waitList',
      key: 'waitList',
      access: true,
      meta: {
        permission: {},
      },
      title: '待办事务',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'waitList',
          component: () => import('../../views/taskList/waitList/index.vue'),
        },
      ],
    },
    {
      path: '/doneList',
      key: 'doneList',
      access: true,
      meta: {
        permission: {},
      },
      title: '已办事务',
      component: () => import('../../views/middleView/index.vue'),
      children: [
        {
          path: '',
          name: 'doneList',
          component: () => import('../../views/taskList/doneList/index.vue'),
        },
      ],
    },
  ],
};
