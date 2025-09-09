<template>
	<el-dialog v-model="dialogVisible" :title="`批量添加${parameter.title}`" :destroy-on-close="true" width="40%" draggable>
		<el-form ref="batchRef" label-width="100px">
			<el-form-item label="模板下载 :">
				<el-button type="primary" :icon="Download" @click="downloadTemp">点击下载</el-button>
			</el-form-item>
			<el-form-item label="文件上传 :">
				<el-upload
					ref="uploadRef"
					class="upload"
					:action="parameter.importApi.url"
					:data="{ ...parameter.importApi.params, isCover: isCover }"
					:auto-upload="false"
					:drag="true"
					:multiple="true"
					:show-file-list="true"
					:before-upload="beforeExcelUpload"
					:on-exceed="handleExceed"
					:on-change="handleChange"
					:on-success="excelUploadSuccess"
					:on-error="excelUploadError"
					:accept="parameter.fileType!.join(',')"
				>
					<slot name="empty">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </slot>
					<template #tip>
						<slot name="tip">
							<div class="el-upload__tip">请上传 .xls , .xlsx 标准格式文，文件最大为 {{ parameter.fileSize }}M</div>
						</slot>
					</template>
				</el-upload>
			</el-form-item>
			<el-form-item label="数据覆盖 :">
				<el-switch v-model="isCover" />
			</el-form-item>
		</el-form>
		<template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
	</el-dialog>
</template>

<script setup lang="ts" name="UploadExcel">
import { ref } from "vue";
import { useDownload } from "@/hooks/useDownload";
import { Download } from "@element-plus/icons-vue";
import { ElMessage, ElNotification, UploadInstance, UploadFile, UploadFiles } from "element-plus";
import { client } from "@/utils/https/client";
import { uploadConfig } from "@/config/api/config";

export interface ExcelParameterProps {
	title: string; // 标题
	fileSize?: number; // 上传文件的大小
	fileType?: [] | any; // 上传文件的类型
	tempApi?: { url: string, params: object } | any; // 下载模板的Api
	importApi?: { url: string, params: object } | any; // 批量导入的Api
	getTableList?: () => void; // 获取表格数据的Api
}
const uploadRef = ref<UploadInstance>()
// 是否覆盖数据
const isCover = ref(false);
// 最大文件上传数
const excelLimit = ref(1);
// dialog状态
const dialogVisible = ref(false);
// 父组件传过来的参数
const parameter = ref<ExcelParameterProps>({
	title: '',
  fileSize: 5,
  fileType: ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
});
// 接收父组件参数
const acceptParams = (params?: any): void => {
	parameter.value = { ...parameter.value, ...params };
	dialogVisible.value = true;
};
let files = [] as any

// Excel 导入模板下载
const downloadTemp = async () => {
	if (!parameter.value.tempApi.url) {
    ElMessage.warning({
      grouping: true,
      message: '请先传url参数！'
    })
    return;
  }
	useDownload(parameter.value.tempApi, `${parameter.value.title}模板`);
};

// 覆盖默认的 Xhr 行为，自行文件上传
const uploadExcel = async (param: any) => {
	if (!parameter.value.importApi.url) {
    ElMessage.warning({
      grouping: true,
      message: '请先传url参数！'
    })
    return;
  }
	try {
		let excelFormData = new FormData();
		excelFormData.append("file", param.file);
		excelFormData.append("file", param.file);
		excelFormData.append("isCover", isCover.value as unknown as Blob);
		const res: any = await client.post(parameter.value.importApi.url, excelFormData, uploadConfig)
		if (res.code === 200) {
			parameter.value.getTableList && parameter.value.getTableList();
			cancel()
		} else {
      ElMessage.error(res.msg)
    }
	} catch (error) {
		cancel()
	}
};


const cancel = () => {
	dialogVisible.value = false;
}

const submit = () => {
	if (!parameter.value.importApi.url) {
    ElMessage.warning({
      grouping: true,
      message: '请先传url参数！'
    })
    return;
  }
	if (files.length === 0) {
		ElMessage.warning({
      grouping: true,
      message: '请先上传文件'
    })
		return
	}
	uploadRef.value!.submit()
}
/**
 * @description 文件上传之前判断
 * @param file 上传的文件
 * */
const beforeExcelUpload = (file: any) => {
	const isExcel = parameter.value.fileType!.includes(file.type as string);
	const fileSize = file.size / 1024 / 1024 < parameter.value.fileSize!;
	if (!isExcel)
		ElNotification({
			title: "温馨提示",
			message: "上传文件只能是 xls / xlsx 格式！",
			type: "warning"
		});
	if (!fileSize)
		ElNotification({
			title: "温馨提示",
			message: `上传文件大小不能超过 ${parameter.value.fileSize}MB！`,
			type: "warning"
		});
	return isExcel && fileSize;
};

// 文件数超出提示
const handleExceed = (): void => {
	ElNotification({
		title: "温馨提示",
		message: "最多只能上传一个文件！",
		type: "warning"
	});
};

// 文件发生变化
const handleChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	files = uploadFiles
	imports(uploadFile)
}

const imports = (file: any) => {
  client.upload(parameter.value.importApi.url, {id: 123}, file.raw)
  .then((res: any) => {
    if (res.code === 1) {
			
    } else {
     
    }
  }).finally(() => {
    
  }).catch(() => {
    
  })
}

// 上传错误提示
const excelUploadError = (): void => {
	ElNotification({
		title: "温馨提示",
		message: `添加${parameter.value.title}失败，请您重新上传！`,
		type: "error"
	});
};

// 上传成功提示
const excelUploadSuccess = (): void => {
	ElNotification({
		title: "温馨提示",
		message: `添加${parameter.value.title}成功！`,
		type: "success"
	});
	cancel()
};

defineExpose({
	acceptParams
});
</script>

<style lang="scss" scoped>
.upload {
	width: 80%;
}
</style>
