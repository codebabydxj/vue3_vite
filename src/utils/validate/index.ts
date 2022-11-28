export default {
  // 电话机验证
  telphone: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/g.test(
      value
    );
    if (!pass) {
      callback(
        new Error(rule.message || "正确格式: 区号-电话号码 或 电话号码")
      );
    }
    callback();
  },
  // 手机号验证
  phone: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass = /^(\\+86)?0?[1][34578][0-9]{9}$/g.test(value);
    if (!pass) {
      callback(new Error(rule.message || "请输入正确的电话号码"));
    }
    callback();
  },
  // 邮箱验证
  email: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass = /^[a-zA-Z0-9_.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/g.test(
      value
    );
    if (!pass) {
      callback(new Error(rule.message || "请输入正确的邮箱"));
    }
    callback();
  },
  // 邮政编码验证
  postcode: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass = /^\d{6}$/g.test(value);
    if (!pass) {
      callback(new Error(rule.message || "必须是6位数字"));
    }
    callback();
  },
  // 不能含有特殊字符验证
  notValidInputText: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass = /^[^'/\\"()@$%^*<>&?]*$/g.test(value);
    if (!pass) {
      callback(new Error(rule.message || "不能包含特殊字符^'\\\"()@$%^*<>&?*"));
    }
    callback();
  },
  // 数字验证
  isNumber: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass = /^[0-9]*$/g.test(value);
    if (!pass) {
      callback(new Error(rule.message || "只能为数字"));
    }
    callback();
  },
  // 数字规则验证
  number: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass = /^[0-9]{1,10}$/g.test(value);
    if (!pass) {
      callback(new Error(rule.message || "必须是数字"));
    }
    callback();
  },
  // IP地址验证
  ip: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/g.test(
        value
      );
    if (!pass) {
      callback(new Error(rule.message || "请输入正确的ip地址"));
    }
    callback();
  },
  // 数字和字母验证
  letterOrNumber: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass = /^[0-9a-zA-Z]+$/g.test(value);
    if (!pass) {
      callback(new Error(rule.message || "只能是数字和字母"));
    }
    callback();
  },
  // 数字字母下划线验证
  letterOrNumberorUl: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass = /^\w+$/.test(value);
    if (!pass) {
      callback(new Error(rule.message || "只能是数字和字母和_"));
    }
    callback();
  },
  // ID验证
  id: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass = /^[a-zA-Z0-9-]{3,20}$/g.test(value);
    if (!pass) {
      callback(new Error(rule.message || "只能为 3-20 位字符串"));
    }
    callback();
  },
  // 正整数验证(不含0)
  positiveNumber: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    if (typeof value === 'string' && value.slice(0, 1) === '0') {
      value = value.slice(1)
    }
    const pass = /^[1-9]\d*$/g.test(value);
    if (!pass) {
      callback(new Error(rule.message || "必须是正整数"));
    }
    callback();
  },
  // 正数负数和小数验证
  posiNactiveNumber: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass = /^[+-]?\d+(\.\d+)?$/g.test(value);
    if (!pass) {
      callback(new Error(rule.message || "可输入正数负数和小数"));
    }
    callback();
  },
  // URL地址
  url: (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback();
      return;
    }
    const pass = /^http[s]?:\/\/.*/.test(value);
    if (!pass) {
      callback(new Error(rule.message || "请输入正确URL"));
    }
    callback();
  },
};
