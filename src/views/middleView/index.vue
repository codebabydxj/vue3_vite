<template>
  <main class="main-interface">
    <router-view v-if="loadSuccess" :key="fullPath"></router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { client } from '@/utils/https/client';
import * as API from '@/utils/server';

export default defineComponent({
  setup() {
    const loadSuccess = ref(false);
    const route = useRoute();
    const fullPath = computed(() => route.fullPath);

    const getUserInfo = () => {
      loadSuccess.value = true;
    }
    getUserInfo();
    return {
      loadSuccess,
      fullPath,
      getUserInfo,
    };
  }
});
</script>

<style scoped lang="scss">
  .main-interface {
    flex: 1 1 auto;
    display: flex;
    overflow: auto;
  }
</style>
