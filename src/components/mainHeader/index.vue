<template>
  <header>
    <nav class="navbar-top">
      <div class="tabs-wrap">
        <el-tooltip effect="dark" content="支持右键操作" placement="bottom" >
          <slot name="tabs"></slot>
        </el-tooltip>
      </div>
      <div class="user-info">
        <el-tooltip effect="dark" content="刷新" placement="bottom">
          <el-link id="Refreshs" class="icon-style" :underline="false" @click="refresh">
            <el-icon color="#efefef" :size="20">
              <Refresh />
            </el-icon>
          </el-link>
        </el-tooltip>
        <el-tooltip effect="dark" content="菜单搜索" placement="bottom">
          <el-link id="SearchMenus" class="icon-style" :underline="false" @click="searchMenus">
            <el-icon color="#efefef" :size="20">
              <Search />
            </el-icon>
          </el-link>
        </el-tooltip>
        <el-tooltip effect="dark" content="主题" placement="bottom">
          <el-link id="Theme" class="icon-style" :underline="false" @click="handleTheme">
            <el-icon color="#efefef" :size="20">
              <SkinOutlined />
            </el-icon>
          </el-link>
        </el-tooltip>
        <el-tooltip effect="dark" content="消息" placement="bottom">
          <el-link id="Message" class="icon-style" :underline="false">
            <Message id="message" />
          </el-link>
        </el-tooltip>
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <el-link id="Full" class="icon-style" :underline="false" @click="screenfullTog">
            <el-icon color="#efefef" :size="20">
              <fullscreen-outlined v-if="!isFullscreen" />
              <fullscreen-exit-outlined v-else />
            </el-icon>
          </el-link>
        </el-tooltip>
        <div class="weather">
          <iframe width="275" scrolling="no" height="24" frameborder="0" allowtransparency="true" src="https://i.tianqi.com?c=code&id=34&color=%23FFFFFF&icon=1&py=taiyuan&site=12"></iframe>
        </div>
        <el-dropdown class="head" trigger="click" @command="handleCommand">
          <div class="drop-box">
            <span class="username">{{ userName }}</span>
            <el-avatar class="avatar" icon="el-icon-user-solid" :size="30"
              src="/src/assets/imgs/avatar.gif" fit="fill"></el-avatar>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="lockScreen">
                <el-icon><Lock /></el-icon>锁定屏幕
              </el-dropdown-item>
              <el-dropdown-item command="center" divided>
                <el-icon><User /></el-icon>个人中心
              </el-dropdown-item>
              <el-dropdown-item command="setCore">
                <el-icon><Setting /></el-icon>设置中心
              </el-dropdown-item>
              <el-dropdown-item command="logout" divided>
                <el-icon><SwitchButton /></el-icon>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!-- 主题配置 -->
      <searchMenu ref="searchMenuRef" />
      <!-- 主题配置 -->
      <themeDialog
        :drawerVisible="isShowTheme"
        @drawerCloseCb="drawerCloseCb">
      </themeDialog>
      <!-- 锁定屏幕 -->
      <lockScreenDialog ref="lockScreenRef" />
    </nav>
  </header>
</template>

<script setup lang="ts" name="MainHeader">
import { inject, ref, computed } from 'vue';
import screenfull from 'screenfull';
import { useRouter } from 'vue-router';
import { globalStore } from '@/store';
import { client } from '@/utils/https/client';
import * as API from '@/config/api';
import { ElMessage, ElMessageBox } from 'element-plus';
import Message from '../headerMessage/index.vue';
import searchMenu from './components/searchMenuDialog.vue';
import themeDialog from './components/themeDialog.vue';
import lockScreenDialog from "./components/lockScreenDialog.vue";

const router = useRouter()
const myStore: any = globalStore()
const userName: any = computed(() => myStore.userInfo.userInfo ? myStore.userInfo.userInfo.userName : '')
const globalRouter: any = inject('globalRouter')
const isFullscreen = ref(false)
const searchMenuRef = ref()
const isShowTheme = ref(false)
const lockScreenRef = ref()

const refresh = () => {
  globalRouter.refreshView()
}
const searchMenus = () => {
  searchMenuRef.value?.handleOpen()
}
const handleTheme = () => {
  isShowTheme.value = true
}
const drawerCloseCb = () => {
  isShowTheme.value = false
}
const screenfullTog = async () => {
  if (screenfull.isEnabled) {
    await screenfull.toggle();
    isFullscreen.value = screenfull.isFullscreen
  } else {
    ElMessage({
      showClose: true,
      type: 'warning',
      message: '浏览器不能全屏',
    })
  }
}
const handleCommand = (command: any) => {
  // 退出登录
  if (command === 'logout') {
    ElMessageBox.confirm(
      '您是否确认退出登录?',
      '温馨提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
      client.post(API.loginOut)
      .then(async () => {
        // 1.清除store、token存储
        myStore.logout()
        // 2.重定向登录页
        await router.replace('/login');
        // 3. 提示
        ElMessage.success("退出登录成功！");
      }).catch(() => {
      }).finally(() => {
      });
    }).catch(() => {
    })
  }
  // 锁定屏幕
  if (command === 'lockScreen') {
    lockScreenRef.value.acceptParams();
  }
  // 个人中心
  if (command === 'center') {

  }
  // 设置中心
  if (command === 'setCore') {

  }
}
</script>

<style scoped lang="scss">
header {
  flex: 0 0 auto;
  background-color: var(--main-bg-color);
  z-index: 2000;
}

header .navbar-top {
  height: 100%;
  display: flex;
  flex-direction: row;
}

$tab-r-width: 545px;

header .navbar-top .tabs-wrap {
  flex: 1 1 auto;
  width: calc(100% - $tab-r-width);
}

header .navbar-top .user-info {
  flex: 0 0 auto;
  width: $tab-r-width;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

header .navbar-top .user-info .icon-style {
  margin: 0 0 0 15px;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

header .navbar-top .user-info .head {
  margin-right: 8px;
  .drop-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    .username {
      font-size: 15px;
      margin-right: 15px;
      color: var(--color-white);
    }
    .avatar {
      background-color: transparent;
    }
  }
}
.weather {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 10px;
}
</style>
