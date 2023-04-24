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
          <el-link class="screenfull" :underline="false" @click="refresh">
            <el-icon color="#efefef" :size="20">
              <Refresh />
            </el-icon>
          </el-link>
        </el-tooltip>
        <el-tooltip effect="dark" content="主题" placement="bottom">
          <el-link class="screenfull" :underline="false" @click="handleTheme">
            <el-icon color="#efefef" :size="20">
              <SkinOutlined />
            </el-icon>
          </el-link>
        </el-tooltip>
        <el-link class="screenfull" :underline="false">
          <Message id="message" />
        </el-link>
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <el-link class="screenfull" :underline="false" @click="screenfullTog">
            <el-icon color="#efefef" :size="20">
              <fullscreen-outlined v-if="!isFullscreen" />
              <fullscreen-exit-outlined v-else />
            </el-icon>
          </el-link>
        </el-tooltip>
        <div id="he-plugin-simple"></div>
        <el-dropdown class="head" trigger="click" @command="handleCommand">
          <el-avatar class="avatar" icon="el-icon-user-solid" :size="30"
            src="/src/assets/imgs/avatar.gif" fit="fill"
            v-loading.fullscreen.lock="fullscreenLoading"></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="center">
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
      <themeDialog
        :drawerVisible="isShowTheme"
        @drawerCloseCb="drawerCloseCb">
      </themeDialog>
    </nav>
  </header>
</template>

<script setup lang="ts" name="MainHeader">
import { inject, onMounted, ref } from 'vue'
import screenfull from 'screenfull'
import { useRouter } from 'vue-router'
import { globalStore } from '@/store'
import { client } from '@/utils/https/client';
import * as API from '@/config/api';
import { ElMessage, ElMessageBox } from 'element-plus'
import Message from '../headerMessage/index.vue'
import themeDialog from './components/themeDialog.vue'

// 加载和风天气
onMounted(() => {
  (window as any).WIDGET = {
    'CONFIG': {
      'modules': '2014',
      'background': '5',
      'tmpColor': '409eff',
      'tmpSize': '15',
      'cityColor': '409eff',
      'citySize': '15',
      'aqiColor': '409eff',
      'aqiSize': '15',
      'weatherIconSize': '24',
      'alertIconSize': '16',
      'padding': '10px 10px 5px 10px',
      'shadow': '0',
      'language': 'auto',
      'fixed': 'false',
      'vertical': 'top',
      'horizontal': 'left',
      'key': '12e37ffc392d47e48ce3d066029270bb'
    }
  }
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0'
  document.getElementsByTagName('head')[0].appendChild(script)
})

const router = useRouter()
const myStore: any = globalStore()
const globalRouter: any = inject('globalRouter')
const fullscreenLoading = ref(false)
const isFullscreen = ref(false)
const isShowTheme = ref(false)

const refresh = () => {
  globalRouter.refreshView()
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
      fullscreenLoading.value = true
      client.post(API.loginOut)
      .then(async () => {
        // 1.清除store、token存储
        myStore.logout()
        // 2.重定向登录页
        await router.replace('/login');
        // 3. 提示
        ElMessage.success("退出登录成功！");
        // 4.刷新页面清除一些浏览器缓存问题，不合理页面会刷新两次！！！！ 寻找好办法
        window.location.reload();
      }).catch(() => {
      }).finally(() => {
        fullscreenLoading.value = false
      });
    }).catch(() => {
    })
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
  z-index: 2003;
}

header .navbar-top {
  height: 100%;
  display: flex;
  flex-direction: row;
}

header .navbar-top .tabs-wrap {
  flex: 1 1 auto;
  width: calc(100% - 345px);
}

header .navbar-top .user-info {
  flex: 0 0 auto;
  width: 345px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

header .navbar-top .user-info .screenfull {
  margin: 0 0 0 15px;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

header .navbar-top .user-info .head {
  margin-right: 8px;
  .avatar {
    cursor: pointer;
    background-color: transparent;
  }
}
</style>
