/**
 * 引用 + API
 * import { client } from "@/utils/https/client";
 * import { api-name } from "@/config/api"; || import * as API from "@/config/api";
 */
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import type { Method } from "axios";
import jsonpAdapter from "axios-jsonp";
import { showLoading, hideLoading } from "@/config/fullLoading";
import { ElMessage } from "element-plus";
import qs from "qs";
import { checkStatus } from "./checkStatus"
import { AxiosCanceler } from "./axiosCancel";
import routers from "@/routers"
import { useGlobalStore } from "@/store";
import { jsonConfig, apiConfig, uploadConfig } from "@/config/api/config";
import { downloadFile, viewPdf } from "../downViewFile";

const instance: AxiosInstance = axios.create({
  baseURL: apiConfig.baseURL, // 默认请求地址
  timeout: apiConfig.timeout, // 请求超时时间
  headers: jsonConfig.headers, // 请求头默认是json
  withCredentials: apiConfig.withCredentials, // 跨域允许携带cookie
});

// 请求成功响应数据返回的code， 根据实际开发项目扩展，默认是200
const ResponseDataCode: number[] = [200]

export interface requestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
  cancel?: boolean;
}

const axiosCanceler = new AxiosCanceler();

/**
 * @description 请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
 */
instance.interceptors.request.use((config: requestConfig) => {
  const myStore: any = useGlobalStore();
  // 重复请求不需要取消，在 api 服务中通过指定的第三个参数: { cancel: false } 来控制
  config.cancel ??= true;
  config.cancel && axiosCanceler.addPending(config);
  // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { loading: false } 来控制
  config.loading ??= true;
  config.loading && showLoading();
  const token: string | null | undefined = myStore.userInfo.token;
  if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data);
  }
  if (token) config.headers['Authorization'] = token;
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error);
});

/**
 * @description 响应拦截器
 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
 */
instance.interceptors.response.use((response: AxiosResponse & { config: requestConfig }) => {
  const { data, config } = response;
  axiosCanceler.removePending(config);
  config.loading && hideLoading();
  if (response.status === 200) {
    if (response.request?.responseType === 'blob') {
      return response
    }
    if (ResponseDataCode.includes(data.code)) {
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

interface ResponseType {
  code: number,
  data: any,
  msg?: any,
  [x: string]: any
}

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
  /**
   * @param {string} url
   * @param {any} params
   * @param {any} headerConfig
   */
  public get(url: string, params: any = {}, headerConfig?: any) {
    return this.request(url, {
      method: 'get',
      params,
    }, headerConfig)
  }
  /**
   * @param {string} url
   * @param {any} data
   * @param {any} headerConfig
   */
  public post(url: string, data: any = {}, headerConfig?: any) {
    return this.request(url, {
      method: 'post',
      data,
    }, headerConfig)
  }
  /**
   * @param {string} url
   * @param {Record<string, any>} data
   * @param {File} file
   */
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
  /**
   * @param {string} url
   * @param {any} data
   * @param {Method} method
   * @param {boolean} isBlank  是否重新打开一个窗口
   */
  public async download(url: string, data: any = {}, method: Method = 'post', isBlank: boolean = false) {
    const req: AxiosRequestConfig = {
      method: method,
      responseType: 'blob',
    }
    if (method === 'post') req.data = data
    if (method === 'get') req.params = data
    const res = await this.request(url, req)
    if (res.headers["content-type"].includes("json")) {
      let data: any = res.data;
      const fileReader = new FileReader();
      fileReader.readAsText(data);
      fileReader.onload = (res: any) => {
        let jsonData: any = JSON.parse(res.target.result);
        ElMessage({
          message: jsonData?.msg || "请求失败，请联系管理员",
          type: "warning",
        });
      };
      return;
    }
    downloadFile(res.data, res.data.type, res.headers['content-disposition'], isBlank)
  }
  
  /**
   * @param {string} url
   * @param {any} data
   * @param {Method} method
   */
  public async viewPDF(
    url: string,
    data: any = {},
    method: Method = 'post',
  ) {
    const req: AxiosRequestConfig = {
      method: method,
      responseType: "blob",
    };
    if (method === "post") req.data = data;
    if (method === "get") req.params = data;
    const res = await this.request(url, req)
    return viewPdf(res.data);
  }
  /**
   * @param {string} url
   * @param {any} data
   * @param {Method} method
   */
  public async blobToBuffer(url: string, data: any = {}, method: Method = 'post') {
    const req: AxiosRequestConfig = {
        method: method,
        responseType: 'blob',
    }
    if (method === 'post') req.data = data
    if (method === 'get') req.params = data
    const res = await this.request(url, req)
    const blob = new Blob([res.data], { type: res.data.type })
    return await blob.arrayBuffer()
  }
  /**
   * @param {string} url
   * @param {any} params
   * @param {any} headerConfig   让 Axios 支持 jsonp 的功能
  */
  public jsonp(url: string, params: any = {}, headerConfig: any = { adapter: jsonpAdapter }) {
    return this.request(url, {
      method: 'get',
      params,
    }, headerConfig)
  }
}

const client = new Api();

export { client }