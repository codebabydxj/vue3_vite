/**
 * 使用
 * import { client } from '@/utils/plugin/client';
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { Method } from 'axios';
import { ElMessage, ElNotification } from 'element-plus';
import qs from 'qs';
import dayjs from 'dayjs';
import routers from '@/routers'
import { pinia, globalStore } from '@/store'

let store = globalStore(pinia);
const instance = axios.create({
  baseURL: '',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  withCredentials: true, // 跨域允许携带cookie
});

interface requestConfig extends AxiosRequestConfig {
  interceptors?: requestConfig,
  headers?: any
}

// 请求拦截
instance.interceptors.request.use((config: requestConfig) => {
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

interface CustomResponseType {
  code: number,
  data: any,
  msg?: any,
  [x: string]: any
}

// 响应拦截
instance.interceptors.response.use((response: AxiosResponse) => {
  if (response.status === 200) {
    if (response.request.responseType === 'blob') {
      downloadFile(response.data, response.data.type, response.headers['content-disposition'])
      return false
    }
    return (response.data as CustomResponseType);
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
    store.logout(store.$state)
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
  request(url: string, options: AxiosRequestConfig, headerConfig?: AxiosRequestConfig) {
    return new Promise<CustomResponseType>((resolve, reject) => {
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
  get(url: string, params?: any, headerConfig?: any) {
    return this.request(url, {
      method: 'get',
      params: params,
    }, headerConfig)
  }
  /** post(url: string, data?:any) */
  post(url: string, data?: any, headerConfig?: any) {
    return this.request(url, {
      method: 'post',
      data: data ?? {},
    }, headerConfig)
  }

  /** download(url: string, data?:any, method: Method = 'post | get') */
  download(url: string, data?: any, method: Method = 'post') {
    const reqDate: AxiosRequestConfig = {
      method: method,
      responseType: 'blob',
    }
    if (method === 'post') reqDate.data = data
    if (method === 'get') reqDate.params = data
    return this.request(url, reqDate)
  }
}

const client = new Api();

export { client }