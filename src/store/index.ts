/**
 * 使用
 * import { globalStore } from "@/store";
 * const myStore: any = globalStore();
 * 
 * pinia可以直接使用storeToRefs响应式修改state的值
 * import { storeToRefs } from "pinia";
 * let { pagination } = storeToRefs(myStore);
 */
import { createPinia, defineStore } from "pinia";
import piniaPluginPersist from "pinia-plugin-persistedstate";
import piniaPersistConfig from "@/config/piniaPersist";
import { getShowMenuList } from "@/utils/tools";

const globalStore = defineStore({
  /* id: 必须存在，在所有 Store 中唯一 */
	id: 'GlobalState',
  state: () => {
    return {
      currentRoute: '/',
      realRoute: <any>'',
      menuList: <any>[],
      flatMenuList: <any>[],
      authButtonList: <any>{},
      routes: <any>[{title: '首页',  name: 'Home', route: '/basic/home', realPath: '/basic/home' }],
      // 常量
      consts: <any>[],
      userInfo: <any>{},
      winSize: <any>{},
      pagination: <boolean>false,
      maxHeight: <any>'200px',
      lockScreen: <any>{
        lockScreenCode: <any>'',
        unLockBackRoute: <any>'',
      },
      themeConfig: <any>{
        // 默认 主题颜色
        primary: '#409EFF',
        // 深色模式
        isDark: false,
        // 灰色模式
        isGrey: false,
        // 色弱模式
        isWeak: false,
        // 折叠菜单
        isCollapse: true,
        // 转场动画
        isTransition: true,
        // 锁定屏幕
        isLockScreen: false,
        // 引导页
        isOpenGuide: true,
      },
      // 当前页面的 router name，用来做按钮权限筛选
      routeName: '',
    }
  },
  getters: <any>{
    // 按钮权限列表
    authButtonListGet: (state: any) => state.authButtonList,
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    getMenuList: (state: any) => state.menuList,
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
    authMenuListGet: (state: any) => getShowMenuList(state.menuList),
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
      if (route.route !== '/basic/home') {
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
      this.userInfo = {};
      // 2.清空导航栏
      this.currentRoute = '/';
      this.realRoute = '';
      this.routes = [];
      // 3.清空常量
      this.consts = [];
      // 4.重置锁屏
      this.isLockScreen = false;
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

export { pinia, globalStore };