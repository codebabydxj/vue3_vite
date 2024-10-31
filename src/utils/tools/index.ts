import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { useGlobalStore } from '@/store';
import { FieldNamesProps } from "@/components/ProTable/interface";

/**
 * @description 树形结构数扁平化处理
 * @return array
 */
export const treeToList = (tree: any[]): Array<any> => {
  return tree.reduce((pre: any, cur: any) => {
    // 此处将对象的children属性和值都解构在空数组中，将对象的其他属性和值都解构在i里面。
    const { children = [], ...i }: any = cur;   // 注意 ...i 只能写在解构赋值的末尾，否则报错
    return pre.concat([{ ...i }], treeToList(children))  //利用递归回调,数组合并,注意此处 {...i}是解构
  }, []);
}

/**
 * @description 扁平化数据结构转树状形结构
 * @return array
 */
export const listToTree = (list: any[], childrenName: string = 'children'): Array<any> => {
  const result: any = []
  // 第一步：将数组转换成键值对的形式(键是id值，值是对象)
  const remap = list.reduce((pre: any, cur: any) => {
    pre[cur.id] = cur
    return pre
  }, {})
  // 第二步，循环遍历数组，判断是不是(树状结构最外层，祖宗层数据)第一层的数据(本处就是parentId等不等于0)
  for (let item of list) {  //用普通的for循环也行，但是用for in 不行,只能获取数组的元素下标,或者对象的键
    if (item.parentId === 0) {
      result.push(item)
      continue
    }
    // 目的将不是第一层的数据(parentId不等于0)挑出来，并赋予一个childrenName属性
    if (item.parentId in remap) {
      const parent = remap[item.parentId];
      parent[childrenName] = parent[childrenName] || [];
      parent[childrenName].push(item);
    }
  }
  return result
}
 
/**
 * @description 地区编码code转换codeList,方便级联选择器回显
 * @return array
 */
export const areaCodeToCodeList = (code: string, type: any = 'lang'): number[] => {
  const areaList: number[] = []
  for (let i = 2; i <= 12; i += 2) {
    let areaCode = ''
    if (type === 'lang') {
      areaCode = code.substring(0, i).padEnd(12, '0')
    }
    if (type === 'short') {
      if (i > 6) {
        areaCode = code.substring(0, i + 1)
        i++
      } else {
        areaCode = code.substring(0, i)
      }
    }
    if (!areaList.includes(parseInt(areaCode))) {
      if (areaCode === code) {
        areaList.push(parseInt(code))
        break
      } else { areaList.push(parseInt(areaCode)) }
    }
  }
  return areaList
}

/**
 * @description 获取当前时间对应的提示语 | 获取当前时间制 AM-PM
 * @return string
 */
