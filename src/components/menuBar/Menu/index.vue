<template>
  <el-menu
    ref="menuRef"
    class="user-sel el-menu-vertical-demo"
    :mode="mode"
    :background-color="themeConfig.sidebarLight ? 'var(--main-bg-light-color)' : 'var(--main-bg-color)'"
    :text-color="themeConfig.sidebarLight ? 'var(--menu-text-color-light)' : 'var(--menu-text-color-dark)'"
    :active-text-color="themeConfig.sidebarLight ? 'var(--color-text)' : 'var(--color-dark)'"
    :unique-opened="themeConfig.accordion"
    :collapse="mode === 'horizontal' ? false : !isCurCollapse"
    :collapse-transition="false"
    :default-active="routeParams.currentRoute.split('?')[0]">
    <template v-if="mode === 'horizontal'">
      <!-- 不能直接使用 SubMenu 组件，无法触发 el-menu 隐藏省略功能 -->
      <template v-for="subItem in routeParams.menuList">
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
    <SubMenu v-else :menuList="routeParams.menuList" />
  </el-menu>
</template>

<script setup lang="ts" name="Menu">
import { ref, computed, inject, PropType } from "vue";
import { useRouter } from "vue-router"
import type { EpPropMergeType } from "element-plus/es/utils";
import { useGlobalStore } from "@/store";
import SubMenu from "@/components/menuBar/SubMenu/index.vue";

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  },
  routeParams: {
    type: Object,
    default: () => ({})
  },
  mode: {
    type: String as PropType<EpPropMergeType<StringConstructor, 'horizontal' | 'vertical', unknown>>,
    default: 'vertical',
  }
})
const emit = defineEmits(['isCurCollapseChange'])

const router = useRouter()
const Router: any = inject('Router')
const isCurCollapse: any = computed(() => props.isCollapse);
const menuRef: any = ref(null);


// 获取store
const myStore: any = useGlobalStore()
const themeConfig = computed(() => myStore.themeConfig)
const currentRoute = computed(() => myStore.currentRoute)
const layoutDisplay: any = computed(() => themeConfig.value.layoutType === 'classic' ? 'block' : 'none')

const routeGo = (subItem: any) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  if (subItem.meta.isFull) {
    router.push(subItem.path)
    return
  }
  if (subItem.path === currentRoute.value) return;
  if (themeConfig.value.layoutType === 'mix') { // 混合布局
    const find: any = myStore.authMenuListGet.find((i: any) => i.path === subItem.path);
    if (find?.children?.length) {
      Router.openView(find.children[0].path);
    } else {
      Router.openView(subItem.path);
    }
    return;
  }
  Router.openView(subItem.path);
}
</script>

<style scoped lang="scss">
.navbar-side, .navbar-side-light {
  .el-menu>.el-menu-item.is-active::after {
    display: v-bind(layoutDisplay);
  }
  .el-menu>.el-menu-item.is-active::before {
    display: v-bind(layoutDisplay);
  }
}
</style>
