<template>
  <div>
    <el-button type="primary" @click="goBack">返回上级页面</el-button>
    二级页面
  </div>
</template>

<script setup lang="ts" name="Details">
import { inject } from 'vue'

const globalRouter: any = inject('globalRouter')
const goBack = () => {
  globalRouter.goView()
}
</script>