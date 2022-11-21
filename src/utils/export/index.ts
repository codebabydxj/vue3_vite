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

export const exportBase64Pdf = (code: any, name: any, type = 'application/pdf') => {
  const byteString = atob(code)
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const int8Array = new Uint8Array(arrayBuffer)
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([int8Array], { type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', name + '.pdf')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
