// 将一级页面统一在此处导出
import basic from './basic';
import userManage from './userManage';
import taskList from './taskList';
import toolsManage from './toolsManage';
import authManage from './authManage';

// 保持最后引入404页面!!!!!
import error from './error';

export default [
  basic,
  userManage,
  taskList,
  toolsManage,
  authManage,
  error
];
