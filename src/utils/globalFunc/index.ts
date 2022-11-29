/**
 * 调用下面方法前必须先拿到全局注册
 * 1. const globalFunc: any = inject('globalFunc')  通过inject获取挂载在全局的globalFunc方法
 * 
 * 打开页面
 * 1. 一级页面（使用绝对路径） globalFunc.openView('/a');
 * 2. 二级页面（使用相对路径） globalFunc.openView('a/b');
 * 3. 如果进入到由别的路由控制下的页面，要返回前一个页面 globalFunc.openView('/a/b', true);  否则返回它自己的父级页面就不用带true
 *
 * 返回
 * 二级路由返回一级路由  globalFunc.goView();
 *
 * 关闭路由
 * globalFunc.closeView();
 *
 * 刷新重置
 * globalFunc.refreshView();
 * 
 * 需要刷新的url
 * fullPath
 * 
 */

import { nextTick } from 'vue';
import { globalStore } from '@/store'
import routers from '@/routers'

const useGlobalStore: any = globalStore()
const routerConfig: any = useGlobalStore.routerConfig
const backPathKey: any = 'backPath';
let fullPath: any = null;
let query: any = {};
let willOpenPath: any = '';

routers.beforeEach(async (to: any) => {
  query = to.query;
  if (to.fullPath !== '/welcome/_empty') {
    fullPath = to.fullPath;
  }
})

const globalFunc = {
  // 初始化
  initView: () => {
    console.log(`%c【全局路由】- 初始化完成···`, 'color: #009acc')
    const rootPath: any = fullPath.match(/^\/[a-zA-Z0-9\_\-]*/)[0];
    if (rootPath === useGlobalStore.currentRoute) return;
    const route: any = {
      title: getTitleByPath(rootPath),
      route: rootPath,
      realPath: fullPath,
    };
    useGlobalStore.setCurrentRoute(rootPath);
    useGlobalStore.addRoute(route);
  },
  
  // 打开页面
  openView: (path: any, needBackPath: any = false) => {
    console.log(`%c【全局路由】- 打开新页面···`, 'color: #67C23A')
    // 需要指定返回路径的情况，将返回的路径拼接到参数中
    if (needBackPath) {
      path = addParamInPath(path, backPathKey, fullPath);
    }
    willOpenPath = path;
    // 一级路由
    const rootPath: any = path.match(/^\/[a-zA-Z0-9\_\.\-]*/)[0];
    const curRoute: any = useGlobalStore.routes.find((item: any) => item.route === rootPath);
    if (!curRoute) {
      // tab没有则添加
      const route: any = {
        title: getTitleByPath(rootPath),
        route: rootPath,
        realPath: path,
      };
      useGlobalStore.addRoute(route);
    } else {
      // tab栏已存在，如果是单纯切换，则跳转至realPath，否则更新realPath
      if (curRoute.route === path) {
        willOpenPath = curRoute.realPath;
      } else {
        const index: any = useGlobalStore.routes.findIndex((item: any) => item.route === curRoute.route);
        useGlobalStore.updateRoute({ index, route: { realPath: path } });
      }
    }
    useGlobalStore.setCurrentRoute(rootPath);
    routers.replace(willOpenPath).catch((err: any) => {});
  },

  // 关闭页面
  closeView: (path: any) => {
    console.log(`%c【全局路由】- 关闭页面···`, 'color: red')
    // 一级路由
    const rootPath: any = path.match(/^\/[a-zA-Z0-9\_\.\-]+/)[0];
    const index: any = useGlobalStore.routes.findIndex((item: any) => item.route === rootPath);
    // 切换至下一个或上一个标签
    const nextTab: any = useGlobalStore.routes[index + 1] || useGlobalStore.routes[index - 1];
    if (nextTab) {
      globalFunc.openView(nextTab.route);
    }
    // 点击删除tab标签
    useGlobalStore.delRoute({ index, count: 1 })
    // 全部删除时回到欢迎界面
    if (useGlobalStore.routes.length === 0) {
      globalFunc.openView('/welcome');
    }
  },

  // 返回上级页面
  goView: () => {
    console.log(`%c【全局路由】- 返回上级页面···`, 'color: #b88230')
    // 如果存在backPath这个查询参数，就返回到backPath
    if (query[backPathKey]) {
      globalFunc.openView(query[backPathKey]);
      return;
    }
    // 清除realPath
    const route: any = useGlobalStore.routes.find((item: any) => item.route === useGlobalStore.currentRoute);
    route.realPath = useGlobalStore.currentRoute;
    routers.replace(useGlobalStore.currentRoute);
  },

  // 重置页面
  refreshView: () => {
    console.log(`%c【全局路由】- 重置页面···`, 'color: #ff65fb')
    // 需要刷新的url
    const _fullPath: any = fullPath;
    routers.replace('/welcome/_empty');
    nextTick(() => {
      routers.replace(_fullPath);
    });
  },

}

// 根据path，从store的routerConfig查找相应的title
const getTitleByPath = (path: any) => {
  path = path.split('?')[0];
  let result: any = '';
  for (let i = 0; i < routerConfig.length; i++) {
    var s = routerConfig[i].routes.find((item: any) => item.path === path);
    if (s) {
      result = s.title;
      break;
    }
  };
  return result;
};

const addParamInPath = (path: any, key: any, value: any) => {
  const symbol: any = path.indexOf('?') === -1 ? '?' : '&';
  return `${path}${symbol}${key}=${value}`;
};

export { globalFunc };