const prefix = '__vite__';

export default {
  /**
   * 获取本地存储
   *
   * @param {string} key
   * @return {any}
   */
  get(key: any) {
    const ret = window.localStorage.getItem(prefix + key);
    if (ret) {
      return JSON.parse(ret);
    }
    return null;
  },

  /**
   * 设置本地存储
   *
   * @param {string} key
   * @param {any} value
   * @return {boolean}
   */
  set(key: any, value: any) {
    window.localStorage.setItem(prefix + key, JSON.stringify(value));
    return true;
  },

  /**
   * 删除本地存储
   *
   * @param {string} key
   * @return {boolean}
   */
  remove(key: any) {
    window.localStorage.removeItem(prefix + key);
    return true;
  },
};
