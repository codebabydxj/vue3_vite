  import { en } from './baseSixteen';
  /**
   * 转换成拼音（若有空格、特殊字符将被移除）
   *
   * @param {string} sourceStr 原始数据
   */
   const convertToEn = (sourceStr: any, isFirst: boolean = false) => {
    // 目标数据
    let targetStr = ''
    // 匹配中文
    const cnReg = /[\u4e00-\u9fa5]/;
    // 匹配数字和英文
    const enReg = /[a-zA-Z0-9]/;
    // 保留英文和数字
    const keep = true;

    // 遍历源数据
    for (let i = 0, len = sourceStr.length; i < len; i++) {
      const str = sourceStr.substr(i, 1);
      if (keep && enReg.test(str)) {
        targetStr += str;
      } else if (cnReg.test(str)) {
        const searchResult = searchPinYin(str, en);
        if (searchResult) {
          targetStr += firstCapital(searchResult, isFirst); // 首字母大写
        }
      }
    }
    return targetStr;
  }

  /**
   * 检索拼音
   *
   * @param {string} str 源字符串
   * @param {object} data 收集的拼音 Unicode 编码集合
   */
  const searchPinYin = (str: string, data: any) => {
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key].indexOf(str) !== -1) {
        return key;
      }
    }
    return '';
  }

  /**
   * 将拼音首字母转换为大写
   *
   * @param {string} str 源字符串
   */
  const firstCapital = (str: any, isFirst: boolean = false) => {
    if (str) {
      const [first] = str;
      const other = str.replace(/^\S/, '');
      if (isFirst) return `${first.toUpperCase()}`;
      return `${first.toUpperCase()}${other}`;
    }
    return str;
  }

  export { convertToEn };
