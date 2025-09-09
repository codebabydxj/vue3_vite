<template>
  <nav :class="themeConfig.sidebarLight ? 'navbar-side-light' : 'navbar-side'" :style="{ transition: 'width 0.3s',  width: !isCurCollapse ? '65px' : '250px' }">
    <template v-if="!isCurCollapse">
      <div class="navbar-side-logo">
        <img class="logo_ind" src="../../assets/svg/v.svg" alt="" @click="goHome" />
      </div>
    </template>
    <template v-if="isCurCollapse">
      <div :class="themeConfig.sidebarLight ? 'collapse-light' : 'collapse'" @click="goHome">
        <h4 class="user-sel admin-title">
          <img class="logo" src="../../assets/svg/v.svg" alt="" />
          Vite-Admin
        </h4>
      </div>
    </template>
    <el-scrollbar height="calc(100vh - 105px)" :style="{ width: !isCurCollapse ? '65px' : '251px' }">
      <el-menu
        ref="menuRef"
        class="user-sel el-menu-vertical-demo"
        :background-color="themeConfig.sidebarLight ? 'var(--main-bg-light-color)' : 'var(--main-bg-color)'"
        :text-color="themeConfig.sidebarLight ? 'var(--menu-text-color-light)' : 'var(--menu-text-color-dark)'"
        :active-text-color="themeConfig.sidebarLight ? 'var(--color-text)' : 'var(--color-dark)'"
        :unique-opened="true"
        :collapse="!isCurCollapse"
        :collapse-transition="false"
        :default-active="routeParams.currentRoute.split('?')[0]">
        <SubMenu :menuList="routeParams.menuList" />
      </el-menu>
    </el-scrollbar>
    <div class="user-sel" :class="{ 'eo-active': !isCurCollapse, 'eo': !themeConfig.sidebarLight, 'eo-light': themeConfig.sidebarLight  }">
      <el-tooltip placement="right" :visible="visible" effect="light" :content="isCurCollapse ? $t('menu.fold') : $t('menu.expand')">
        <img src="../../assets/svg/enter.svg" alt="" @mouseenter="visible = true" @mouseleave="visible = false"
          @click="handleSwitch">
      </el-tooltip>
      <!-- <div class="user-sel yogi" v-if="isCurCollapse && delayShow"></div> -->
    </div>
  </nav>
</template>

<script setup lang="ts" name="MenuBar">
import { ref, watch, computed, inject, onBeforeUnmount } from "vue"
import { useGlobalStore } from "@/store"
import { useDebounceFn } from "@vueuse/core"
import { HOME_URL } from "@/config";
import SubMenu from "@/components/menuBar/SubMenu/index.vue"

const props = defineProps(['isCollapse'])
const emit = defineEmits(['isCurCollapseChange'])

const isCurCollapse: any = computed(() => props.isCollapse);
const menuRef: any = ref(null);
const visible = ref(false)
const delayShow = computed(() => props.isCollapse);

// 通过inject获取挂载在全局的globalRouter方法，初始化view
const Router: any = inject('Router')
// 获取store
const myStore: any = useGlobalStore()
const themeConfig = computed(() => myStore.themeConfig)

const routeParams: any = ref({
  currentRoute: computed(() => myStore.currentRoute),
  // 过滤没有权限的路由
  menuList: computed(() => myStore.authMenuListGet),
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
.navbar-side, .navbar-side-light {
  flex: 0 0 auto;
  background-color: var(--main-bg-color);
  overflow: hidden;
  position: relative;

  .el-menu-vertical-demo {
    width: 100%;
  }
  .el-menu {
    border-right: none;
  }
}

.navbar-side:hover {
  transition: opacity 1s;
  .yogi {
    opacity: 1;
    transform: rotateY(360deg);
  }
}

.navbar-side-light {
  background-color: var(--main-bg-light-color);
  border-right: 1px solid var(--color-light-border);
  box-sizing: border-box;
}

.collapse, .collapse-light {
  height: 60px;
  cursor: pointer;
  position: relative;

  .admin-title {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    color: var(--color-dark);
    height: 60px;
    line-height: 60px;
  }

  .logo {
    display: inline-block;
    width: 26px;
    height: 26px;
    vertical-align: middle;
    margin-right: 8px;
    margin-top: -4px;
  }
}

.collapse-light {
  .admin-title {
    color: var(--color-light);
  }
}

.navbar-side-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 43px;
  cursor: pointer;
  .logo_ind {
    display: block;
    width: 24px;
    height: 24px;
  }
}

.eo, .eo-light {
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: var(--main-bg-color);
  box-shadow: 0 0 6px -3px var(--color-text);

  img {
    width: 22px;
    height: 22px;
    cursor: pointer;
    vertical-align: middle;
    margin-left: 22px;
    transition: all 1s;
  }

  .yogi {
    width: 90px;
    height: 35px;
    overflow: hidden;
    position: absolute;
    left: 85px;
    bottom: 0px;
    opacity: 0.7;
    background: url(../../assets/imgs/yogi.png) no-repeat center;
    background-size: 100%;
    transition: all 1s;
  }
}

.eo-light {
  background-color: var(--main-bg-light-color);
  box-shadow: none;
  height: 39px;
  border-top: 1px solid var(--color-light-border);
}

.eo-active {
  transition: width 0.35s;
  img {
    transform: rotateY(180deg);
  }
}
</style>
