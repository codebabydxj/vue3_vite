/**
 * 
 * @param data 后台返回文件
 * @param fileName 文件重命名
 */
export const exportExcel = (data: any, fileName: any) => {
  const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
  if ('download' in document.createElement('a')) {
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href)
    document.body.removeChild(elink)
  } else {
    (window.navigator as any).msSaveBlob(blob, fileName)
  }
}

/**
 * 
 * @param code 后台返回文件
 * @param name 文件重命名
 * @param isView 是否预览
 * @param type 文件类型格式
 */
export const exportPdf = (code: any, name: any = '', isView: boolean = false, type = 'application/pdf') => {
  // 这里写法具体看后台返回结果
  let int8Array: any = null
  let byteString: any = code
  // 方案一 如果返回的是二进制对象
  if (typeof code === 'object') {
    int8Array = new Uint8Array(byteString)
  }
  // 方案二 如果返回是一起串base64编码
  if (typeof code === 'string') {
    byteString = window.atob(code)
    const arrayBuffer = new ArrayBuffer(byteString.length)
    int8Array = new Uint8Array(arrayBuffer)
  }
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([int8Array], { type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  if (isView) {
    link.target = '_blank' // 先预览再下载
  } else {
    link.setAttribute('download', name + '.pdf') // 不预览直接下载
  }
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  if (!isView) {
    window.URL.revokeObjectURL(url) // 不预览直接下载
  }
}
