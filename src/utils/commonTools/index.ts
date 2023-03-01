/**
 * @description 树形结构数扁平化处理
 * @return array
 */
export const treeToList = (tree: any[]): any => {
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
export const listToTree = (list: any[], childrenName: string = 'children'): any => {
  const result: any = []
  //第一步：将数组转换成键值对的形式(键是id值，值是对象)
  const remap = list.reduce((pre: any, cur: any) => {
    pre[cur.id] = cur
    return pre
  }, {})
  //第二步，循环遍历数组，判断是不是(树状结构最外层，祖宗层数据)第一层的数据(本处就是parentId等不等于0)
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
 * @description 获取当前时间对应的提示语
 * @return string
 */
export const getTimeState = (): any => {
	// 获取当前时间
	let timeNow = new Date();
	// 获取当前小时
	let hours = timeNow.getHours();
	// 判断当前时间段
	if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
	if (hours >= 10 && hours <= 14) return `中午好 🌞`;
	if (hours >= 14 && hours <= 18) return `下午好 🌞`;
	if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
	if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
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
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max);
	return num;
}

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
export function isObjectValueEqual(a: { [key: string]: any }, b: { [key: string]: any }) {
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