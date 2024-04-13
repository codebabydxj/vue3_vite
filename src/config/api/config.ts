export const apiConfig = {
  baseURL: '',
  timeout: 1000 * 60 * 3,
  withCredentials: true
};

export const jsonConfig = {
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

// fromData 提交需要携带的参数
export const formDataConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

// 上传文件 
export const uploadConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

// 请求取消全局 loading
export const loadingConfig = {
  noLoading: true
};
