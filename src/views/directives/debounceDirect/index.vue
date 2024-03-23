<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <div class="content-box">
          <span class="text">防抖指令 🍇🍇🍇🍓🍓🍓</span>
          <el-button type="primary" v-debounce="debounceClick">防抖按钮 (0.5秒后执行)</el-button>
        </div>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="DebounceDirect">
import { ElMessage } from "element-plus";

const debounceClick = () => {
  ElMessage.success("我是防抖按钮触发的事件 🍍🍓🍌");
};
</script>

<style scoped lang="scss">

</style>
