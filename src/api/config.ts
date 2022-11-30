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

export const uploadConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

// 请求超时
export const timeOutConfig = {
  timeout: 300000,
};
