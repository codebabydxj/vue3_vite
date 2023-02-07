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
  height: 100%;
  margin: 0;
}
.el-table th {
  background-color: #e6ebf5 !important;
  color: #444444 !important;
}
.el-table td {
  color: #000 !important;
}
.base-warp {
  width: calc(100%);
}
.el-loading-mask.is-fullscreen {
  z-index: 9999 !important;
}
.user-sel {
  -moz-user-select: none; // 火狐
  -webkit-user-select: none; // webkit浏览器
  -ms-user-select: none; // IE10
  -khtml-user-select: none; // 早期浏览器
  user-select: none;
}
.small-input-width {
  width: 150px !important;
}
.middle-input-width {
  width: 180px !important;
}
.large-input-width {
  width: 220px !important;
}
.date-picker-width {
  width: 230px !important;
}
.login-input-width {
  width: 330px !important;
}

// Wangeditor 样式
.w-e-full-screen-container {
  z-index: 2003 !important;
}
</style>
