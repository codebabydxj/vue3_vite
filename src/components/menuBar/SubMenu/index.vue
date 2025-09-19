<template>
  <template v-for="subItem in menuList">
    <template v-if="subItem.children?.length">
      <el-sub-menu :index="subItem.path" :key="subItem.id">
        <template #title>
          <svg-icon v-if="subItem.meta.svgIcon" :name="subItem.meta.svgIcon" :iconStyle="{ width: '22px', height: '22px', marginRight: '8px'}" />
          <el-icon v-else-if="subItem.meta.icon" :size="20" style="margin: 0 8px 0 -2px;">
            <component :is="subItem.meta.icon"></component>
          </el-icon>
          <span slot="title">{{ subItem.meta.title }}</span>
        </template>
        <SubMenu :menuList="subItem.children" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="subItem.path" :key="subItem.id" @click="routeGo(subItem)">
        <svg-icon v-if="subItem.meta.svgIcon" :name="subItem.meta.svgIcon" :iconStyle="{ width: '22px', height: '22px', marginRight: '8px'}" />
        <el-icon v-else-if="subItem.meta.icon" :size="20" style="margin: 0 8px 0 -2px;">
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ subItem.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts" name="SubMenu">
import { computed, inject } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "@/store";
import SubMenu from "@/components/menuBar/SubMenu/index.vue";

const props = defineProps({
  menuList: {
    type: Array as any,
    default: () => []
  }
})
const router = useRouter();
const Router: any = inject('Router');
const myStore: any = useGlobalStore();
const themeConfig = computed(() => myStore.themeConfig);
const currentRoute = computed(() => myStore.currentRoute);
const popupColor: any = computed(() => themeConfig.value.sidebarLight ? 'var(--color-light)' : 'var(--color-dark)');
const popupActiveColor: any = computed(() => themeConfig.value.sidebarLight ? 'var(--color-text)' : 'var(--color-dark)');
const popupBgColor: any = computed(() => themeConfig.value.sidebarLight ? 'var(--menu-item-active-bg-color-light)' : 'var(--menu-item-active-bg-color)');
const menuAfterIcon: any = computed(() => themeConfig.value.isCollapse ? 'block' : 'none');

const routeGo = (subItem: any) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  if (subItem.meta.isFull) {
    router.push(subItem.path)
    return
  }
  if (subItem.path === currentRoute) return;
  Router.openView(subItem.path);
}
</script>

<style lang="scss">
$size-1: 13px;
$size-2: 15px;
$margin-1: 0px 8px 0px -6px;

.navbar-side, .navbar-side-light {
  .el-sub-menu__title {
    color: var(--menu-text-color-dark) !important;

    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.navbar-side-light {
  .el-sub-menu__title {
    color: var(--menu-text-color-light) !important;
  }
}

.navbar-side .el-menu--collapse>.el-sub-menu.is-active>.el-sub-menu__title {
  background-color: var(--menu-item-active-bg-color) !important;
}
.navbar-side-light .el-menu--collapse>.el-sub-menu.is-active>.el-sub-menu__title {
  background-color: var(--menu-item-active-bg-color-light) !important;
}

.navbar-side .el-sub-menu__title>.el-icon>svg {
  color: var(--menu-text-color-dark) !important;
}
.navbar-side-light .el-sub-menu__title>.el-icon>svg {
  color: var(--menu-text-color-light) !important;
}

.navbar-side .el-menu>.el-sub-menu:hover {
  transition: color 0.3s;

  .el-sub-menu__title,
  .el-sub-menu__title>.el-icon>svg {
    color: var(--color-dark) !important;
  }
}
.navbar-side-light .el-menu>.el-sub-menu:hover {
  transition: color 0.3s;

  .el-sub-menu__title,
  .el-sub-menu__title>.el-icon>svg {
    color: var(--color-light) !important;
  }
}

.navbar-side .el-sub-menu__title:hover {
  background-color: var(--menu-item-active-bg-color);
}
.navbar-side-light .el-sub-menu__title:hover {
  background-color: var(--menu-item-active-bg-color-light);
}

.navbar-side .el-menu>.el-sub-menu.is-active {

  .el-sub-menu__title,
  .el-sub-menu__title>.el-icon>svg {
    color: var(--color-dark) !important;
  }
}
.navbar-side-light .el-menu>.el-sub-menu.is-active {

  .el-sub-menu__title,
  .el-sub-menu__title>.el-icon>svg {
    color: var(--color-light) !important;
  }
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu {
  background-color: var(--menu-bg-color) !important;
}

.navbar-side {
  .el-menu-item.is-active {
    background-color: var(--menu-item-active-bg-color) !important;
  }
}
.navbar-side-light {
  .el-menu-item.is-active {
    background-color: var(--menu-item-active-bg-color-light) !important;
  }
}
.navbar-side, .navbar-side-light {
  .el-menu>.el-sub-menu>.el-menu>.el-menu-item {
    padding: 0 20px 0 50px !important;
    font-size: $size-1;
    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .el-menu>.el-sub-menu>.el-menu>.el-menu-item>.el-icon {
    font-size: $size-2 !important;
    margin: $margin-1 !important;
  }
}
.navbar-side-mix {
  .el-menu>.el-menu-item {
    padding: 0 30px !important;
    font-size: $size-1;
    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .el-menu>.el-menu-item>.el-icon {
    font-size: $size-2 !important;
    margin: $margin-1 !important;
  }
}

.navbar-side .el-menu>.el-menu-item:hover {
  color: var(--color-dark) !important;
  background-color: var(--menu-item-active-bg-color) !important;
}
.navbar-side-light .el-menu>.el-menu-item:hover {
  color: var(--color-light) !important;
  background-color: var(--menu-item-active-bg-color-light) !important;
}

.navbar-side .el-menu>.el-menu-item.is-active:hover {
  color: var(--color-dark) !important;
  background-color: var(--menu-item-active-bg-color) !important;
}
.navbar-side-light .el-menu>.el-menu-item.is-active:hover {
  color: var(--color-text) !important;
  background-color: var(--menu-item-active-bg-color-light) !important;
}

.navbar-side, .navbar-side-light {
  .el-menu>.el-menu-item.is-active::after {
    content: '🙂';
    display: v-bind(menuAfterIcon);
    position: absolute;
    width: 0px;
    height: 50px;
    right: 25px;
    top: 0;
  }
  .el-menu>.el-menu-item.is-active::before {
    content: '';
    display: block;
    position: absolute;
    width: 4px;
    height: 42px;
    background-color: var(--menu-item-check-color) !important;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}

.el-menu--popup-container>.el-menu--popup>.el-menu-item {
  font-size: $size-1;
}
.el-menu--popup-container>.el-menu--popup>.el-menu-item>.el-icon {
  font-size: $size-2 !important;
  margin: $margin-1 !important;
}
.el-menu--popup-container>.el-menu--popup>.el-menu-item:hover {
  color: v-bind(popupColor) !important;
  background-color: v-bind(popupBgColor) !important;
}
.el-menu--popup-container>.el-menu--popup>.el-menu-item.is-active:hover {
  color: v-bind(popupActiveColor) !important;
}
</style>