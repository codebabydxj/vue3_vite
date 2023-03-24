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

.flex-grow::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.flex-grow::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #dfd7d7;
}

.flex-grow::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
