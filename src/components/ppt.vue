<template>
  <div class="frame" v-loading="loading">
    <iframe :src="frameSrc" class="frame-iframe" ref="frameRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, unref, onMounted, nextTick } from 'vue';

const loading = ref(true);
const frameSrc = ref<string>('https://pipipi-pikachu.github.io/PPTist/');
const frameRef = ref<HTMLElement | null>(null);

const init = () => {
  nextTick(() => {
    const iframe = unref(frameRef);
    if (!iframe) return;
    const _frame = iframe as any;
    if (_frame.attachEvent) {
      _frame.attachEvent('onload', () => {
        loading.value = false;
      });
    } else {
      iframe.onload = () => {
        loading.value = false;
      };
    }
  });
}

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.frame {
  height: calc(100vh - 128px);
  z-index: 998;

  .frame-iframe {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
    box-sizing: border-box;
  }
}

.main-content {
  margin: 2px 0 0 !important;
}
</style>