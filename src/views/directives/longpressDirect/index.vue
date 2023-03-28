<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <div class="content-box">
          <span class="text">长按指令 🍇🍇🍇🍓🍓🍓</span>
          <el-button type="primary" v-longpress="longpress">长按2秒触发事件</el-button>
        </div>
      </el-card>
    </div>
  </flex-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from "element-plus";

export default defineComponent({

  setup() {
    const longpress = () => {
      ElMessage.success("长按事件触发成功 🍍🍓🍌");
    };
    return {
      longpress
    }
  }
})
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
