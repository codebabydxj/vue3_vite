<template>
  <flex-card>
    <div class="base-warp">
      用户管理页面
      <el-button type="primary" @click="resetForm">重置</el-button>
    </div>
  </flex-card>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'

export default defineComponent({
  setup() {
    // 通过inject获取挂载在全局的globalFunc方法，初始化view
    const globalFunc: any = inject('globalFunc')

    const resetForm = () => {
      globalFunc.refreshView()
    }
  
    return {
      resetForm,
    }
  }
})
</script>

<style scoped lang="scss">
</style>
