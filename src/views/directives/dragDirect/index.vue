<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <div class="content-box">
          <div class="text">拖拽指令 🍇🍇🍇🍓🍓🍓</div>
          <div v-draggable class="drag-box user-sel">我可以拖拽哦~</div>
        </div>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="DragDirect">

</script>

<style scoped lang="scss">
.content-box {
  position: relative;
  .drag-box {
    position: absolute;
    top: 110px;
    width: 300px;
    height: 300px;
    text-align: center;
    line-height: 300px;
    font-size: 23px;
    font-weight: bold;
    color: var(--el-color-primary-light-3);
    background: var(--el-color-primary-light-9);
    border-radius: 50%;
  }
}
</style>
