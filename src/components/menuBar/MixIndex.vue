<template>
  <nav :class="themeConfig.sidebarLight ? 'navbar-side-light' : 'navbar-side'" class="navbar-side-mix" :style="{ transition: 'width 0.3s',  width: !isCurCollapse ? '65px' : '250px' }">
    <div :class="themeConfig.sidebarLight ? 'collapse-light' : 'collapse'" @click="goHome">
      <h4 class="user-sel admin-title">
        <img class="logo" src="../../assets/svg/v.svg" alt="" />
        <span v-show="isCurCollapse">{{ title }}</span>
      </h4>
    </div>
    <el-scrollbar height="calc(100vh - 105px)" :style="{ width: !isCurCollapse ? '65px' : '251px' }">
      <Menu :isCollapse="isCollapse" :routeParams="routeParams" />
    </el-scrollbar>
    <div class="user-sel" :class="{ 'eo-active': !isCurCollapse, 'eo': !themeConfig.sidebarLight, 'eo-light': themeConfig.sidebarLight  }">
      <el-tooltip placement="right" :visible="visible" effect="light" :content="isCurCollapse ? $t('menu.fold') : $t('menu.expand')">
        <img src="../../assets/svg/enter.svg" alt="" @mouseenter="visible = true" @mouseleave="visible = false"
          @click="handleSwitch">
      </el-tooltip>
    </div>
  </nav>
</template>

<script setup lang="ts" name="MixMenuBar">
import { ref, watch, computed, inject, onBeforeUnmount } from "vue"
import { useGlobalStore } from "@/store"
import { useDebounceFn } from "@vueuse/core"
import { HOME_URL } from "@/config";
import Menu from "@/components/menuBar/Menu/index.vue"

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['isCurCollapseChange'])
const title: any = ref(import.meta.env.VITE_GLOB_APP_TITLE);
const isCurCollapse: any = computed(() => props.isCollapse);
const visible = ref(false)

// 通过inject获取挂载在全局的globalRouter方法，初始化view
const Router: any = inject('Router')
// 获取store
const myStore: any = useGlobalStore()
const themeConfig = computed(() => myStore.themeConfig)

const routeParams: any = ref({
  currentRoute: computed(() => myStore.currentRoute),
  // 过滤没有权限的路由
  menuList: computed(() => {
    // 如果没有children则直接自身菜单给左侧菜单，否则将一级菜单下的children给左侧菜单
    let result: any = []
    const find: any = myStore.currentRoute === '/' ? myStore.authMenuListGet[0] : myStore.authMenuListGet.find((i: any) => i.path === myStore.currentRoute);
    if (find) {
      result = [find]
    } else {
      result = myStore.authMenuListGet.find((i: any) => i.path === `/${myStore.currentRoute.split('/')[1]}`).children;
    }
    return result;
  }),
})

watch(() => isCurCollapse.value, () => {
  emit('isCurCollapseChange', isCurCollapse.value)
})

const goHome = () => {
  Router.openView(HOME_URL);
}

const handleSwitch = () => {
  myStore.setThemeConfig({ ...themeConfig.value, isCollapse: !isCurCollapse.value })
}

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  if (isCurCollapse.value && screenWidth.value < 1200) handleSwitch()
  if (!isCurCollapse.value && screenWidth.value > 1200) handleSwitch()
}, 100);
window.addEventListener("resize", listeningWindow, false);
onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
