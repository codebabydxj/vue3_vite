<template>
  <header :class="{ 'header-light': themeConfig.sidebarLight }">
    <nav class="navbar-top">
      <div class="tabs-wrap" :class="{ 'tabs-wrap-light': themeConfig.sidebarLight }" v-if="showTabs">
        <el-tooltip effect="dark" :content="$t('header.rightClick')" placement="bottom">
          <slot name="tabs"></slot>
        </el-tooltip>
      </div>
      <div class="user-info" v-if="showConfig">
        <el-tooltip effect="dark" :content="$t('header.language')" placement="bottom">
          <el-link id="Lang" class="icon-style" :underline="'never'" @click="changeLang">
            <Languages id="languages" />
          </el-link>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('header.refresh')" placement="bottom">
          <el-link id="Refreshs" class="icon-style" :underline="'never'" @click="refresh">
            <el-icon :color="themeConfig.sidebarLight ? 'var(--color-icon-light)' : 'var(--color-icon-dark)'" :size="22">
              <Refresh />
            </el-icon>
          </el-link>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('header.menuSearch')" placement="bottom">
          <el-link id="SearchMenus" class="icon-style" :underline="'never'" @click="searchMenus">
            <el-icon :color="themeConfig.sidebarLight ? 'var(--color-icon-light)' : 'var(--color-icon-dark)'" :size="22">
              <Search />
            </el-icon>
          </el-link>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('header.theme')" placement="bottom">
          <el-link id="Theme" class="icon-style" :underline="'never'" @click="handleTheme">
            <el-icon :color="themeConfig.sidebarLight ? 'var(--color-icon-light)' : 'var(--color-icon-dark)'" :size="22">
              <SkinOutlined />
            </el-icon>
          </el-link>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('header.message')" placement="bottom">
          <el-link id="Message" class="icon-style" :underline="'never'">
            <Message id="message" />
          </el-link>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('header.fullScreen')" placement="bottom">
          <el-link id="Full" class="icon-style" :underline="'never'" @click="screenfullTog">
            <el-icon :color="themeConfig.sidebarLight ? 'var(--color-icon-light)' : 'var(--color-icon-dark)'" :size="22">
              <ExpandOutlined v-if="!isFullscreen" />
              <fullscreen-exit-outlined v-else />
            </el-icon>
          </el-link>
        </el-tooltip>
        <el-row>
          <el-scrollbar >
            <div class="weather">
              <iframe
                scrolling="no"
                frameborder="0"
                allowtransparency="true"
                :src="weatherSrc"
                style="height: 28px;">
              </iframe>
            </div>
          </el-scrollbar>
        </el-row>
        <el-dropdown class="head" trigger="click" @command="handleCommand">
          <div class="drop-box">
            <el-tooltip effect="customized" :content="`当前登录用户：${userName}`" placement="bottom">
              <el-text :truncated="true" class="username">{{ userName }}</el-text>
            </el-tooltip>
            <el-avatar class="avatar" icon="el-icon-user-solid" :size="35"
              src="/src/assets/imgs/avatar.png" fit="fill"></el-avatar>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="lockScreen">
                <el-icon><Lock /></el-icon>{{ $t("person.lockScreen") }}
              </el-dropdown-item>
              <el-dropdown-item command="cache" divided>
                <el-icon><Refresh /></el-icon>{{ $t("person.clearCache") }}
              </el-dropdown-item>
              <el-dropdown-item command="setCore">
                <el-icon><Setting /></el-icon>{{ $t("person.setting") }}
              </el-dropdown-item>
              <el-dropdown-item command="logout" divided>
                <el-icon><SwitchButton /></el-icon>{{ $t("person.logout") }}
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
import { inject, ref, computed, onMounted } from 'vue';
import screenfull from 'screenfull';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/store';
import { client } from "@/utils/https/client";
import { loginOut } from '@/config/api';
import { LOGIN_URL } from "@/config";
import { ElMessage, ElMessageBox } from 'element-plus';
import Message from '../headerMessage/index.vue';
import Languages from '../Languages/index.vue';
import searchMenu from './components/searchMenuDialog.vue';
import themeDialog from './components/themeDialog.vue';
import lockScreenDialog from "./components/lockScreenDialog.vue";

