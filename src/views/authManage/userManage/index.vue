<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        用户管理页面
        <el-button type="primary" @click="resetForm">重置</el-button>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts">
import { inject } from 'vue'

// 通过inject获取挂载在全局的globalRouter方法，初始化view
const globalRouter: any = inject('globalRouter')

const resetForm = () => {
  globalRouter.refreshView()
}
</script>

<style scoped lang="scss">
</style>
