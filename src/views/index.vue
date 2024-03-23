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
            <keep-alive :include="keepAliveName">
              <component :is="Component" :key="route.fullPath" v-if="isRefreshRouter" />
            </keep-alive>
          </transition>
        </router-view>
      </template>
    </Content>
    <Toolbar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { globalStore } from "@/store";
import { useKeepAliveStore } from "@/store/keepAlive";
import MenuBar from "@/components/menuBar/index.vue";
import Content from "@/components/mainContent/index.vue";
import ComHeader from "@/components/mainHeader/index.vue";
import Toolbar from "@/components/mainToolBar/index.vue";
import Tabs from "@/components/headerTabs/index.vue";

// 主题配置
const myStore: any = globalStore()
const themeConfig = computed(() => myStore.themeConfig)
const isCollapse: any = ref(myStore.themeConfig.isCollapse)
const isTransition: any = ref(myStore.themeConfig.isTransition)

// keep页面缓存
const keepAliveStore = useKeepAliveStore()
const { keepAliveName } = storeToRefs(keepAliveStore);

/**
 * desc: 注入全局刷新路由方法
 * use: const refreshCurrentRouter: Function = inject("refresh") as Function; refreshCurrentRouter(true/false);
 */
const isRefreshRouter = ref(true);
const refreshCurrentRouter = (val: boolean) => (isRefreshRouter.value = val);
provide("refresh", refreshCurrentRouter);
watchEffect(() => {
  console.log('isRefreshRouter-------', keepAliveName.value);
})

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
    overflow-y: auto;
    overflow-x: hidden ;
  }
}
</style>
