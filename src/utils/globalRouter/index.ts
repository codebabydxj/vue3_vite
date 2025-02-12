/**
 * 调用下面方法前必须先拿到全局注册
 * 1. const Router: any = inject('Router');  通过inject获取挂载在全局的globalRouter方法
 * 
 * 打开页面
 * 1. 一级页面（使用绝对路径） Router.openView('/a');
 * 2. 二级页面（使用相对路径） Router.openView('/a/b');
 * 3. 如果进入到由别的路由控制下的页面，要返回前一个页面 Router.openView('/a/b', true);  否则返回它自己的父级页面就不用带true
 *
 * 返回
 * 二级路由返回一级路由  Router.goView();
 *
 * 关闭路由
 * Router.closeView('route');
 *
 * 刷新重置
 * Router.refreshView();
 * 
 * 需要刷新的url
 * fullPath
 * 
 */

import { nextTick } from "vue";
import routers from "@/routers";
import { useGlobalStore } from "@/store";
import { useKeepAliveStore } from "@/store/keepAlive";
import { HOME_URL } from "@/config";

let myStore: any = null;
let keepAliveStore: any = null;
let flatMenuList: any = [];
const backPathKey: any = "backPath";
let fullPath: any = null;
let curName: any = null;
let query: any = null;
let isKeepAlive: any = false;

routers.beforeEach((to: any) => {
  myStore = useGlobalStore() /** 一切为成形之前，使用store，store必须放在路由守卫，否则报错，没有注册pinia??? */
  keepAliveStore = useKeepAliveStore();
  flatMenuList = myStore.flatMenuList
  query = to.query;
  if (to.fullPath !== '/empty') {
    curName = to.name;
    fullPath = to.fullPath;
    isKeepAlive = to.meta?.isKeepAlive ?? false;
  }
})

