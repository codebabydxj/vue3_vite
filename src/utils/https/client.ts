/**
 * 引用 + API
 * import { client } from "@/utils/https/client";
 * import * as API from "@/config/api";
 */
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import type { Method } from "axios";
import axiosRetry from "axios-retry";
import jsonpAdapter from "axios-jsonp";
import { showLoading, hideLoading } from "@/config/fullLoading";
import { ElMessage } from "element-plus";
import qs from "qs";
import dayjs from "dayjs";
import { checkStatus } from "./checkStatus"
import routers from "@/routers"
import { useGlobalStore } from "@/store";
import { jsonConfig, apiConfig, uploadConfig } from "@/config/api/config";

const instance: AxiosInstance = axios.create({
  baseURL: apiConfig.baseURL, // 默认请求地址
  timeout: apiConfig.timeout, // 请求超时时间
  headers: jsonConfig.headers, // 请求头默认是json
  withCredentials: apiConfig.withCredentials, // 跨域允许携带cookie
});

// 取消重复请求处理
const pending: any = [];
const removePending = (config: requestConfig) => {
	let pendingIndex: any = pending.findIndex((v: any) => {
		if (
			config.url === v.url &&
			config.method === v.method &&
			JSON.stringify(config.params) === JSON.stringify(v.params) &&
			JSON.stringify(config.data) === JSON.stringify(v.data)
		) {
      setTimeout(() => {
        v.controller.abort();
      }, 1000)
			return true;
		}
		return false;
	});
	if (pendingIndex >= 0) {
		pending.splice(pendingIndex, 1);
	}
};

// 请求失败之后，自动重新请求，只有两次失败才是真正结束
axiosRetry(instance, { retries: 1 })

interface requestConfig extends InternalAxiosRequestConfig {
  controller?: any;
  noLoading?: boolean;
}

/**
 * @description 请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
 */
instance.interceptors.request.use((config: requestConfig) => {
  removePending(config);
  const myStore: any = useGlobalStore();
  const controller = new AbortController();
  // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: API.loadingConfig -> { noLoading: true } 来控制
  config.noLoading || showLoading();
  config.signal = controller.signal;
  config.controller = controller;
  pending.push({ ...config });
  const token: string | null | undefined = myStore.userInfo.token;
  if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data);
  }
  if (token) config.headers['Authorization'] = token;
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error);
});

const downloadFile = (data: Blob, type: string = 'application/vnd.ms-excel', headers: any) => {
  const fileName = headers.split('=').pop()
  const name = fileName.split('.')
  const blob = new Blob([data], { type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  const time = dayjs().format('YYYYMMDDhhmmss')
  link.href = url
  link.download = decodeURIComponent(name[0]) + '-' + time + '.' + name[1]
  link.click()
  window.URL.revokeObjectURL(url)
}

interface ResponseType {
  code: number,
  data: any,
  msg?: any,
  [x: string]: any
}

/**
 * @description 响应拦截器
 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
 */
instance.interceptors.response.use((response: AxiosResponse) => {
  const { data, config } = response;
  removePending(config);
  hideLoading();
  if (response.status === 200) {
    if (response.request.responseType === 'blob') {
      return response
    }
    if ([1, 200].includes(data.code)) {
      return data;
    }
  }
  // 其他错误信息拦截
  ElMessage({
    showClose: true,
    message: data.msg || `Error: ${response.request.url}`,
    type: 'error',
  });
  return Promise.reject(response);
}, (error: AxiosError) => {
  const myStore: any = useGlobalStore();
  const { response } = error;
  hideLoading();

  // 请求超时 && 网络错误单独判断，没有 response
  if (error.message.indexOf('timeout') !== -1) ElMessage.error('请求超时！请您稍后重试');
  if (error.message.indexOf('Network Error') !== -1) ElMessage.error('网络错误！请您稍后重试');

  // 根据服务器响应的错误状态码，做不同的处理
  if (response) checkStatus(response.status, routers, myStore);

  // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
  if (!window.navigator.onLine) routers.replace('/500');

  return Promise.reject(error);
});
class Api {
  private request(url: string, options: AxiosRequestConfig, headerConfig: any = {}) {
    return new Promise<ResponseType>((resolve, reject) => {
      instance.request({
        url: url,
        ...options,
        ...headerConfig,
      }).then((res: any) => {
        resolve(res);
      }).catch((err: any) => {
        reject(err)
      })
    })
  }
  /** get(url: string, params?:any) */
  public get(url: string, params?: any, headerConfig?: any) {
    return this.request(url, {
      method: 'get',
      params: params,
    }, headerConfig)
  }
  /** post(url: string, data?:any) */
  public post(url: string, data?: any, headerConfig?: any) {
    return this.request(url, {
      method: 'post',
      data: data ?? {},
    }, headerConfig)
  }
  /** upload(url: string, data?:any) */
  public upload(url: string, data: Record<string, any> = {}, file: File) {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append('file', file);
    return this.request(url, {
      method: 'post',
      data: formData,
    }, uploadConfig)
  }
  /** download(url: string, data?:any, method: Method = 'post | get') */
  public async download(url: string, data?: any, method: Method = 'post') {
    const reqDate: AxiosRequestConfig = {
      method: method,
      responseType: 'blob',
    }
    if (method === 'post') reqDate.data = data
    if (method === 'get') reqDate.params = data
    const res = await this.request(url, reqDate)
    downloadFile(res.data, res.data.type, res.headers['content-disposition'])
  }
  /** blobToBuffer(url: string, data?:any, method: Method = 'post | get') */
  public async blobToBuffer(url: string, data?: any, method: Method = 'post') {
    const reqDate: AxiosRequestConfig = {
        method: method,
        responseType: 'blob',
    }
    if (method === 'post') reqDate.data = data
    if (method === 'get') reqDate.params = data
    const res = await this.request(url, reqDate)
    const blob = new Blob([res.data], { type: res.data.type })
    return await blob.arrayBuffer()
  }
  /** jsonp(url: string, params?:any) 这样可以让 Axios 支持 jsonp 的功能 */
  public jsonp(url: string, params?: any, headerConfig: any = { adapter: jsonpAdapter }) {
    return this.request(url, {
      method: 'get',
      params: params,
    }, headerConfig)
  }
}

const client = new Api();

export { client }