<template>
  <nav class="navbar-side">
    <template v-if="!isCurCollapse">
      <img class="logo_ind" src="../assets/svg/v.svg" alt="" />
    </template>
    <div class="collapse" v-if="isCurCollapse">
      <h4 class="user-sel admin-title">
        <img class="logo" src="../assets/svg/v.svg" alt="" />
        Vite-Admin
      </h4>
    </div>
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
    <el-menu ref="menuRef" class="user-sel el-menu-vertical-demo" background-color="#191a20" text-color="#fefefea6"
      active-text-color="#409EFF" :unique-opened="true" :collapse="!isCurCollapse"
      :default-active="routeParams.currentRoute.split('?')[0] === '/' ? '/welcome' : routeParams.currentRoute.split('?')[0]">
      <el-sub-menu v-for="routeWrap in routeParams.routerConfigFilterd" :index="routeWrap.key" :key="routeWrap.key"
        @click.native="ubfold(routeWrap.key)">
        <template #title>
          <el-icon :size="16">
            <component :is="routeWrap.icon" color="#fefefea6"></component>
          </el-icon>
          <span slot="title">{{ routeWrap.title }}</span>
        </template>
        <template v-for="route in routeWrap.routes" :key="route.path.split('?')[0]">
          <el-menu-item :index="route.path" v-if="(!route.meta.hidden || route.meta.hidden !== 1)"
            @click="routeGo(route.path)">
            {{ route.title }}
          </el-menu-item>
        </template>
      </el-sub-menu>
    </el-menu>
    <div class="user-sel yogi" v-if="isCurCollapse"></div>
    <div class="eo" :class="{ 'active': isActive }">
      <el-tooltip placement="right" :visible="visible" effect="light" :content="isCurCollapse ? '点击折叠' : '点击展开'">
        <img src="../assets/svg/enter.svg" alt="" @mouseenter="visible = true" @mouseleave="visible = false"
          @click="handleSwitch">
      </el-tooltip>
    </div>
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
    const isActive: any = ref(false)
    const visible = ref(false)

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
    const handleSwitch = () => {
      isActive.value = !isActive.value
      isCurCollapse.value = !isActive.value
    }
    return {
      isCurCollapse,
      searchInput,
      menuRef,
      routeParams,
      isShowSoIcon,
      isActive,
      visible,
      handleInput,
      cleanInput,
      searchTog,
      routeGo,
      ubfold,
      handleSwitch,
    }
  }
});
</script>

<style lang="scss">
.navbar-side {
  flex: 0 0 auto;
  background-color: #191a20;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;

  .collapse {
    height: 60px;
    // background-color: #1a3642;
    box-shadow: 0 0 6px -2px var(--color-text);
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
  }

  .admin-title {
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    color: var(--color-text);
    height: 60px;
    line-height: 60px;
  }

  .yogi {
    width: 165px;
    height: 110px;
    overflow: hidden;
    position: absolute;
    left: 27.5px;
    bottom: 10px;
    opacity: 0.5;
    background: url(../assets/yogi.png) no-repeat center;
    background-size: 100%;
    transition: all 1s;
  }

  .eo {
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: absolute;
    bottom: 0;
    box-shadow: 0 0 6px -2px var(--color-text);

    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
      vertical-align: middle;
      margin-left: 22px;
      transition: all 1s;
    }
  }

  .active {
    img {
      transform: rotateY(180deg);
    }
  }
}

.navbar-side:hover {
  transition: opacity 1s;

  .yogi {
    opacity: 0.9;
    transform: rotateY(360deg);
  }
}

.el-sub-menu__title {
  color: #fefefea6 !important;
}

.el-sub-menu__title>.el-icon>svg {
  color: #fefefea6 !important;
}

.navbar-side .el-menu>.el-sub-menu:hover {
  transition: color 0.3s;

  .el-sub-menu__title,
  .el-sub-menu__title>.el-icon>svg {
    color: #ffffff !important;
  }
}

.navbar-side .el-menu>.el-sub-menu.is-active {

  .el-sub-menu__title,
  .el-sub-menu__title>.el-icon>svg {
    color: #ffffff !important;
  }
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu {
  background-color: #090a0c !important;
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item.is-active {
  background-color: #1a3642 !important;
}

.navbar-side .el-menu>.el-sub-menu>.el-menu>.el-menu-item {
  padding: 0 50px !important;
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item:hover {
  color: #ffffff !important;
  background-color: #090a0c !important;
}

.navbar-side .el-menu>.el-sub-menu.is-opened>.el-menu>.el-menu-item.is-active:hover {
  color: #409EFF !important;
  background-color: #1a3642 !important;
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
  background: #4e5158;
}

.navbar-side::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  // border-radius: 10px;
  background: #191a20;
}
</style>
