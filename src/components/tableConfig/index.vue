<template>
  <div class="tb-config" v-if="configType.length > 0">
    <el-tooltip effect="dark" :content="$t('proTable.refresh')" placement="top">
      <el-button class="config-btn" circle @click="handleEvent(1)"><el-icon size="16"><Refresh /></el-icon></el-button>
    </el-tooltip>
    <template v-if="configType.includes('memory') && colSetting.length > 0">
      <el-tooltip effect="dark" :content="$t('proTable.columnConfig')" placement="top">
        <el-button class="config-btn" circle @click="handleEvent(2)"><el-icon size="16"><Operation /></el-icon></el-button>
      </el-tooltip>
    </template>
    <table-size v-if="configType.includes('size')" @command="handleConfig"></table-size>
    <!-- <table-column v-if="configType.includes('column')" :isShowSelIdx="isShowSelIdx"  @command="handleConfig"></table-column> -->
    <el-tooltip effect="dark" :content="$t('proTable.hideShowSearch')" placement="top">
      <el-button class="config-btn" circle @click="handleEvent(3)"><el-icon size="16"><Search /></el-icon></el-button>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts" name="TableConfig">
import { ref } from "vue"
import tableSize from './tableSize.vue'
import tableColumn from './tableColumn.vue'
import { ColumnProps } from '@/components/ProTable/interface'

interface ProTableProps {
  isShowSelIdx?: boolean; // 选择框和序号列
  configType?: [] | any; // 列配置项 => 非比传
  colSetting: ColumnProps[]; // 表格列属性 => 必传
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  configType: () => ['memory', 'size', 'column'],
})
const emit = defineEmits(['tableConfigCall'])

const isShowSearch = ref(true)

const handleConfig = (data: any) => {
  emit('tableConfigCall', data)
}
const handleEvent = (type: any) => {
  if (type === 1) {
    emit('tableConfigCall', { type: 'refresh' })
  } else if (type === 2) {
    emit('tableConfigCall', { type: 'colSetting', command: true })
  } else if (type === 3) {
    isShowSearch.value = !isShowSearch.value
    emit('tableConfigCall', { type: 'search', command: isShowSearch.value })
  }
}
</script>

<style lang="scss" scoped>
.tb-config {
  display: flex;
  justify-content: flex-end;
}
</style>