import { ElMessage } from "element-plus";
import { LOGIN_URL } from "@/config";

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number, routers: any, myStore: any) => {
  switch (status) {
    case 400:
      ElMessage.error("请求失败！请您稍后重试");
      break;
    case 401:
      // toke过期，重新登录
      myStore.logout()
      routers.replace(LOGIN_URL);
      break;
    case 403:
      ElMessage({
        showClose: true,
        message: '当前账号无权限访问，请授权之后再处理！',
        type: 'error',
      });
      routers.replace('/403');
      break;
    case 404:
      ElMessage.error("你所访问的资源不存在！");
      routers.replace('/404');
      break;
    case 405:
      ElMessage.error("请求方式错误！请您稍后重试");
      break;
    case 408:
      ElMessage.error("请求超时！请您稍后重试");
      break;
    case 500:
      ElMessage.error("服务异常，请联系管理员！");
      routers.replace('/500');
      break;
    case 502:
      ElMessage.error("网关错误！");
      break;
    case 503:
      ElMessage.error("服务不可用！");
      break;
    case 504:
      ElMessage.error("网关超时！");
      break;
    default:
      ElMessage.error("请求失败！");
  }
};
