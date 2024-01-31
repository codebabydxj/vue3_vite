<template>
  <nav class="navbar-side">
    <template v-if="!isCurCollapse">
      <img class="logo_ind" src="../../assets/svg/v.svg" alt="" @click="goHome" />
    </template>
    <template v-if="isCurCollapse">
      <div class="collapse" @click="goHome">
        <h4 class="user-sel admin-title">
          <img class="logo" src="../../assets/svg/v.svg" alt="" />
          Vite-Admin
        </h4>
      </div>
    </template>
    <div class="search-wrap" :class="{ 'search-wrap-active': isCurCollapse }">
      <input class="search-input" type="text" placeholder="请输入关键词" name="searchInput" autocomplete="off"
        v-model="searchInput" @input="handleInput">
      <template v-if="isShowSoIcon">
        <el-icon :size="18" style="margin-left: 15px;" color="#d7d7d7">
          <Search />
        </el-icon>
      </template>
      <template v-else>
        <el-icon :size="18" color="#a5a5a5" style="margin-left: 15px; cursor: pointer;" @click="cleanInput">
          <CloseBold />
        </el-icon>
      </template>
    </div>
    <el-scrollbar height="calc(100vh - 160px)">
      <el-menu ref="menuRef" class="user-sel el-menu-vertical-demo" background-color="#191a20" text-color="#fefefea6"
        active-text-color="#ffffff" :unique-opened="true" :collapse="!isCurCollapse" :collapse-transition="false"
        :default-active="routeParams.currentRoute.split('?')[0]">
        <el-sub-menu v-for="routeWrap in routeParams.menuListFilterd" :index="routeWrap.path" :key="routeWrap.path">
          <template #title>
            <el-icon :size="16">
              <component :is="routeWrap.meta.icon" color="#fefefea6"></component>
            </el-icon>
            <span slot="title">{{ routeWrap.meta.title }}</span>
          </template>
          <template v-for="route in routeWrap.children" :key="route.path.split('?')[0]">
            <el-menu-item :index="route.path" @click="routeGo(route.path)">
              {{ route.meta.title }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
    <div class="user-sel eo" :class="!isCurCollapse ? 'active': 'not-active'">
      <el-tooltip placement="right" :visible="visible" effect="light" :content="isCurCollapse ? '点击折叠' : '点击展开'">
        <img src="../../assets/svg/enter.svg" alt="" @mouseenter="visible = true" @mouseleave="visible = false"
          @click="handleSwitch">
      </el-tooltip>
      <div class="user-sel yogi" v-if="isCurCollapse && delayShow"></div>
    </div>
  </nav>
</template>

<script setup lang="ts" name="MenuBar">
import { ref, watch, computed, inject, reactive, onBeforeUnmount } from 'vue'
import { globalStore } from '@/store'
import { useDebounceFn } from "@vueuse/core";
import _ from 'lodash'

const props = defineProps(['isCollapse'])
const emit = defineEmits(['isCurCollapseChange'])

const isCurCollapse: any = computed(() => props.isCollapse);
const searchInput: any = ref('');
const isShowSoIcon: any = ref(true);
const menuRef: any = ref(null);
const visible = ref(false)
const delayShow = computed(() => props.isCollapse);

// 通过inject获取挂载在全局的globalRouter方法，初始化view
const globalRouter: any = inject('globalRouter')
// 获取store
const myStore: any = globalStore()
const themeConfig = computed(() => myStore.themeConfig)

const routeParams: any = reactive(<any>{
  currentRoute: computed(() => myStore.currentRoute),
  // 过滤没有权限的路由
  menuList: computed(() => myStore.authMenuListGet),
  // 过滤出搜索菜单
  menuListFilterd: computed(() => {
    const rc_filter = routeParams.menuList.map((routeWrap: any) => {
      const routerWrapDeepClone = _.cloneDeep(routeWrap);
      const reg = new RegExp(searchInput.value, 'i');
      // 匹配子菜单
      routerWrapDeepClone.children = routeWrap.children.filter((route: any) => reg.test(route.meta && route.meta.title));
      return routerWrapDeepClone;
    });
    return rc_filter.filter((item: any) => item.children.length);
  })
})

watch(() => isCurCollapse.value, () => {
  emit('isCurCollapseChange', isCurCollapse.value)
})

const goHome = () => {
  globalRouter.openView('/basic/home');
}

const handleInput = () => {
  searchInput.value = searchInput.value.replace(/\s+/g, '');
  if (searchInput.value.length > 0) {
    isShowSoIcon.value = false;
    return
  }
  isShowSoIcon.value = true;
}
const cleanInput = () => {
  searchInput.value = '';
  isShowSoIcon.value = true;
}
const routeGo = (route: any) => {
  if (route === routeParams.currentRoute) return;
  globalRouter.openView(route);
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

<style lang="scss">
.navbar-side {
  flex: 0 0 auto;
  background-color: var(--main-bg-color);
  overflow: hidden;
  position: relative;

  .collapse {
    height: 60px;
    box-shadow: 0 0 6px -2px var(--color-text);
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

  .logo_ind {
    display: block;
    margin: 8px auto 0;
    width: 24px;
    height: 24px;
    cursor: pointer;
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
    line-height: 40px;
    position: fixed;
    bottom: 0;
    background-color: var(--main-bg-color);
    box-shadow: 0 0 6px -2px var(--color-text);

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

  .not-active {
    transition: width 0.45s;
    width: 219px;
  }

  .active {
    transition: width 0.35s;
    width: 63px;
    img {
      transform: rotateY(180deg);
    }
  }
}

.navbar-side:hover {
  transition: opacity 1s;

  .yogi {
    opacity: 1;
    transform: rotateY(360deg);
  }
}

.navbar-side .el-sub-menu__title {
  color: #fefefea6 !important;
}

.navbar-side .el-menu--collapse>.el-sub-menu.is-active>.el-sub-menu__title {
  background-color: var(--menu-item-active-bg-color) !important;
}

.navbar-side .el-sub-menu__title>.el-icon>svg {
  color: #fefefea6 !important;
}

.navbar-side .el-menu>.el-sub-menu:hover {
  transition: color 0.3s;

  .el-sub-menu__title,
  .el-sub-menu__title>.el-icon>svg {
    color: var(--color-white) !important;
  }
}

.navbar-side .el-menu>.el-sub-menu.is-active {

  .el-sub-menu__title,
  .el-sub-menu__title>.el-icon>svg {
    color: var(--color-white) !important;
  }
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu {
  background-color: var(--menu-bg-color) !important;
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item {
  background-color: var(--menu-bg-color) !important;
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item.is-active {
  background-color: var(--menu-item-active-bg-color) !important;
}

.navbar-side .el-menu>.el-sub-menu>.el-menu>.el-menu-item {
  padding: 0 50px !important;
  font-size: 13px;
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item:hover {
  color: var(--color-white) !important;
  background-color: var(--menu-bg-color) !important;
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item.is-active:hover {
  color: var(--color-white) !important;
  background-color: var(--menu-item-active-bg-color) !important;
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item.is-active::after {
  content: '✨';
  display: block;
  position: absolute;
  width: 0px;
  height: 50px;
  right: 34px;
  top: 0;
}
.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item.is-active::before {
  content: '';
  display: block;
  position: absolute;
  width: 4px;
  height: 42px;
  background-color: var(--menu-item-check-color) !important;
  left: 0;
  top: 4px;
}

.el-menu--popup-container>.el-menu--popup>.el-menu-item:hover {
  color: var(--color-white) !important;
}

.navbar-side .search-wrap {
  transition: all 0.7s;
  width: 0;
  height: 0;
  margin: 0;
  border-bottom: 1px solid #878d99;
  overflow: hidden;
}

.navbar-side .search-wrap .search-input {
  width: 155px;
  color: #edf2fc;
  font-size: 14px;
  background-color: transparent;
  border: none;
  outline: none;
}

.navbar-side .search-wrap .search-input::-webkit-input-placeholder {
  color: #878d99;
}

.navbar-side .search-wrap .search-input::-moz-placeholder {
  color: #878d99;
}

.navbar-side .search-wrap .search-input::-ms-input-placeholder {
  color: #878d99;
}

.navbar-side .search-wrap.search-wrap-active {
  width: 190px;
  height: 28px;
  margin: 15px;
  line-height: 28px;
}

.navbar-side .search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 56px;
  cursor: pointer;
  line-height: 56px;
  transition: background-color .5s, color .5s;
}

.navbar-side .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
  padding-bottom: 40px;
}

.navbar-side .el-menu {
  border-right: none;
}
</style>
