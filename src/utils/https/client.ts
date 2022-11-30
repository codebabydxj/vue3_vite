/**
 * 使用
 * import { client } from '@/utils/https/client';
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { Method } from 'axios';
import axiosRetry from 'axios-retry'
import jsonpAdapter from 'axios-jsonp'
import { ElMessage, ElNotification } from 'element-plus';
import qs from 'qs';
import dayjs from 'dayjs';
import routers from '@/routers'
import { globalStore } from '@/store'

let store = globalStore();
const instance = axios.create({
  baseURL: '',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  withCredentials: true, // 跨域允许携带cookie
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
			v.controller.abort();
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

interface requestConfig extends AxiosRequestConfig {
  interceptors?: requestConfig,
  headers?: any,
  controller?: any
}

// 请求拦截
instance.interceptors.request.use((config: requestConfig) => {
  removePending(config);
  const controller = new AbortController();
  config.signal = controller.signal;
  config.controller = controller;
  pending.push({ ...config });

  const token: string | null = localStorage.getItem('TOKEN');
  if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data);
  }
  if (token) config.headers['Authorization'] = token;
  return config;
}, (error: Error) => {
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

// 响应拦截
instance.interceptors.response.use((response: AxiosResponse) => {
  if (response.status === 200) {
    if (response.request.responseType === 'blob') {
      return response
    }
    if ([1, 200].includes(response.data.code)) {
      return response.data;
    }
  }
  ElMessage({ // 其他状态提示
    showClose: true,
    message: response.data.msg || `Error: ${response.request.url}`,
    type: 'error',
  });
  return Promise.reject(response);
}, (error: any) => {
  if (error.response.status === 401) {
    // toke过期，重新登录
    store.logout()
    routers.replace('/login');
    return Promise.reject(error.response);
  }
  if (error.response.status === 403) {
    ElMessage({ // 没有权限、未授权/ 服务器错误
      showClose: true,
      message: '没有权限，请授权之后再处理！',
      type: 'error',
    });
    return Promise.reject(error.response);
  }
  ElNotification({
    title: '温馨提示',
    message: error.response.statusText || `Error: ${error.response.request.url}`,
    type: 'error',
  });
  return Promise.reject(error.response);
});
class Api {
  private request(url: string, options: AxiosRequestConfig, headerConfig?: AxiosRequestConfig) {
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