const props = defineProps({
  showTabs: {
    type: Boolean,
    default: true
  },
  showConfig: {
    type: Boolean,
    default: true
  },
  showBorder: {
    type: Boolean,
    default: true
  }
})
const router = useRouter()
const myStore: any = useGlobalStore()
const themeConfig = computed(() => myStore.themeConfig)
const userName: any = computed(() => myStore.userInfo.userInfo ? myStore.userInfo.userInfo.userName : '')
const Router: any = inject('Router')
const isFullscreen = ref(false)
const searchMenuRef = ref()
const isShowTheme = ref(false)
const lockScreenRef = ref()
const weatherSrc: any = computed(() => {
  let src: any = "https://i.tianqi.com?c=code&id=34&color=%23FFFFFF&icon=1&py=taiyuan&site=14&bgc=%23191a20";
  if (themeConfig.value.sidebarLight) {
    src = "https://i.tianqi.com?c=code&id=34&color=%234E5969&icon=1&py=taiyuan&site=14&bgc=%23ffffff";
  }
  return src;
})
const bottomBorder: any = computed(() => props.showBorder ? '1px solid var(--color-light-border)' : 'none');
const minWidth: any = computed(() => "405px");
const maxWidth: any = computed(() => "552px");
const tabsWarpMinWidth: any = computed(() => props.showConfig ? `calc(100% - ${minWidth.value})` : '100%')
const tabsWarpMaxWidth: any = computed(() => props.showConfig ? `calc(100% - ${maxWidth.value})` : '100%')

onMounted(() => {
  // 监听 screenfull 属性的变化来改变图标
  screenfull.on('change', () => {
    isFullscreen.value = screenfull.isFullscreen;
  })
  // 针对F11全屏无法监听问题
  window.addEventListener('keydown', screenKeyDown, true);
})

const changeLang = () => {

}
const refresh = () => {
  Router.refreshView()
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
const screenKeyDown = (e: any) => {
  // F11按键触发全屏事件
  if (e.keyCode === 122) {
    // 阻止F11默认事件，通过调用 screenfull 的方法来实现全屏和非全屏操作
    e.preventDefault();
    screenfull.toggle();
  }
}
const handleCommand = (command: any) => {
  // 退出登录
  if (command === 'logout') {
    ElMessageBox.confirm(
      '您确定要退出登录吗?',
      '温馨提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
      client.post(loginOut)
      .then(async () => {
        // 1.清除store、token存储
        myStore.logout()
        // 2.重定向登录页
        await router.replace(LOGIN_URL);
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
  // 清除缓存 Ctrl+F5 和 Shift+F5 的效果
  if (command === 'cache') {
    window.location.reload();
    window.location.replace(window.location.href);
  }
  // 信息中心
  if (command === 'setCore') {
    Router.openView('/userinfo');
  }
}
</script>

<style scoped lang="scss">
header {
  flex: 0 0 auto;
  background-color: var(--main-bg-color);
  z-index: 2000;
  height: 48px;
}
.header-light {
  background-color: var(--main-bg-light-color);
  border-bottom: v-bind(bottomBorder);
  box-sizing: border-box;
}

header .navbar-top {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

header .navbar-top .tabs-wrap {
  flex: 1 1 auto;
  min-width: v-bind(tabsWarpMaxWidth);
  max-width: v-bind(tabsWarpMinWidth);
}

header .navbar-top .user-info {
  flex: 0 0 auto;
  min-width: v-bind(minWidth);
  max-width: v-bind(maxWidth);
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
  margin: 0 8px 0 15px;
  .drop-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    .username {
      max-width: 90px;
      font-size: 15px;
      font-weight: 700;
      margin-right: 15px;
      color: var(--color-dark);
    }
    .avatar {
      background-color: transparent;
      transition: All 0.4s ease-in-out;
    }
    .avatar:hover {
      transform: rotate(360deg);
    }
  }
}
.header-light .navbar-top .user-info .head .drop-box {
  .username {
    color: var(--color-light);
  }
}
.weather {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 15px;
  max-width: 150px;
}
</style>
<style>
.el-popper.is-customized {
  padding: 6px 12px;
  color: var(--el-color-white);
  background: var(--el-color-info);
}
.el-popper.is-customized .el-popper__arrow::before {
  background: var(--el-color-info);
  right: 0;
}
</style>
