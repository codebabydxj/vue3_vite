<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <div class="water-mark" v-waterMarker="{ text: 'Vite Admin', textColor: 'rgba(180, 180, 180, 0.6)' }">
          <span class="text">水印指令 🍇🍇🍇🍓🍓🍓</span>
        </div>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="WatermarkDirect">

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
}
</style>
