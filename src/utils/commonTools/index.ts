// 树形结构数扁平化处理
export const treeToList = (tree: any[]): any => {
  return tree.reduce((pre: any, cur: any) => {
    // 此处将对象的children属性和值都解构在空数组中，将对象的其他属性和值都解构在i里面。
    const { children = [], ...i }: any = cur;   // 注意 ...i 只能写在解构赋值的末尾，否则报错
    return pre.concat([{ ...i }], treeToList(children))  //利用递归回调,数组合并,注意此处 {...i}是解构
  }, []);
}

// 扁平化数据结构转树状形结构
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

// 地区编码code转换codeList,方便级联选择器回显
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