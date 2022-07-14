<template>
  <div class="vite-app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
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
</style>
