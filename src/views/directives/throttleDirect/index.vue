<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <div class="content-box">
          <span class="text">节流指令 🍇🍇🍇🍓🍓🍓</span>
          <el-button type="primary" v-throttle="throttleClick">节流按钮 (每隔1S秒后执行)</el-button>
        </div>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="ThrottleDirect">
import { ElMessage } from "element-plus";

const throttleClick = () => {
  ElMessage.success("我是节流按钮触发的事件 🍍🍓🍌");
};
</script>

<style scoped lang="scss">

</style>
