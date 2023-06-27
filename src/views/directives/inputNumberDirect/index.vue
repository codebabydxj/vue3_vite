<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <div class="content-box">
          <div class="text">数字输入框指令（可以设置小数点几位，默认两位） 🍇🍇🍇🍓🍓🍓</div>
          <div class="box-content">
            <el-input placeholder="请输入内容" v-model="data" v-inputNumber="{ decimal: 3 }" style="width: 500px"></el-input>
          </div>
        </div>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="InputNumberDirect">
import { ref } from 'vue'

const data = ref<string>("");
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
