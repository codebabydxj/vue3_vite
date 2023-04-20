<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <div class="content-box">
          <span class="text">防抖指令 🍇🍇🍇🍓🍓🍓</span>
          <el-button type="primary" v-debounce="debounceClick">防抖按钮 (0.5秒后执行)</el-button>
        </div>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

const debounceClick = () => {
  ElMessage.success("我是防抖按钮触发的事件 🍍🍓🍌");
};
</script>

<style scoped lang="scss">
.content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .text {
    margin: 20px 0 30px;
		font-size: 23px;
		font-weight: bold;
		color: var(--el-text-color-regular);
  }
}
</style>
