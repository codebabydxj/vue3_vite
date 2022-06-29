<template>
  <div class="tabs">
    <el-tabs v-model="routeParams.currentRoute" type="card" closable @tab-click="tabClick" @tab-remove="removeTab"
      @contextmenu.prevent.native="openMenu($event)">
      <el-tab-pane v-for="item in routeParams.routes" :key="item.route" :label="item.title" :name="item.route">
      </el-tab-pane>
    </el-tabs>
    <ul class="contextmenu" v-show="visable" :style="{ left: left + 'px', top: top + 'px' }">
      <li @click="closeOthers">关闭其他</li>
      <li @click="closeLeft">关闭左侧</li>
      <li @click="closeRight">关闭右侧</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, inject, reactive } from 'vue'
import { globalStore } from '@/store'

export default defineComponent({
  setup() {
    // 获取全局store
    const myStore: any = globalStore()
    // 通过inject获取挂载在全局的globalFunc方法，初始化view
    const globalFunc: any = inject('globalFunc')
    globalFunc.initView();

    const routeParams: any = reactive({
      currentRoute: computed(() => myStore.currentRoute),
      routes: computed(() => myStore.routes)
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

    const tabClick = (obj: any) => {
      if (obj.props.name === routeParams.currentRoute) return;
      globalFunc.openView(obj.props.name);
    }
    const removeTab = (route: any) => {
      globalFunc.closeView(route);
    }
    const openMenu = (e: any) => {
      visable.value = true;
      left.value = e.clientX;
      top.value = e.clientY;
    }

    const closeOthers = () => {
      const i = routeParams.routes.find((item: any) => item.route === routeParams.currentRoute);
      myStore.delRoute({ index: 0, count: 1000, item: i });
    }
    const closeLeft = () => {
      const idx = routeParams.routes.findIndex((item: any) => item.route === routeParams.currentRoute);
      myStore.delRoute({ index: 0, count: idx });
    }
    const closeRight = () => {
      const idx = routeParams.routes.findIndex((item: any) => item.route === routeParams.currentRoute);
      myStore.delRoute({ index: idx + 1, count: 1000 });
    }
    const closeMenu = () => {
      visable.value = false;
    }

    return {
      routeParams,
      visable,
      left,
      top,
      tabClick,
      removeTab,
      openMenu,
      closeOthers,
      closeLeft,
      closeRight
    }
  },
});
</script>

<style scoped>
.tabs {
  padding-top: 3px;
  user-select: none;
}

.contextmenu {
  margin: 0;
  background: #ffffff;
  z-index: 2;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
}

.contextmenu li {
  margin: 0;
  padding: 3px 16px;
  cursor: pointer;
}

.contextmenu li:hover {
  background: #eee;
}
</style>
<style>
.tabs .el-tabs--card>.el-tabs__header {
  border-bottom: none;
  margin-bottom: 0;
  padding: 0 2px;
}

.tabs .el-tabs--card>.el-tabs__header .el-tabs__nav {
  border-radius: 0;
}

.navbar-top .tabs-wrap .el-tabs__item.is-active {
  background-color: #ffffff;
}
</style>
