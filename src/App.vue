<template>
  <div class="vite-app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "@/hooks/useTheme";

// 初始化主题配置
const { initTheme } = useTheme();
initTheme();
</script>

<style lang="scss">
/** 全局基本样式 */
#app, .vite-app {
  height: 100vh !important;
  margin: 0;
}
.base-warp {
  width: calc(100%) !important;
  height: calc(100%) !important;
  display: block;
  flex: 1;
}
</style>