const globalRouter = {
  // 初始化
  initView: () => {
    console.log(`%c【全局路由】- 初始化完成···`, 'color: #009acc')
    let rootPath: any = fullPath.match(/^\/[a-zA-Z0-9\_\-\/]*/)[0];
    // 出现多级路由截取处理成一级路由
    const splitPath: any = rootPath.split('/');
    if (rootPath && rootPath.split('/').length > 3) {
      rootPath = rootPath.slice(0, rootPath.indexOf(splitPath[3]) - 1);
    }
    if (rootPath === myStore.currentRoute) return;
    const route: any = {
      title: getByPath(rootPath).title,
      name: getByPath(rootPath).name,
      route: rootPath,
      realPath: fullPath,
      close: rootPath === HOME_URL ? false : true
    };
    myStore.setRoute(rootPath, fullPath);
    myStore.addRoute(route);
  },
  
  // 打开页面
  openView: async (path: any, needBackPath: any = false, options: any = null) => {
    console.log(`%c【全局路由】- 打开新页面···`, 'color: #67C23A')
    // 需要指定返回路径的情况，将返回的路径拼接到参数中
    if (needBackPath) {
      path = addParamInPath(path, backPathKey, fullPath);
    }
    let willOpenPath: any = path;
    // 一级路由
    const matchPath: any = path.match(/^\/[a-zA-Z0-9\_\.\-\/]*/)[0];
    let rootPath: any = matchPath;
    // 出现多级路由截取处理成一级路由
    const splitPath: any = matchPath.split('/');
    if (matchPath && splitPath.length > 3) {
      rootPath = matchPath.slice(0, matchPath.indexOf(splitPath[3]) - 1);
    }
    const curRoute: any = await myStore.routes.find((item: any) => item.route === rootPath);
    if (!curRoute) {
      // tab没有则添加
      const route: any = {
        title: getByPath(path).title,
        name: getByPath(path).name,
        route: rootPath,
        realPath: path,
        close: rootPath === HOME_URL ? false : true
      };
      myStore.addRoute(route);
    } else {
      // tab栏已存在，如果是单纯切换，则跳转至realPath，否则更新realPath
      if (curRoute.route === path) {
        curRoute.realPath = options?.onlyUpdateRouter ? path : curRoute.realPath;
        if (options?.name) curRoute.name = options.name;
        if (options?.close) curRoute.close = options.close;
        willOpenPath = curRoute.realPath;
      } else {
        const index: any = myStore.routes.findIndex((item: any) => item.route === curRoute.route);
        myStore.updateRoute({ index, route: { realPath: path, name: getByPath(path).name } });
      }
    }
    myStore.setRoute(rootPath, willOpenPath);
    if (options?.onlyUpdateRouter) return;
    routers.replace(willOpenPath).catch((err: any) => {});
  },

  // 关闭页面
  closeView: (path: any) => {
    console.log(`%c【全局路由】- 关闭页面···`, 'color: red')
    // 一级路由
    const rootPath: any = path.match(/^\/[a-zA-Z0-9\_\.\-\/]+/)[0];
    const index: any = myStore.routes.findIndex((item: any) => item.route === rootPath);
    // 切换至下一个或上一个标签
    const nextTab: any = myStore.routes[index + 1] || myStore.routes[index - 1];
    if (nextTab) {
      globalRouter.openView(nextTab.route);
    }
    // 点击删除tab标签
    myStore.delRoute({ index, count: 1 })
    // 全部删除时回到首页
    if (myStore.routes.length === 0) {
      globalRouter.openView(HOME_URL);
    }
    // 更新缓存
    const updateName = myStore.routes.map((i: any) => i.name);
    isKeepAlive && keepAliveStore.updateKeepAliveName(updateName as string[]);
  },

  // 返回上级页面
  goView: () => {
    console.log(`%c【全局路由】- 返回上级页面···`, 'color: #b88230')
    // 移除缓存
    isKeepAlive && keepAliveStore.removeKeepAliveName(curName as string);
    // 如果存在backPath这个查询参数，就返回到backPath
    if (query && query[backPathKey]) {
      globalRouter.openView(query[backPathKey]);
      return;
    }
    // 重置 realPath、name
    const route: any = myStore.routes.find((item: any) => item.route === myStore.currentRoute);
    if (route.realPath === route.route) { // 当前是一级路由
      route.realPath = myStore.currentRoute;
    } else { // 二级以上路由则一层层处理
      route.realPath = handleRealPath(route.realPath)
    }
    route.name = getByPath(route.realPath).name;
    route.close = route.realPath === HOME_URL ? false : true;
    routers.replace(route.realPath);
  },

  // 重置页面
  refreshView: async () => {
    console.log(`%c【全局路由】- 重置页面···`, 'color: #ff65fb')
    // 移除缓存
    isKeepAlive && keepAliveStore.removeKeepAliveName(curName as string);
    // 需要刷新的url
    const _fullPath: any = fullPath;
    await routers.replace('/empty');
    nextTick(() => {
      isKeepAlive && keepAliveStore.addKeepAliveName(curName as string);
      routers.replace(_fullPath);
    });
  }
}

// 根据path，从store的flatMenuList查找相应的title
const getByPath = (fullpath: any) => {
  fullpath = fullpath.split('?')[0];
  let result: any = { title: '', name: '' };
  const s: any = flatMenuList.find((item: any) => item.path === fullpath);
  if (s) {
    result = {
      title: s.meta.title,
      name: s.name
    }
  }
  return result;
};

const addParamInPath = (path: any, key: any, value: any) => {
  const symbol: any = path.indexOf('?') === -1 ? '?' : '&';
  return `${path}${symbol}${key}=${value}`;
};

const handleRealPath = (path: any) => {
  let newPath: any = '';
  let searchStr: any = ''; // 暂存查询字符串
  let _path: any = path.slice(0, path.lastIndexOf('/'));
  if (path.indexOf('?') > -1) {
    searchStr = path.slice(path.indexOf('?'));
    const str: any = path.slice(0, path.indexOf('?'));
    _path = str.slice(0, str.lastIndexOf('/'));
  }
  newPath = _path;
  return newPath
};

export { globalRouter };