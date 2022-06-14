/**
 * 所有API接口统一从此处对外暴露，防止各个模块ts文件合并代码发生不必要的冲突
 * 引入方式：import * API from '@/utils/server'
 * 不同的大菜单就在server文件下建立ts接口文件引入
 * 调用：API.login
 */

 export * from './config'; // 基础服务
 export * from './auth'; // 登录、用户权限、验证码、权限等公共接口
 