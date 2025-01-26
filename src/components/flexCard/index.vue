<template>
  <el-row class="flex-grow" type="flex" :justify="justify" :align="align" :gutter="gutter">
    <slot></slot>
  </el-row>
</template>

<script setup lang="ts" name="FlexCard">
import { PropType } from "vue";
import type { EpPropMergeType } from "element-plus/es/utils";

const props = defineProps({
  justify: {
    type: String as PropType<EpPropMergeType<StringConstructor, 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly', unknown>>,
    default: 'start',
  },
  align: {
    type: String as PropType<EpPropMergeType<StringConstructor, 'top' | 'middle' | 'bottom', unknown>>,
    default: 'top',
  },
  gutter: {
    type: Number,
    default: 0,
  },
})
</script>

<style scoped lang="scss">
.flex-grow {
  flex: 1 1 auto;
  padding: 20px;
  overflow: auto;
}
</style>
