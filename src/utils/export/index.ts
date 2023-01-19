export function exportExcel(data: any, fileName: any) {
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

export const exportPdf = (code: any, name: any, type = 'application/pdf') => {
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
  // link.target = '_blank' // 如果要预览再下载 打开注释
  link.setAttribute('download', name + '.pdf') // 如果要预览再下载 注释掉
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url) // 如果要预览再下载 注释掉
}
