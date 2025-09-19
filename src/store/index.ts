/**
 * 使用
 * import { useGlobalStore } from "@/store";
 * const myStore: any = useGlobalStore();
 * 
 * pinia可以直接使用storeToRefs响应式修改state的值
 * import { storeToRefs } from "pinia";
 * let { pagination } = storeToRefs(myStore);
 */
import { createPinia, defineStore } from "pinia";
import piniaPluginPersist from "pinia-plugin-persistedstate";
import piniaPersistConfig from "./helper/piniaPersist";
import { getShowMenuList, getFlatMenuList, getAllBreadcrumbList, getHeadMenuList } from "@/utils/tools";
import { HOME_URL } from "@/config";
import { TransitionAnimation } from "./interface";

/* id: GlobalState, 必须存在，在所有 Store 中唯一 */
const useGlobalStore = defineStore('GlobalState', {
  state: () => ({
    currentRoute: '/',
    realRoute: <any>'',
    menuList: <any>[],
    flatMenuList: <any>[],
    authButtonList: <any>{},
    routes: [{ title: '首页',  name: 'Home', route: HOME_URL, realPath: HOME_URL, close: false }],
    routeName: '', // 当前页面的 router name，用来做按钮权限筛选
    consts: <any>[], // 常量
    userInfo: <any>{},
    winSize: <any>{},
    pagination: <boolean>false,
    maxHeight: <any>'200px',
    lockScreen: <any>{
      lockScreenCode: <any>'',
      unLockBackRoute: <any>'',
    },
    themeConfig: <any>{
      // 布局风格 (经典：classic | 横向：transverse | 混合：mix)
      layoutType: "classic",
      // 默认 主题颜色
      primary: '#409EFF',
      // Element-Plus 组件大小
      assemblySize: 'default',
      // 当前系统语言
      language: null,
      // 浅色模式
      isLight: true,
      // 深色模式
      isDark: false,
      // 跟随系统
      isWindowMode: false,
      // 哀悼模式
      isGrey: false,
      // 色弱模式
      isWeak: false,
      // 侧边栏浅色
      sidebarLight: false,
      // 折叠菜单
      isCollapse: true,
      // 菜单手风琴
      accordion: true,
      // 面包屑
      isBreadcrumb: true,
      // 转场动画
      transitionAnimation: 'fade-side' as TransitionAnimation,
      // 锁定屏幕
      isLockScreen: false,
      // 引导页
      isOpenGuide: true,
      // 登录界面主题更换
      isReplaceNewLoginPage: true,
      // 页面水印
      isWatermark: false,
      // 防止调试
      preventDebug: false,
    },
  }),
  getters: <any>{
    // 按钮权限列表
    authButtonListGet: (state: any) => state.authButtonList,
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    getMenuList: (state: any) => state.menuList,
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
    authMenuListGet: (state: any) => getShowMenuList(state.menuList),
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: (state: any) => getFlatMenuList(state.menuList),
    // 菜单权限列表 ==> 第一级菜单，需要剔除 isHide == true
    headMenuListGet: (state: any) => getHeadMenuList(state.menuList),
    // 递归处理后的所有面包屑导航列表
    breadcrumbListGet: (state: any) => getAllBreadcrumbList(state.menuList)
  },
  actions: <any>{
    setMenuList(menuList: any) {
      this.menuList = menuList;
    },
    setFlatMenuList(flatMenuList: any) {
      this.flatMenuList = flatMenuList;
    },
    setAuthButtonList(authButtonList: any) {
      this.authButtonList = authButtonList;
    },
    setRoute(rootPath: any, fullPath: any) {
      this.currentRoute = rootPath;
      this.realRoute = fullPath;
    },
    addRoute(route: any) {
      // 首页不能关闭，过滤掉
      if (route.route !== HOME_URL) {
        this.routes.push(route);
      }
    },
    updateRoute(options: any) {
      Object.keys(this.routes[options.index]).forEach((key) => {
        if (options.route[key]) {
          this.routes[options.index][key] = options.route[key];
        }
      });
    },
    delRoute(options: any) {
      if (options.item) {
        this.routes.splice(options.index, options.count, options.item);
      } else {
        this.routes.splice(options.index, options.count);
      }
    },
    clearRoutes() {
      this.currentRoute = '/';
      this.realRoute = '';
      this.routes = [{ title: '首页',  name: 'Home', route: HOME_URL, realPath: HOME_URL, close: false }];
      this.routeName = '';
    },
    setConsts(consts: any) {
      this.consts = consts;
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    setWinSize(winSize: any) {
      this.winSize = winSize;
    },
    setMaxHeight(maxHeight: any) {
      this.maxHeight = maxHeight;
    },
    setPagination(pagination: any) {
      this.pagination = pagination;
    },
    setThemeConfig(themeConfig: any) {
			this.themeConfig = themeConfig;
		},
    setLockPassword(lockScreen: any) {
      this.lockScreen = lockScreen;
    },
    setRouteName(name: string) {
      this.routeName = name;
    },
    logout() {
      // 1.清空用户信息
      this.setUserInfo({});
      // 2.清空导航栏
      this.clearRoutes();
      // 3.清空常量
      this.setConsts([]);
      // 4.重置锁屏
      this.isLockScreen = false;
      this.setLockPassword({ lockScreenCode: '', unLockBackRoute: '' })
      // 5.清空缓存
      window.localStorage.clear();
      window.sessionStorage.clear();
    },
  },
  persist: piniaPersistConfig('GlobalState', ['themeConfig', 'userInfo', 'lockScreen'])
});

// piniaPluginPersist(持久化存储)
const pinia = createPinia();
pinia.use(piniaPluginPersist);

export { pinia, useGlobalStore };