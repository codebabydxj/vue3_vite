<template>
  <main class="main-interface">
    <router-view :key="fullPath"></router-view>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const fullPath = computed(() => route.fullPath);
</script>

<style scoped lang="scss">
.main-interface {
  flex: 1 1 auto;
  display: flex;
  overflow: auto;
  background-color: var(--el-bg-color-page);
}
</style>
