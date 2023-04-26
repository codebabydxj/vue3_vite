<template>
  <el-form ref="ruleFormRef" :model="searchParam" inline>
    <Grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
      <GridItem v-for="(item, index) in columns" :key="item.prop" v-bind="getResponsive(item)" :index="index">
        <el-form-item :label="item.label" :prop="item.prop">
          <SearchFormItem :column="item" :search-param="searchParam" />
        </el-form-item>
      </GridItem>
      <GridItem suffix>
        <div class="search-operation">
          <el-button type="primary" :icon="Search" :loading="searchLoading" @click="search">查询</el-button>
          <el-button :icon="Delete" @click="reset">重置</el-button>
          <el-button v-if="showCollapse" type="primary" link class="search-isOpen" @click="collapsed = !collapsed">
            {{ collapsed ? "展开" : "合并" }}
            <el-icon class="el-icon--right">
              <component :is="collapsed ? ArrowDown : ArrowUp"></component>
            </el-icon>
          </el-button>
        </div>
      </GridItem>
    </Grid>
  </el-form>
</template>

<script setup lang="ts" name="SearchForm">
import { inject, ref, computed } from 'vue'
import { ColumnProps } from "@/components/ProTable/interface";
import { BreakPoint } from "@/components/Grid/interface";
import { Delete, Search, ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import Grid from "@/components/Grid/index.vue";
import GridItem from "@/components/Grid/components/GridItem.vue";
import SearchFormItem from "./components/SearchFormItem.vue";

interface ProTableProps {
  columns?: ColumnProps[]; // 搜索配置列
  searchLoading?: boolean; // 查询按钮loading
  searchParam?: { [key: string]: any }; // 搜索参数
  searchCol: number | Record<BreakPoint, number>;
  search: (params: any) => void; // 搜索方法
}

const props = withDefaults(defineProps<ProTableProps>(), {
  searchLoading: false,
  columns: () => [],
  searchParam: () => ({})
});

// 获取响应式设置
const getResponsive = (item: ColumnProps) => {
  return {
    span: item.search?.span,
    offset: item.search?.offset ?? 0,
    xs: item.search?.xs,
    sm: item.search?.sm,
    md: item.search?.md,
    lg: item.search?.lg,
    xl: item.search?.xl
  };
};

// 是否默认折叠搜索项
const collapsed = ref(true);

// 获取响应式断点
const gridRef = ref();
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint);

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
  let show = false;
  props.columns.reduce((prev, current) => {
    prev +=
      (current.search![breakPoint.value]?.span ?? current.search?.span ?? 1) +
      (current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0);
    if (typeof props.searchCol !== 'number') {
      if (prev >= props.searchCol[breakPoint.value]) show = true;
    } else {
      if (prev >= props.searchCol) show = true;
    }
    return prev;
  }, 0);
  return show;
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