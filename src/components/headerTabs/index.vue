<template>
  <div class="tabs">
    <el-tabs v-model="currentRoute" type="card" @tab-click="tabClick" @tab-remove="removeTab"
      @contextmenu.prevent.native="openMenu($event)">
      <el-tab-pane v-for="item in routes" :key="item.route" :label="item.title" :name="item.route" :closable="item.close">
      </el-tab-pane>
    </el-tabs>
    <ul class="contextmenu" v-show="visable" :style="{ left: left + 'px', top: top + 'px' }">
      <li @click="closeOthers">关闭其他</li>
      <li @click="closeLeft">关闭左侧</li>
      <li @click="closeRight">关闭右侧</li>
      <li @click="closeAll">全部关闭</li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="HeaderTabs">
import { ref, watch, inject, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalStore } from '@/store'
import { useKeepAliveStore } from '@/store/keepAlive'
import { ElMessage } from 'element-plus'
import Sortable from "sortablejs";

const route = useRoute()

// 获取全局store
const myStore: any = useGlobalStore();
const keepAliveStore = useKeepAliveStore();
// 通过inject获取挂载在全局的globalRouter方法，初始化view
const Router: any = inject('Router')
Router.initView();

// 初始化路由
const routes: any = ref([])
const currentRoute: any = ref('')
watchEffect(() => {
  currentRoute.value = myStore.currentRoute;
  routes.value = myStore.routes;
})

const visable = ref(false)
const left = ref(<number>0)
const top = ref(<number>0)

watch(() => visable.value, (value: any) => {
  if (value) {
    document.body.addEventListener('click', closeMenu);
  } else {
    document.body.removeEventListener('click', closeMenu);
  }
})

// 监听路由的变化，设定keepAlive
watch(() => route.fullPath, (newVal: any, oldVal: any) => {
  if (newVal && ![newVal, oldVal].includes('/empty') && (newVal !== oldVal)) {
    route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.name as string);
  }
}, { immediate: true });

onMounted(() => {
  tabsDrop();
})

// tabs 拖拽排序
const tabsDrop = () => {
  Sortable.create(document.querySelector(".el-tabs__nav") as HTMLElement, {
    draggable: ".is-closable",
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const currRow = routes.value.splice(oldIndex as number, 1)[0];
      routes.value.splice(newIndex as number, 0, currRow);
    }
  });
};

const tabClick = (tabItem: any) => {
  Router.openView(tabItem.props.name);
}

const removeTab = (route: any) => {
  Router.closeView(route);
}

const openMenu = (e: any) => {
  visable.value = true;
  left.value = e.clientX;
  top.value = e.clientY;
}

const messageTip = (tip: any = '首页不能关闭') => {
  ElMessage({
    showClose: true,
    grouping: true,
    message: tip,
    type: 'warning',
  });
}

const closeOthers = () => {
  const i = routes.value.find((item: any) => item.route === currentRoute.value);
  const idx = routes.value.findIndex((item: any) => item.route === currentRoute.value);
  keepAliveStore.updateKeepAliveName([route.name] as string[]);
  if (idx === 0) {
    myStore.delRoute({ index: 1, count: routes.value.length - 1 });
    return
  }
  messageTip();
  myStore.delRoute({ index: 1, count: routes.value.length - 1, item: i });
}

const closeLeft = () => {
  const idx = routes.value.findIndex((item: any) => item.route === currentRoute.value);
  if (idx === 1) {
    messageTip();
    return
  }
  myStore.delRoute({ index: 1, count: idx - 1 });
  const updateName = routes.value.map((i: any) => i.name);
  keepAliveStore.updateKeepAliveName(updateName as string[]);
}

const closeRight = () => {
  const idx = routes.value.findIndex((item: any) => item.route === currentRoute.value);
  myStore.delRoute({ index: idx + 1, count: 1000 });
  const updateName = routes.value.map((i: any) => i.name);
  keepAliveStore.updateKeepAliveName(updateName as string[]);
}

const closeAll = () => {
  myStore.delRoute({ index: 1, count: routes.value.length });
  keepAliveStore.updateKeepAliveName();
  Router.openView(routes.value[0].route)
  messageTip();
}

const closeMenu = () => {
  visable.value = false;
}
</script>

<style scoped lang="scss">
.tabs {
  padding-top: 3px;
  user-select: none;
  & .el-tabs {
    --el-tabs-header-height: 45px;
  }
}

.contextmenu {
  margin: 0;
  background: var(--el-bg-color);
  z-index: 2;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: var(--el-text-color-primary);
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
}

.contextmenu li {
  margin: 0;
  padding: 3px 16px;
  cursor: pointer;
}

.contextmenu li:hover {
  background: var(--contextmenu-bg-color);
}
</style>
<style>
.tabs .el-tabs--card>.el-tabs__header {
  border-bottom: none;
  margin-bottom: 0;
  padding-right: 2px;
}

.tabs .el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: none;
  border-radius: 0;
}

.navbar-top .tabs-wrap .el-tabs__item {
  color: #fefefea6 !important;
}

.navbar-top .tabs-wrap .el-tabs__item:hover {
  color: var(--color-white) !important;
}

.navbar-top .tabs-wrap .el-tabs__item.is-active {
  background-color: var(--el-bg-color) !important;
  color: var(--color-text) !important;
  font-weight: 700;
}

.navbar-top .tabs-wrap .el-tabs--card>.el-tabs__header .el-tabs__item {
  border: none;
}
</style>
