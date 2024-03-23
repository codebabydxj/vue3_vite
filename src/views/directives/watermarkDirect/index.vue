<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <div class="water-mark">
          <span class="text">水印指令 🍇🍇🍇🍓🍓🍓</span>
          <el-alert
            title="通过调用 <hook>，开启或关闭水印，支持局部、全局、自定义样式（颜色、透明度、字体大小、字体、倾斜角度等），并自带防御（防删、防隐藏）和自适应功能"
            type="warning"
            :closable="false"
          />
          <div ref="localRef" class="local" />
          <el-button-group>
            <el-button type="primary" @click="setWatermark('局部水印', { color: '#409eff' })">创建局部水印</el-button>
            <el-button type="warning" @click="setWatermark('没有防御功能的局部水印', { color: '#e6a23c', defense: false })">
              关闭防御功能
            </el-button>
            <el-button type="danger" @click="clearWatermark">清除局部水印</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" @click="setGlobalWatermark('全局水印', { color: '#409eff' })">创建全局水印</el-button>
            <el-button type="warning" @click="setGlobalWatermark('没有防御功能的全局水印', { color: '#e6a23c', defense: false })">
              关闭防御功能
            </el-button>
            <el-button type="danger" @click="clearGlobalWatermark">清除全局水印</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="WatermarkDirect">
import { ref } from "vue"
import { useWatermark } from "@/hooks/useWatermark"

const localRef = ref<HTMLElement | null>(null)
const { setWatermark, clearWatermark } = useWatermark(localRef)
const { setWatermark: setGlobalWatermark, clearWatermark: clearGlobalWatermark } = useWatermark()
</script>

<style scoped lang="scss">
.water-mark {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 128px);

  .text {
    margin: 20px 0 30px;
    font-size: 23px;
    font-weight: bold;
    color: var(--el-text-color-regular);
  }

  .local {
    width: 100%;
    height: 30vh;
    border: 2px dashed var(--el-color-primary);
    margin: 20px 0;
  }

  :deep(.el-button-group) {
    margin: 0 12px 12px 0;
  }
}
</style>
