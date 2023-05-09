/**
 * 调用下面方法前必须先拿到全局注册
 * 1. const globalRouter: any = inject('globalRouter')  通过inject获取挂载在全局的globalRouter方法
 * 
 * 打开页面
 * 1. 一级页面（使用绝对路径） globalRouter.openView('/a');
 * 2. 二级页面（使用相对路径） globalRouter.openView('/a/b');
 * 3. 如果进入到由别的路由控制下的页面，要返回前一个页面 globalRouter.openView('/a/b', true);  否则返回它自己的父级页面就不用带true
 *
 * 返回
 * 二级路由返回一级路由  globalRouter.goView();
 *
 * 关闭路由
 * globalRouter.closeView();
 *
 * 刷新重置
 * globalRouter.refreshView();
 * 
 * 需要刷新的url
 * fullPath
 * 
 */

import { nextTick } from 'vue'
import routers from '@/routers'
import { globalStore } from '@/store'
import { useKeepAliveStore } from '@/store/keepAlive'

let myStore: any = null
let keepAliveStore: any = null
let routerConfig: any = []
const backPathKey: any = 'backPath';
let fullPath: any = null;
let curName: any = null;
let query: any = null;

routers.beforeEach((to: any) => {
  myStore = globalStore() /** 一切为成形之前，使用store，store必须放在路由守卫，否则报错，没有注册pinia??? */
  keepAliveStore = useKeepAliveStore();
  routerConfig = myStore.routerConfig
  query = to.query;
  if (to.fullPath !== '/home/_empty') {
    curName = to.name;
    fullPath = to.fullPath;
  }
})

const globalRouter = {
  // 初始化
  initView: () => {
    console.log(`%c【全局路由】- 初始化完成···`, 'color: #009acc')
    const rootPath: any = fullPath.match(/^\/[a-zA-Z0-9\_\-]*/)[0];
    if (rootPath === myStore.currentRoute) return;
    const route: any = {
      title: getByPath(rootPath, fullPath).title,
      name: getByPath(rootPath, fullPath).name,
      route: rootPath,
      realPath: fullPath,
    };
    myStore.setCurrentRoute(rootPath);
    myStore.addRoute(route);
  },
  
  // 打开页面
  openView: (path: any, needBackPath: any = false) => {
    console.log(`%c【全局路由】- 打开新页面···`, 'color: #67C23A')
    // 需要指定返回路径的情况，将返回的路径拼接到参数中
    if (needBackPath) {
      path = addParamInPath(path, backPathKey, fullPath);
    }
    let willOpenPath: any = path;
    // 一级路由
    const rootPath: any = path.match(/^\/[a-zA-Z0-9\_\.\-]*/)[0];
    const curRoute: any = myStore.routes.find((item: any) => item.route === rootPath);
    if (!curRoute) {
      // tab没有则添加
      const route: any = {
        title: getByPath(rootPath, path).title,
        name: getByPath(rootPath, path).name,
        route: rootPath,
        realPath: path,
      };
      myStore.addRoute(route);
    } else {
      // tab栏已存在，如果是单纯切换，则跳转至realPath，否则更新realPath
      if (curRoute.route === path) {
        willOpenPath = curRoute.realPath;
      } else {
        const index: any = myStore.routes.findIndex((item: any) => item.route === curRoute.route);
        myStore.updateRoute({ index, route: { realPath: path, name: getByPath(rootPath, path).name } });
      }
    }
    myStore.setCurrentRoute(rootPath);
    routers.replace(willOpenPath).catch((err: any) => {});
  },

  // 关闭页面
  closeView: (path: any) => {
    console.log(`%c【全局路由】- 关闭页面···`, 'color: red')
    // 一级路由
    const rootPath: any = path.match(/^\/[a-zA-Z0-9\_\.\-]+/)[0];
    const index: any = myStore.routes.findIndex((item: any) => item.route === rootPath);
    // 切换至下一个或上一个标签
    const nextTab: any = myStore.routes[index + 1] || myStore.routes[index - 1];
    if (nextTab) {
      globalRouter.openView(nextTab.route);
    }
    // 点击删除tab标签
    myStore.delRoute({ index, count: 1 })
    // 全部删除时回到欢迎界面
    if (myStore.routes.length === 0) {
      globalRouter.openView('/home');
    }
    // 更新缓存
    const updateName = myStore.routes.map((i: any) => i.name);
    keepAliveStore.updateKeepAliveName(updateName as string[]);
  },

  // 返回上级页面
  goView: () => {
    console.log(`%c【全局路由】- 返回上级页面···`, 'color: #b88230')
    // 移除缓存
    keepAliveStore.removeKeepAliveName(curName as string)
    // 如果存在backPath这个查询参数，就返回到backPath
    if (query && query[backPathKey]) {
      globalRouter.openView(query[backPathKey]);
      return;
    }
    // 重置 realPath、name
    const route: any = myStore.routes.find((item: any) => item.route === myStore.currentRoute);
    route.realPath = myStore.currentRoute;
    route.name = getByPath(myStore.currentRoute, route.route).name;
    routers.replace(myStore.currentRoute);
  },

  // 重置页面
  refreshView: async () => {
    console.log(`%c【全局路由】- 重置页面···`, 'color: #ff65fb')
    // 移除缓存
    keepAliveStore.removeKeepAliveName(curName as string)
    // 需要刷新的url
    const _fullPath: any = fullPath;
    await routers.replace('/home/_empty');
    nextTick(() => {
      keepAliveStore.addKeepAliveName(curName as string)
      routers.replace(_fullPath);
    });
  },

}

// 根据path，从store的routerConfig查找相应的title
const getByPath = (rootpath: any, fullpath: any) => {
  rootpath = rootpath.split('?')[0];
  const childs: any = fullpath.split('/').filter((i: any) => i !== '');
  let result: any = {};
  for (let i = 0; i < routerConfig.length; i++) {
    const s: any = routerConfig[i].routes.find((item: any) => item.path === rootpath);
    const sname: any = s && s.children.find((i: any) => i.path === '').name
    const n: any = routerConfig[i].routes[0].children.find((item: any) => item.path === childs[childs.length - 1]);
    if (s && n) {
      result = {
        title: s.title,
        name: n.name
      }
      break;
    }
    if (s) {
      result = {
        title: s.title,
        name: sname
      }
      break;
    }
  };
  return result;
};

const addParamInPath = (path: any, key: any, value: any) => {
  const symbol: any = path.indexOf('?') === -1 ? '?' : '&';
  return `${path}${symbol}${key}=${value}`;
};

export { globalRouter };