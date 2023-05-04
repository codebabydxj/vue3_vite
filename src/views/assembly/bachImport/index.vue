<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <div class="content-box">
          <span class="text">批量添加数据 🍓🍇🍈🍉</span>
          <el-button type="primary" style="width: 15%;margin: 0 auto;" @click="batchAdd"><el-icon><Upload /></el-icon>批量添加数据</el-button>
          <uploadExcel ref="importRef" />
          <el-descriptions title="配置项 📚" :column="1" border>
            <el-descriptions-item label="title"> 组件显示标题，上传成功之后提示信息 </el-descriptions-item>
            <el-descriptions-item label="tempApi"> 下载模板的 Api, 包含请求接口和入参 => { url: '', params: {} }</el-descriptions-item>
            <el-descriptions-item label="importApi"> 上传数据的 Api, 包含请求接口和入参 => { url: '', params: {} } </el-descriptions-item>
            <el-descriptions-item label="getTableList"> 上传数据成功之后，刷新表格数据的回调函数 </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import uploadExcel from '@/components/uploadExcel/index.vue'

const importRef = ref();
const batchAdd = () => {
	let params: any = {
		title: "数据",
		tempApi: { url: '', params: {} },
		importApi: { url: '/api/geeker/user/import', params: { type: 'sx', id: '123'} }
	};
	importRef.value.acceptParams(params);
};
</script>

<style scoped lang="scss">
.content-box {
  display: flex;
  flex-direction: column;
  .text {
    margin: 20px 0 30px;
    font-size: 23px;
    font-weight: bold;
    text-align: center;
    color: var(--el-text-color-regular);
  }
}
</style>