export const getTimeState = (ap: boolean = false): string => {
	// 获取当前时间
	let timeNow = new Date();
	// 获取当前小时
	let hours = timeNow.getHours();
  if (ap) {
    if (hours >= 0 && hours <= 12) return 'AM'
    return 'PM';
  }
	// 判断当前时间段
	if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
	if (hours >= 10 && hours <= 14) return `中午好 🌞`;
	if (hours >= 14 && hours <= 18) return `下午好 🌞`;
	if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
	if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
  return '';
}

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = (): string => {
	let browserLang = navigator.language ? navigator.language : (navigator as any).browserLanguage;
	let defaultBrowserLang = '';
	if (browserLang.toLowerCase() === 'cn' || browserLang.toLowerCase() === 'zh' || browserLang.toLowerCase() === 'zh-cn') {
		defaultBrowserLang = 'zh';
	} else {
		defaultBrowserLang = 'en';
	}
	return defaultBrowserLang;
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export const randomNum = (min: number, max: number): number => {
	let num = Math.floor(Math.random() * (min - max) + max);
	return num;
}

/**
 * @description 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns boolean 相同返回 true，反之 false
 */
export const isObjectValueEqual = (a: { [key: string]: any }, b: { [key: string]: any }): boolean => {
	if (!a || !b) return false;
	let aProps = Object.getOwnPropertyNames(a);
	let bProps = Object.getOwnPropertyNames(b);
	if (aProps.length != bProps.length) return false;
	for (let i = 0; i < aProps.length; i++) {
		let propName = aProps[i];
		let propA = a[propName];
		let propB = b[propName];
		if (!b.hasOwnProperty(propName)) return false;
		if (propA instanceof Object) {
			if (!isObjectValueEqual(propA, propB)) return false;
		} else if (propA !== propB) {
			return false;
		}
	}
	return true;
}

/**
 * @description 提交表单时，滚动自动回到还没有填写的表单处
 */
export const formScrollToError = (className: string = 'is-error') => {
  setTimeout(() => {
    const errorDiv = document.getElementsByClassName(className)
    errorDiv[0].scrollIntoView()
  }, 0)
}

/** 
 * @description 导出获取窗口的宽高
 */ 
export const useWinSize = useDebounceFn(() => {
  const myStore: any = useGlobalStore()
  let diffH: any = 148 // header高度(43) + flexCard组件padding(40) + el-card组件padding(40) + 底部预留(25)
  if (myStore.pagination) diffH = 210 // + 表格分页(62)
  const size = ref({ width: window.innerWidth, height: window.innerHeight, contentHeight: window.innerHeight - diffH });
  // 窗口变化时候更新 size，每次重新计算需要重置一些store属性，请在APP.vue文件中修改！！！
  myStore.setMaxHeight(`${size.value.contentHeight}px`)
  myStore.setWinSize(size.value)
})

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
export const formatValue = (callValue: any) => {
	// 如果当前值为数组,使用 / 拼接（根据需求自定义）
	if (Array.isArray(callValue)) return callValue.length ? callValue.join(" / ") : "--";
	return callValue ?? "--";
}

/**
 * @description 处理 prop 为多级嵌套的情况(列如: prop:user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @return any
 * */
export const handleRowAccordingToProp = (row: { [key: string]: any }, prop: string) => {
	if (!prop.includes(".")) return row[prop] ?? "--";
	prop.split(".").forEach(item => (row = row[item] ?? "--"));
	return row;
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @returns {String}
 * */
export const handleProp = (prop: string): string => {
  const propArr = prop.split('.');
  if (propArr.length == 1) return prop;
  return propArr[propArr.length - 1];
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames label && value && children 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @returns {String}
 * */
export const filterEnum = (callValue: any, enumData?: any, fieldNames?: FieldNamesProps, type?: 'tag'): string => {
  const value = fieldNames?.value ?? "value";
  const label = fieldNames?.label ?? "label";
  const children = fieldNames?.children ?? "children";
  let filterData: { [key: string]: any } = {};
  // 判断 enumData 是否为数组
  if (Array.isArray(enumData)) filterData = findItemNested(enumData, callValue, value, children);
  // 判断是否输出的结果为 tag 类型
  if (type == "tag") {
    return filterData?.tagType ? filterData.tagType : "";
  } else {
    return filterData ? filterData[label] : "--";
  }
}

/**
 * @description 递归查找 callValue 对应的 enum 值
 * */
export const findItemNested = (enumData: any, callValue: any, value: string, children: string) => {
  return enumData.reduce((accumulator: any, current: any) => {
    if (accumulator) return accumulator;
    if (current[value] === callValue) return current;
    if (current[children]) return findItemNested(current[children], callValue, value, children);
  }, null);
}

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export const getFlatMenuList = (menuList: any[]): Array<any> => {
  let newMenuList: any[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export const getShowMenuList = (menuList: any[]): Array<any> => {
  let newMenuList: any[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter((item: any) => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object}
 */
export const getAllBreadcrumbList = (menuList: any[], parent: Array<any> = [], result: { [key: string]: any } = {}): object => {
  for (const item of menuList) {
    result[item.path] = [...parent, item];
    if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
  }
  return result;
}

/**
 * @description 生成唯一 uuid
 * @returns {String}
 */
export const generateUUID = (): string => {
  let uuid: any = '';
  for (let i = 0; i < 32; i++) {
    let random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += '-';
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
}

/**
 * @description 驼峰命名转换成下划线字段格式
 * @returns {Object}
 */
export const camelToSnakeCase = (obj: any): { [key: string]: any } => {  
  const result: any = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 使用正则表达式将驼峰命名转换为下划线命名
      const snakeCaseKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
      result[snakeCaseKey] = obj[key];
    }
  }
  return result;  
}


/**
 * @description 校验是否为json
 * @returns {Boolean}
 */
export const isJSON = (str: any) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}