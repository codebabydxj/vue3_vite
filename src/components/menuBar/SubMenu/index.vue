<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <el-icon :size="16">
          <component :is="subItem.meta.icon" color="#fefefea6"></component>
        </el-icon>
        <span slot="title">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menuList="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="routeGo(subItem)">
      <el-icon v-if="subItem.meta.icon">
        <component :is="subItem.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
export default {
  name: 'SubMenu'
}
</script>
<script setup lang="ts">
import { computed, inject } from "vue"
import { useRouter } from "vue-router"
import { globalStore } from "@/store"
import SubMenu from "@/components/menuBar/SubMenu/index.vue"

const props = defineProps({
  menuList: {
    type: Array as any,
    default: () => []
  }
})
const globalRouter: any = inject('globalRouter')
const myStore: any = globalStore()
const currentRoute = computed(() => myStore.currentRoute)
const router = useRouter()

const routeGo = (subItem: any) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  if (subItem.meta.isFull) {
    router.push(subItem.path)
    return
  }
  if (subItem.path === currentRoute) return;
  globalRouter.openView(subItem.path);
}
</script>

<style lang="scss">
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

.navbar-side .el-sub-menu__title:hover {
  background-color: var(--menu-item-active-bg-color);
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

// .navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item {
//   background-color: var(--menu-bg-color) !important;
// }

.navbar-side {
  .el-menu-item.is-active {
    background-color: var(--menu-item-active-bg-color) !important;
  }
}

.navbar-side .el-menu>.el-sub-menu>.el-menu>.el-menu-item {
  padding: 0 50px !important;
  font-size: 13px;
}

.navbar-side .el-menu>.el-menu-item:hover {
  color: var(--color-white) !important;
  background-color: var(--menu-item-active-bg-color) !important;
}

.navbar-side .el-menu>.el-menu-item.is-active:hover {
  color: var(--color-white) !important;
  background-color: var(--menu-item-active-bg-color) !important;
}

.navbar-side .el-menu>.el-menu-item.is-active::after {
  content: '✨';
  display: block;
  position: absolute;
  width: 0px;
  height: 50px;
  right: 34px;
  top: 0;
}
.navbar-side .el-menu>.el-menu-item.is-active::before {
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
</style>