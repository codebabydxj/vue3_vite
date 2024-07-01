import router from "@/routers/index";
import { client } from '@/utils/https/client';
import { buttonList, loadingConfig, menuList } from '@/config/api';
import { RouteRecordRaw } from "vue-router";
import { ElNotification } from "element-plus";
import { useGlobalStore } from '@/store';
import { treeToList } from "@/utils/tools";

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.vue");

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const myStore: any = useGlobalStore();

  try {
    // 1.获取菜单列表 && 按钮权限列表
    await getAuthMenuList(myStore)
    await getAuthButtonList(myStore)

    // 2.判断当前用户有没有菜单权限
    if (!myStore.getMenuList.length) {
      ElNotification({
        title: "无权限访问",
        message: "当前账号无任何菜单权限，请联系系统管理员！",
        type: "warning",
        duration: 3000
      });
      myStore.logout();
      router.replace('/login');
      return Promise.reject("No permission");
    }

    // 3.扁平化之后的一维数组菜单，主要用来添加动态路由
    await flatMenuListGet(myStore, myStore.getMenuList)
    
    // 4.添加动态路由
    myStore.flatMenuList.forEach((item: any) => {
      item.children && delete item.children;
      if (item.component && typeof item.component == "string") {
        item.component = modules["/src/views" + item.component + ".vue"];
      }
      if (item.meta.isFull) {
        router.addRoute(item as unknown as RouteRecordRaw);
      } else {
        router.addRoute("Main", item as unknown as RouteRecordRaw);
      }
    });
  } catch (error) {
    // 当按钮 || 菜单请求出错时，重定向到登陆页
    myStore.logout();
    router.replace('/login');
    return Promise.reject(error);
  }
};

// 获取权限按钮列表
const getAuthButtonList = async (store: any) => {
  let res: any = await client.get(buttonList, {}, loadingConfig)
  store.setAuthButtonList((res.data && Object.keys(res.data).length > 0) ? res.data : {})
}

// 获取菜单列表
const getAuthMenuList = async (store: any) => {
  let res: any = await client.get(menuList, {}, loadingConfig)
  store.setMenuList(res.data.length ? res.data : [])
}

// 扁平化路由
const flatMenuListGet = async (store: any, menuList: any) => {
  store.setFlatMenuList(treeToList(menuList))
}