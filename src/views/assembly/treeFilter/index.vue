<template>
  <flex-card>
    <div class="base-warp">
      <div class="content-box">
        <TreeFilter
          label="name"
          title="部门列表(单选)"
          :request="{ url: userInfo, method: 'get' }"
          :data="dataJson"
          :defaultValue="treeFilterValue.departmentId"
          @change="changeTreeFilter"
        />
        <TreeFilter
          title="部门列表(多选)"
          multiple
          label="name"
          :request="{ url: userInfo, method: 'post' }"
          :data="dataJson"
          :defaultValue="treeFilterValue1.departmentId"
          @change="changeTreeFilter1"
        />
        <div class="descriptions-box over-card">
          <span class="text"> 树形筛选器 🍓🍇🍈🍉</span>
          <el-descriptions title="配置项 📚" :column="1" border>
            <el-descriptions-item label="request"> 请求分类的api包含 url 和 method， { url: '', method: '' }</el-descriptions-item>
            <el-descriptions-item label="data"> 分类数据，如果有分类数据，则不会执行 api 请求 </el-descriptions-item>
            <el-descriptions-item label="title"> treeFilter 标题 </el-descriptions-item>
            <el-descriptions-item label="id"> 选择的id，默认为 “id” </el-descriptions-item>
            <el-descriptions-item label="label"> 显示的label，默认为 “label” </el-descriptions-item>
            <el-descriptions-item label="multiple"> 是否为多选，默认为 false </el-descriptions-item>
            <el-descriptions-item label="defaultValue"> 默认选中的值 </el-descriptions-item>
            <el-descriptions-item label="checkStrictly"> 多选模式下，是否遵循父子关联关系 </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="treeFilter">
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { userInfo } from "@/config/api";
import TreeFilter from "@/components/TreeFilter/index.vue";
import dataJson from './dataJson.json'

const treeFilterValue = reactive({ departmentId: "1" });
const changeTreeFilter = (val: string) => {
	ElMessage.success(`你选择了 id 为 ${val} 的数据🤔`);
	treeFilterValue.departmentId = val;
};

const treeFilterValue1 = reactive({ departmentId: ["11"] });
const changeTreeFilter1 = (val: string[]) => {
	ElMessage.success(`你选择了 id 为 ${JSON.stringify(val)} 的数据🤔`);
	treeFilterValue1.departmentId = val;
};
</script>

<style scoped lang="scss">
.content-box {
  width: 100%;
  .descriptions-box {
    display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		height: 100%;
    background-color: var(--el-bg-color);
    .text {
      margin: 20px 0 30px;
      font-size: 23px;
      font-weight: bold;
      color: var(--el-text-color-regular);
    }
    .el-descriptions {
      width: 100%;
    }
  }
}
</style>
