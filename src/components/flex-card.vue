<template>
  <el-row class="flex-grow" type="flex" :justify="justify" :align="align" :gutter="gutter">
    <slot></slot>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    justify: {
      type: String,
      default: 'start',
    },
    align: {
      type: String,
      default: 'top',
    },
    gutter: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style scoped lang="scss">
.flex-grow {
  flex: 1 1 auto;
  padding: 20px;
  overflow: auto;
}
</style>
