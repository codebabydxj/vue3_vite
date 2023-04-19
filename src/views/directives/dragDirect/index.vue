<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <div class="content-box" :style="{ height: maxHeight }">
          <div class="text">拖拽指令 🍇🍇🍇🍓🍓🍓</div>
          <div v-draggable class="drag-box user-sel">我可以拖拽哦~</div>
        </div>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="dragDirect">
import { computed } from 'vue'
import { globalStore } from '@/store'

// 最大高度计算
const myStore: any = globalStore()
const maxHeight: any = computed(() => myStore.maxHeight)
</script>

<style scoped lang="scss">
.content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .text {
    margin: 20px 0 30px;
		font-size: 23px;
		font-weight: bold;
		color: var(--el-text-color-regular);
  }
  .drag-box {
    position: absolute;
    top: 110px;
    width: 300px;
    height: 300px;
    font-size: 23px;
    font-weight: bold;
    color: var(--el-color-primary-light-3);
    background: var(--el-color-primary-light-9);
    border-radius: 50%;
    text-align: center;
    line-height: 300px;
  }
}
</style>
