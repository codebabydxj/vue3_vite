import { dayjs } from "element-plus";

/**
 * @description:
 * @param {Blob} data
 * @param {string} type
 * @param {any} headers
 * @return {*}
 */
export const downloadFile = (
  data: Blob,
  type: string = "application/vnd.ms-excel",
  headers: any,
  open: boolean = false
): void => {
  const fileName = headers ? headers.split("=").pop() : '下载文件';
  const name = fileName.split(".");
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  const time = dayjs().format("YYYYMMDDhhmmss");
  link.href = url;
  if (open) {
    link.target = "_blank";
  } else {
    link.download = decodeURIComponent(name[0]) + "-" + time + "." + name[1];
  }
  link.click();
  window.URL.revokeObjectURL(url);
};

export const viewPdf = (data: Blob): string => {
  const blob = new Blob([data], { type: 'application/pdf' });
  return window.URL.createObjectURL(blob);
};