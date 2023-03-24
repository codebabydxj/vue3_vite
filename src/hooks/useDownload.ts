import { client } from "@/utils/https/client";
import { ElNotification, ElMessage } from "element-plus";

/**
 * @description 接收数据流生成blob，创建链接，下载文件
 * @param {Function} apiParams 导出表格的请求url及params
 * @param {String} tempName 导出的文件名(必传)
 * @param {Object} params 导出的参数(默认为空对象)
 * @param {Boolean} isNotify 是否有导出消息提示(默认为 true)
 * @param {String} fileType 导出的文件格式(默认为.xlsx)
 * @return void
 * */
export const useDownload = (
  apiParams: any = {},
  tempName: string,
  isNotify: boolean = true,
  fileType: string = ".xlsx"
) => {
  try {
    client.post(apiParams.url, apiParams.params).then((res: any) => {
      if (isNotify) {
        ElNotification({
          title: "温馨提示",
          message: "如果数据庞大会导致下载缓慢哦，请您耐心等待！",
          type: "info",
          duration: 3000
        });
      }
      // const blob = new Blob([res], {
      // 	type: "application/vnd.ms-excel;charset=UTF-8"
      // });
      const blob = new Blob([res]);
      // 兼容 edge 不支持 createObjectURL 方法
      if ("msSaveOrOpenBlob" in navigator) return (window.navigator as any).msSaveBlob(blob, tempName + fileType);
      const blobUrl = window.URL.createObjectURL(blob);
      const exportFile = document.createElement("a");
      exportFile.style.display = "none";
      exportFile.download = `${tempName}${fileType}`;
      exportFile.href = blobUrl;
      document.body.appendChild(exportFile);
      exportFile.click();
      // 去除下载对 url 的影响
      document.body.removeChild(exportFile);
      window.URL.revokeObjectURL(blobUrl);
    }).catch((err: any) => {
      const fileRender = new FileReader()
      fileRender.onloadend = () => {
        if (err.response.data.type === 'text/html') {
          let obj = JSON.parse((fileRender.result as any))
          ElMessage({
            type: 'error',
            message: obj.msg
          })
        }
      }
      fileRender.readAsText(err.response.data)
    })
  } catch (error) {
    console.log(error);
  }
};
