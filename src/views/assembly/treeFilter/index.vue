<template>
  <flex-card>
    <div class="base-warp">
      <div class="content-box">
        <TreeFilter
          label="name"
          title="部门列表(单选)"
          :request="{ url: '/api/user/department', method: 'get' }"
          :defaultValue="treeFilterValue.departmentId"
          @change="changeTreeFilter"
        />
        <TreeFilter
          title="部门列表(多选)"
          multiple
          label="name"
          :request="{ url: '/api/user/department', method: 'get' }"
          :defaultValue="treeFilterValue1.departmentId"
          @change="changeTreeFilter1"
        />
        <div class="over-card descriptions-box">
          <el-scrollbar>
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
          </el-scrollbar>
        </div>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="TreeFilter">
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import TreeFilter from "@/components/TreeFilter/index.vue";

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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .descriptions-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
  }
}
</style>
