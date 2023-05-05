<template>
  <div class="vite-main">
    <MenuBar :isCollapse="isCollapse" @isCurCollapseChange="isCurCollapseChange"></MenuBar>
    <Content class="el_content" :isCollapse="isCollapse">
      <template v-slot:content>
        <ComHeader>
          <template v-slot:tabs>
            <Tabs></Tabs>
          </template>
        </ComHeader>
        <router-view v-slot="{ Component, route }">
          <transition appear :name="isTransition ? 'fade-transform' : ''" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
      </template>
    </Content>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { globalStore } from '@/store'
import MenuBar from '@/components/menuBar/index.vue';
import Content from '@/components/mainContent/index.vue';
import ComHeader from '@/components/mainHeader/index.vue';
import Tabs from '@/components/headerTabs/index.vue';

const myStore: any = globalStore()
const themeConfig = computed(() => myStore.themeConfig)
const isCollapse: any = ref(myStore.themeConfig.isCollapse)
const isTransition: any = ref(myStore.themeConfig.isTransition)

watch(() => myStore.themeConfig.isCollapse, (newVal: any) => {
  isCollapse.value = newVal
})

watch(() => myStore.themeConfig.isTransition, (newVal: any) => {
  isTransition.value = newVal
})

const isCurCollapseChange = (bool: any) => {
  myStore.setThemeConfig({ ...themeConfig.value, isCollapse: bool });
}
</script>

<style scoped lang="scss">
.vite-main {
  display: flex;
  height: 100%;

  .el_content {
    height: 100%;
    overflow: auto;
  }
}
</style>
