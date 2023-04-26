<template>
  <el-form ref="ruleFormRef" :model="searchParam" inline>
    <el-row>
      <el-col :span="20">
        <div v-for="item in columns" :key="item.prop" style="float: left">
          <el-form-item :label="item.label" :prop="item.prop">
            <SearchFormItem :column="item" :search-param="searchParam" />
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-button type="primary" :loading="searchLoading" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts" name="SearchForm">
import { inject } from 'vue'
import { ColumnProps } from "@/components/ProTable/interface";
import SearchFormItem from "./components/SearchFormItem.vue";

interface ProTableProps {
  columns?: ColumnProps[]; // 搜索配置列
  searchLoading?: boolean; // 查询按钮loading
  searchParam?: { [key: string]: any }; // 搜索参数
  search: (params: any) => void; // 搜索方法
}

const props = withDefaults(defineProps<ProTableProps>(), {
  searchLoading: false,
  columns: () => [],
  searchParam: () => ({})
});

// 通过inject获取挂载在全局的globalRouter方法，初始化view
const globalRouter: any = inject('globalRouter')

// 重置
const reset = () => {
  globalRouter.refreshView()
}
</script>

<style scoped lang="scss">
</style>