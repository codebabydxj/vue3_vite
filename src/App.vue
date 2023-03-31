<template>
  <div class="vite-app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
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
  display: flex !important;
}
</style>
