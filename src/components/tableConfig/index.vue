<template>
  <div class="tb-config" v-if="configType.length > 0">
    <table-memory v-if="configType.includes('memory') && tableTitle && titleList.length > 0" :tableTitle="tableTitle" :titleList="titleList" @command="handleConfig"></table-memory>
    <table-size v-if="configType.includes('size')" @command="handleConfig"></table-size>
    <table-column v-if="configType.includes('column')" @command="handleConfig"></table-column>
  </div>
</template>

<script setup lang="ts">
import tableSize from './tableSize.vue';
import tableColumn from './tableColumn.vue'
import tableMemory from './tableMemory.vue'

interface ProTableProps {
  configType?: [] | any; // 列配置项 => 非比传
  tableTitle?: String | any; // 表格列配置标识 => 必传
  titleList?: [] | any; // 表格列配置title => 必传
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  configType: () => [],
  tableTitle: '',
  titleList: () => [],
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