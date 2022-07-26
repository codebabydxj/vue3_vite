<template>
  <nav class="navbar-side">
    <template v-if="!isCurCollapse">
      <img class="logo_ind" src="../assets/vite.png" alt=""/>
    </template>
    <div class="collapse-wrap">
      <el-switch active-color="#13ce66" inactive-color="#878D99" v-model="isCurCollapse"></el-switch>
    </div>
    <h4 v-if="isCurCollapse" style="textAlign: center; color: #fff; margin-top: 5px;">
      <img class="logo" src="../assets/vite.png" alt=""/>
      后台管理系统
    </h4>
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
    <div class="search-btn" v-if="!isCurCollapse" @click="searchTog">
      <el-icon :size="18" color="#ffffff">
        <Search />
      </el-icon>
    </div>
    <el-menu ref="menuRef" class="el-menu-vertical-demo" background-color="#2d2f33" text-color="#f5f7fa"
      active-text-color="#eb9e05" :unique-opened="true" :collapse="!isCurCollapse"
      :default-active="routeParams.currentRoute.split('?')[0] === '/' ? '/welcome' : routeParams.currentRoute.split('?')[0]">
      <el-sub-menu v-for="routeWrap in routeParams.routerConfigFilterd" :index="routeWrap.key" :key="routeWrap.key"
        @click.native="ubfold(routeWrap.key)">
        <template #title>
          <el-icon :size="16">
            <component :is="routeWrap.icon" color="#ffffff"></component>
          </el-icon>
          <span slot="title">{{ routeWrap.title }}</span>
        </template>
        <el-menu-item v-for="route in routeWrap.routes" :index="route.path" :key="route.path.split('?')[0]"
          @click="routeGo(route.path)">
          {{ route.title }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </nav>
</template>

<script lang="ts">
import _ from 'lodash'
import { defineComponent, ref, watch, computed, inject, reactive } from 'vue'
import { globalStore } from '@/store'

export default defineComponent({
  props: ['isCollapse'],
  emits: ['isCurCollapseChange'],
  setup(props, { emit }) {
    const isCurCollapse: any = ref(props.isCollapse);
    const searchInput: any = ref('');
    const isShowSoIcon: any = ref(true);
    const menuRef: any = ref(null);

    // 通过inject获取挂载在全局的globalFunc方法，初始化view
    const globalFunc: any = inject('globalFunc')
    // 获取store
    const myStore: any = globalStore()

    const routeParams: any = reactive(<any>{
      currentRoute: computed(() => myStore.currentRoute),
      routerConfig: computed(() => {
        // 过滤没有权限的路由
        const rc = myStore.routerConfig.filter((v: any) => v.access); // 过滤一级（router-config-->access为false的菜单）
        rc.forEach((level: any) => {
          level.routes = level.routes.filter((item: any) => level.access && item.access); // 过滤二级
        });
        // 根据sort排序
        rc.sort((x: any, y: any) => x.sort - y.sort); // 一级菜单排序
        rc.forEach((level: any) => {
          level.routes.sort((x: any, y: any) => x.sort - y.sort); // 二级菜单排序
        });
        return rc;
      }),
      routerConfigFilterd: computed(() => {
        const rc_filter = routeParams.routerConfig.map((routeWrap: any) => {
          const routerWrapDeepClone = _.cloneDeep(routeWrap);
          const reg = new RegExp(searchInput.value, 'i');
          // 匹配子菜单
          routerWrapDeepClone.routes = routeWrap.routes.filter((route: any) => reg.test(route.title));
          return routerWrapDeepClone;
        });
        return rc_filter.filter((item: any) => item.routes.length);
      })
    })

    watch(() => isCurCollapse.value, () => {
      emit('isCurCollapseChange', isCurCollapse.value)
    })

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
    const searchTog = () => {
      isCurCollapse.value = true;
    }
    const routeGo = (route: any) => {
      if (route === routeParams.currentRoute) return;
      globalFunc.openView(route);
    }
    const ubfold = (key: any) => {
      if (!isCurCollapse.value) {
        isCurCollapse.value = true;
        setTimeout(() => {
          menuRef.value.open(key);
        }, 1000);
      }
    }
    return {
      isCurCollapse,
      searchInput,
      menuRef,
      routeParams,
      isShowSoIcon,
      handleInput,
      cleanInput,
      searchTog,
      routeGo,
      ubfold,
    }
  }
});
</script>

<style lang="scss">
.navbar-side {
  flex: 0 0 auto;
  background-color: #2d2f33;
  overflow-x: hidden;
  overflow-y: auto;

  .collapse-wrap {
    text-align: center;
    margin-top: 15px;
  }
  .logo {
    display: inline-block;
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: 4px;
    margin-top: -4px;
  }
  .logo_ind {
    display: block;
    margin: 8px auto 0;
    width: 24px;
    height: 24px;
  }
}

.el-sub-menu__title {
  background-color: #2d2f33 !important;
  color: #ffffff !important;
}

.navbar-side .el-menu>.el-sub-menu>.el-sub-menu__title:hover {
  color: #eb9e05 !important;
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-sub-menu__title,
.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu,
.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item {
  background-color: #5a5e66 !important;
}

.navbar-side .el-menu>.el-sub-menu>.el-menu>.el-menu-item {
  padding: 0 50px !important;
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item:hover {
  color: #eb9e05 !important;
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item.is-active::after {
  content: '';
  display: block;
  position: absolute;
  width: 0px;
  height: 0px;
  border-right: 8px solid #fff;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  right: 0;
  top: 18px;
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

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}

.navbar-side .el-menu {
  border-right: none;
}

.navbar-side::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.navbar-side::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #5a5e66;
}

.navbar-side::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
