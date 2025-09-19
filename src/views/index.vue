<template>
  <el-watermark id="watermark" :font="font" :content="watermark ? ['Vite Admin', 'Hello World ~'] : ''">
    <div class="vite-main">
      <MenuBar :isCollapse="isCollapse" @isCurCollapseChange="isCurCollapseChange"></MenuBar>
      <MixMenuBar v-if="themeConfig.layoutType === 'mix'" :isCollapse="isCollapse" @isCurCollapseChange="isCurCollapseChange"></MixMenuBar>
      <Content class="el_content" :isCollapse="isCollapse">
        <template v-slot:content>
          <MenuBar v-if="themeConfig.layoutType === 'mix'" :isCollapse="isCollapse" :mixLayout="true" @isCurCollapseChange="isCurCollapseChange"></MenuBar>
          <ComHeader :showConfig="themeConfig.layoutType === 'classic' ? true : false">
            <template v-slot:tabs>
              <Tabs></Tabs>
            </template>
          </ComHeader>
          <Breadcrumb v-show="myStore.themeConfig.isBreadcrumb" id="breadcrumb" />
          <router-view v-slot="{ Component, route }">
            <transition appear :name="transitionAnimation" mode="out-in">
              <keep-alive :include="keepAliveName">
                <component :is="Component" :key="route.fullPath" v-if="isRefreshRouter" />
              </keep-alive>
            </transition>
          </router-view>
        </template>
      </Content>
      <Toolbar />
    </div>
  </el-watermark>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/store";
import { useKeepAliveStore } from "@/store/keepAlive";
import MenuBar from "@/components/menuBar/index.vue";
import MixMenuBar from "@/components/menuBar/MixIndex.vue";
import Content from "@/components/mainContent/index.vue";
import ComHeader from "@/components/mainHeader/index.vue";
import Toolbar from "@/components/mainToolBar/index.vue";
import Tabs from "@/components/headerTabs/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue"

// 主题配置
const myStore: any = useGlobalStore()
const themeConfig = computed(() => myStore.themeConfig)
const isCollapse: any = ref(myStore.themeConfig.isCollapse)
const transitionAnimation: any = ref(myStore.themeConfig.transitionAnimation)
const isDark = computed(() => myStore.themeConfig.isDark)
const watermark = computed(() => myStore.themeConfig.isWatermark)
const flexDirection: any = computed(() => ['transverse'].includes(themeConfig.value.layoutType) ? "column" : "row")

// keep页面缓存
const keepAliveStore = useKeepAliveStore()
const { keepAliveName } = storeToRefs(keepAliveStore);

const font: any = ref({ color: "rgba(0, 0, 0, .15)" });
watch(isDark, () => (font.value.color = isDark.value ? "rgba(255, 255, 255, .15)" : "rgba(0, 0, 0, .15)"), {
  immediate: true
});

/**
 *  @description: 注入全局刷新当前页面
 *  使用: 
 *  const route = useRoute();
 *  const refreshCurrentRouter: Function = inject('refresh') as Function;
 *  const refresh = () => {
      setTimeout(() => {
        route.meta.isKeepAlive && keepAliveStore.removeKeepAliveName(route.fullPath as string);
        refreshCurrentRouter(false);
        nextTick(() => {
          route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.fullPath as string);
          refreshCurrentRouter(true);
        });
      }, 0);
    };
*/
const isRefreshRouter = ref(true);
const refreshCurrentRouter = (val: boolean) => (isRefreshRouter.value = val);
provide("refresh", refreshCurrentRouter);

// 监听菜单收起展开
watch(() => myStore.themeConfig.isCollapse, (newVal: any) => {
  isCollapse.value = newVal
})
// 设置菜单收起展开 
const isCurCollapseChange = (bool: any) => {
  myStore.setThemeConfig({ ...themeConfig.value, isCollapse: bool });
}

// 设置过渡动画重载页面
const reloadPage = async (delay: any = 600) => {
  isRefreshRouter.value = false
  await nextTick()
  if (delay) {
    setTimeout(() => {
      isRefreshRouter.value = true
    }, delay)
  }
  else {
    isRefreshRouter.value = true
  }
}
// 监听设置过渡动画
watch(() => myStore.themeConfig.transitionAnimation, async (newVal: any) => {
  transitionAnimation.value = newVal
  reloadPage()
})
</script>

<style scoped lang="scss">
.vite-main {
  display: flex;
  flex-direction: v-bind(flexDirection);
  height: 100%;

  .el_content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
