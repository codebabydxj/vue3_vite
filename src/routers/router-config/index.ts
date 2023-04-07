// 将一级页面统一在此处导出
import basic from './basic';
import proTable from './proTable';
import toolsManage from './toolsManage';
import echarts from './echarts';
import assembly from './assembly'
import directives from './directives'

import authManage from './authManage';
// 保持最后引入404页面!!!!!
import error from './error';

export default [
  basic,
  proTable,
  toolsManage,
  echarts,
  assembly,
  directives,
  authManage,
  error
];
