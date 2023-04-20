<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <div class="content-box">
          <div class="text">复制指令 🍇🍇🍇🍓🍓🍓</div>
          <div class="box-content">
            <el-input placeholder="请输入内容" v-model="data" style="width: 500px">
              <template #append>
                <el-button v-copy="data">复制</el-button>
              </template>
            </el-input>
          </div>
        </div>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref<string>("我是被复制的内容 🍒 🍉 🍊");
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
