<template>
  <nav class="navbar-side" :style="{ transition: 'width 0.3s',  width: !isCurCollapse ? '65px' : '250px' }">
    <template v-if="!isCurCollapse">
      <div class="navbar-side-logo">
        <img class="logo_ind" src="../../assets/svg/v.svg" alt="" @click="goHome" />
      </div>
    </template>
    <template v-if="isCurCollapse">
      <div class="collapse" @click="goHome">
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
        background-color="#191a20"
        text-color="#fefefea6"
        active-text-color="#ffffff"
        :unique-opened="true"
        :collapse="!isCurCollapse"
        :collapse-transition="false"
        :default-active="routeParams.currentRoute.split('?')[0]">
        <SubMenu :menuList="routeParams.menuList" />
      </el-menu>
    </el-scrollbar>
    <div class="user-sel eo" :class="{ 'active': !isCurCollapse }">
      <el-tooltip placement="right" :visible="visible" effect="light" :content="isCurCollapse ? '点击折叠' : '点击展开'">
        <img src="../../assets/svg/enter.svg" alt="" @mouseenter="visible = true" @mouseleave="visible = false"
          @click="handleSwitch">
      </el-tooltip>
      <div class="user-sel yogi" v-if="isCurCollapse && delayShow"></div>
    </div>
  </nav>
</template>

<script setup lang="ts" name="MenuBar">
import { ref, watch, computed, inject, onBeforeUnmount } from "vue"
import { useGlobalStore } from "@/store"
import { useDebounceFn } from "@vueuse/core"
import _ from "lodash"
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
.navbar-side {
  flex: 0 0 auto;
  background-color: var(--main-bg-color);
  overflow: hidden;
  position: relative;

  .collapse {
    height: 60px;
    cursor: pointer;
    position: relative;
  }

  .logo {
    display: inline-block;
    width: 22px;
    height: 22px;
    vertical-align: middle;
    margin-right: 4px;
    margin-top: -4px;
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

  .admin-title {
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    color: var(--color-white);
    height: 60px;
    line-height: 60px;
  }

  .eo {
    height: 40px;
    width: 100%;
    line-height: 40px;
    position: absolute;
    bottom: 0;
    background-color: var(--main-bg-color);
    box-shadow: 0 0 6px -3px var(--color-text);

    img {
      width: 20px;
      height: 20px;
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

  .active {
    transition: width 0.35s;
    img {
      transform: rotateY(180deg);
    }
  }
}

.navbar-side .el-menu-vertical-demo {
  width: 100%;
}

.navbar-side .el-menu {
  border-right: none;
}

.navbar-side:hover {
  transition: opacity 1s;
  .yogi {
    opacity: 1;
    transform: rotateY(360deg);
  }
}
</style>
