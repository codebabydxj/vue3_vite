<template>
  <div class="vite-app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount, onActivated, onDeactivated } from 'vue';
import { useRoute } from 'vue-router';
import { globalStore } from '@/store'
import { useTheme } from "@/hooks/useTheme";
import { useWinSize } from "@/utils/tools"

// 初始化主题配置
const { initTheme } = useTheme();
initTheme();

// 监听store最大高度
const route = useRoute();
const myStore: any = globalStore()
watch(() => route.fullPath, (newVal: any, oldVal: any) => {
  // 如果切换新的页面，重置一些改变的参数，重新计算页面最大高度
  if (newVal && (newVal !== oldVal)) {
    myStore.setPagination(false)
    useWinSize()
  }
})

// 初始化content最大高度
onMounted(() => {
  useWinSize()
  window.addEventListener('resize', useWinSize);
})
// 组件挂载到节点上之前执行的函数
onBeforeUnmount(() => {
  window.removeEventListener('resize', useWinSize);
});
// 被激活时执行 （keep-alive存在）
onActivated(() => {
  window.addEventListener('resize', useWinSize);
});
// 比如从 A 组件，切换到 B 组件，A 组件消失时执行 （keep-alive存在）
onDeactivated(() => {
  window.removeEventListener('resize', useWinSize);
});
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
