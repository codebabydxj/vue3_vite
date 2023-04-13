<template>
  <main class="main-interface">
    <router-view :key="fullPath"></router-view>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onActivated, onDeactivated } from 'vue';
import { useRoute } from 'vue-router';
import { useWinSize } from "@/utils/tools"

const route = useRoute();
const fullPath = computed(() => route.fullPath);

useWinSize()
window.addEventListener("resize", useWinSize);
// 组件挂载到节点上之前执行的函数
onBeforeUnmount(() => {
  window.removeEventListener("resize", useWinSize);
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

<style scoped lang="scss">
.main-interface {
  flex: 1 1 auto;
  display: flex;
  overflow: auto;
  background-color: var(--el-bg-color-page);
}
</style>
