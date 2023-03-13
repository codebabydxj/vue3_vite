<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <div class="content-box">
          <div class="text">拖拽指令 🍇🍇🍇🍓🍓🍓</div>
          <el-avatar v-draggable style="margin-top: 80px;" shape="square" :size="200" fit="cover" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
        </div>
      </el-card>
    </div>
  </flex-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({

  setup() {

    return {}
  }
})
</script>

<style scoped lang="scss">
.content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 128px);
  .text {
    margin: 20px 0 30px;
		font-size: 23px;
		font-weight: bold;
		color: var(--el-text-color-regular);
  }
}
</style>
