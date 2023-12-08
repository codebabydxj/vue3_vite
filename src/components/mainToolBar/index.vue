<template>
  <div class="el_toolbar" @click="handleTheme">
    <el-icon class="_icons"><Setting /></el-icon>
  </div>
  <!-- 主题配置 -->
  <themeDialog
    :drawerVisible="isShowTheme"
    @drawerCloseCb="drawerCloseCb">
  </themeDialog>
</template>

<script setup lang="ts" name="Toolbar">
import { ref } from 'vue'
import { Setting } from "@element-plus/icons-vue"
import themeDialog from '../mainHeader/components/themeDialog.vue'

const isShowTheme = ref(false)

const handleTheme = () => {
  isShowTheme.value = true
}
const drawerCloseCb = () => {
  isShowTheme.value = false
}
</script>

<style scoped lang="scss">
.el_toolbar {
  background-color: var(--el-color-black);
  color: var(--el-color-white);
  position: fixed;
  z-index: 10;
  right: 0;
  top: calc(50% + 280px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 26px;
  cursor: pointer;
}

._icons {
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
