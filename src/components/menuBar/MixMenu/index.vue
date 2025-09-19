<template>
  <el-menu
    class="user-sel el-menu-mixing"
    :mode="'horizontal'"
    :background-color="themeConfig.sidebarLight ? 'var(--main-bg-light-color)' : 'var(--main-bg-color)'"
    :text-color="themeConfig.sidebarLight ? 'var(--menu-text-color-light)' : 'var(--menu-text-color-dark)'"
    :active-text-color="themeConfig.sidebarLight ? 'var(--color-text)' : 'var(--color-dark)'"
    :default-active="defaultActive">
    <el-menu-item v-for="item in menuList" :index="resolvePath(item)" :key="item.id" @click="changeSubMenu(item)">
      <svg-icon v-if="item.meta.svgIcon" :name="item.meta.svgIcon" :iconStyle="{ width: '22px', height: '22px', marginRight: '8px'}" />
      <el-icon v-else-if="item.meta.icon" :size="20" style="margin: 0 8px 0 -2px;">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts" name="MixMenu">
import { computed, inject } from "vue";
import { useGlobalStore } from "@/store";

const Router: any = inject('Router')
const myStore: any = useGlobalStore()
const themeConfig = computed(() => myStore.themeConfig)
const menuList = computed(() => myStore.authMenuListGet)
const resolvePath = computed(() => (item: any) => {
  if (!item?.children?.length) return item.path;
  const routeChildPath = item.children[0]?.path;
  return routeChildPath;
})
const defaultActive = computed(() => {
  const find = menuList.value.find((i: any) => i.path === myStore.currentRoute || i.path === `/${myStore.currentRoute.split('/')[1]}`);
  if (find?.children?.length) {
    return find.children[0].path;
  }
  return myStore.currentRoute;
})
const layoutDisplay: any = computed(() => themeConfig.value.layoutType === 'classic' ? 'block' : 'none')

const changeSubMenu = (item: any) => {
  if (item.path === myStore.currentRoute || item.redirect === myStore.currentRoute) return;
  const find: any = myStore.authMenuListGet.find((i: any) => i.path === item.path);
  const path: any = find?.children?.[0]?.path || item.path;
  Router.openView(path);
}
</script>

<style scoped lang="scss">
.el-menu-mixing {
  width: 100%;
}
.navbar-mix {
  .el-menu>.el-menu-item.is-active::after {
    display: v-bind(layoutDisplay);
  }
  .el-menu>.el-menu-item.is-active::before {
    display: v-bind(layoutDisplay);
  }
}
</style>