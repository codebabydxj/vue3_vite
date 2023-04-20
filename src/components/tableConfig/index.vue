<template>
  <div class="tb-config" v-if="configType.length > 0">
    <table-memory v-if="configType.includes('memory') && colSetting.length > 0" :colSetting="colSetting"></table-memory>
    <table-size v-if="configType.includes('size')" @command="handleConfig"></table-size>
    <table-column v-if="configType.includes('column')" @command="handleConfig"></table-column>
  </div>
</template>

<script setup lang="ts" name="TableConfig">
import tableSize from './tableSize.vue'
import tableColumn from './tableColumn.vue'
import tableMemory from './tableMemory.vue'
import { ColumnProps } from '@/components/ProTable/interface'

interface ProTableProps {
  configType?: [] | any; // 列配置项 => 非比传
  colSetting: ColumnProps[]; // 表格列属性 => 必传
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  configType: () => ['memory', 'size', 'column'],
})
const emit = defineEmits(['tableConfigCall'])

const handleConfig = (data: any) => {
  emit('tableConfigCall', data)
}
</script>

<style lang="scss" scoped>
.tb-config {
  display: flex;
  justify-content: flex-end;
}
</style>