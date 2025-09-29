<template>
  <el-drawer
    :title="$t('theme.title')"
    size="520"
    :modelValue="drawerVisible"
    :append-to-body="true"
    :before-close="cancel">
    <el-scrollbar style="padding-right: 15px;">
      <!-- 布局风格 -->
      <el-divider class="divider" content-position="center">
        <el-icon><Notification /></el-icon>
        <el-text truncated>{{ $t("theme.layoutStyle") }}</el-text>
      </el-divider>
      <div class="layout-box">
        <template v-for="item in layouts">
          <el-tooltip effect="dark" :content="item.value === 'classic' ? $t('theme.classicLayout') : item.value === 'transverse' ? $t('theme.transverseLayout') : $t('theme.mixLayout')" placement="top" :show-after="200">
            <div :class="['layout-item', `${item.class}`, { 'is-active': themeConfig.layoutType === item.value }]" @click="setLayout(item.value)">
              <div class="layout-dark"></div>
              <div class="layout-container" v-show="item.value !== 'transverse'">
                <div class="layout-light"></div>
                <div class="layout-content"></div>
              </div>
              <div class="layout-content" v-show="item.value === 'transverse'"></div>
              <el-icon v-if="themeConfig.layoutType == item.value">
                <CircleCheckFilled />
              </el-icon>
            </div>
          </el-tooltip>
        </template>
      </div>
      <!-- 全局主题 -->
      <el-divider class="divider" content-position="center">
        <el-icon><ColdDrink /></el-icon>
        <el-text truncated>{{ $t("theme.globalTheme") }}</el-text>
      </el-divider>
      <div class="theme-item">
        <span>{{ $t("theme.themeColor") }}</span>
        <el-color-picker v-model="themeConfig.primary" :predefine="colorList" @change="changePrimary" />
      </div>
      <div class="colors">
        <div class="color-item" v-for="color in colorsData" :style="{'border': themeConfig.primary === color ? `2px solid ${themeConfig.primary}` : '1px solid #e7e5e4'}" @click="changeColors(color)">
          <div class="color-subitem" :class="{'active-color-subitem': themeConfig.primary === color}" :style="{'background-color': color}"></div>
        </div>
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.lightMode") }}</span>
        <el-switch v-model="themeConfig.isLight" @change="changeSystemMode(themeConfig.isLight, 'light')">
          <template #active-action>
            <svg-icon name="light" :iconStyle="{ width: '12px', height: '12px'}" />
          </template>
          <template #inactive-action>
            <svg-icon name="light" :iconStyle="{ width: '12px', height: '12px'}" />
          </template>
        </el-switch>
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.darkMode") }}</span>
        <el-switch v-model="themeConfig.isDark" @change="changeSystemMode(themeConfig.isDark, 'dark')">
          <template #active-action>
            <svg-icon name="dark" :iconStyle="{ width: '12px', height: '12px'}" />
          </template>
          <template #inactive-action>
            <svg-icon name="dark" :iconStyle="{ width: '12px', height: '12px'}" />
          </template>
        </el-switch>
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.autoMode") }}</span>
        <el-switch v-model="themeConfig.isWindowMode" @change="changeSystemMode(themeConfig.isWindowMode, 'auto')">
          <template #active-action>
            <svg-icon name="win" :iconStyle="{ width: '12px', height: '12px'}" />
          </template>
          <template #inactive-action>
            <svg-icon name="win" :iconStyle="{ width: '12px', height: '12px'}" />
          </template>
        </el-switch>
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.greyMode") }}</span>
        <el-switch v-model="themeConfig.isGrey" @change="changeGreyOrWeak('grey', !!$event)">
          <template #active-action>
            <svg-icon name="candle" :iconStyle="{ width: '14px', height: '14px'}" />
          </template>
          <template #inactive-action>
            <svg-icon name="candle" :iconStyle="{ width: '14px', height: '14px'}" />
          </template>
        </el-switch>
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.weakMode") }}</span>
        <el-switch v-model="themeConfig.isWeak" @change="changeGreyOrWeak('weak', !!$event)">
          <template #active-action>
            <el-icon><View /></el-icon>
          </template>
          <template #inactive-action>
            <el-icon><View /></el-icon>
          </template>
        </el-switch>
      </div>
      <!-- 界面设置 -->
      <el-divider class="divider" content-position="center">
        <el-icon><DesktopOutlined /></el-icon>
        <el-text truncated>{{ $t("theme.pageSetting") }}</el-text>
      </el-divider>
      <div class="theme-item">
        <span>{{ $t("theme.sidebarLight") }}</span>
        <el-switch v-model="themeConfig.sidebarLight" @change="changeSidebarLight">
          <template #active-action>
            <el-icon><Sunny /></el-icon>
          </template>
          <template #inactive-action>
            <el-icon><Moon /></el-icon>
          </template>
        </el-switch>
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.collapseMenu") }}</span>
        <el-switch v-model="themeConfig.isCollapse" inline-prompt :active-icon="Check" :inactive-icon="Close" @change="changeCollapse" />
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.accordion") }}</span>
        <el-switch v-model="themeConfig.accordion" inline-prompt :active-icon="Check" :inactive-icon="Close" @change="changeAccordion" />
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.breadcrumb") }}</span>
        <el-switch v-model="themeConfig.isBreadcrumb" inline-prompt :active-icon="Check" :inactive-icon="Close" @change="changeBreadcrumb" />
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.pageTransition") }}</span>
        <el-select v-model="themeConfig.transitionAnimation" placeholder="请选择" class="fade-select" @change="changeTransition">
          <el-option v-for="item in transitionAnimationList" :key="item.value" :label="themeConfig.language === 'en' ? item.enLabel : item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.configProvider") }}</span>
        <div>
          <el-checkbox v-model="themeConfig.assemblySize" :label="$t('global.default')" value="default" true-value="default" :disabled="themeConfig.assemblySize === 'default'" />
          <el-checkbox v-model="themeConfig.assemblySize" :label="$t('global.small')" value="small" true-value="small" :disabled="themeConfig.assemblySize === 'small'" />
          <el-checkbox v-model="themeConfig.assemblySize" :label="$t('global.large')" value="large" true-value="large" :disabled="themeConfig.assemblySize === 'large'" />
        </div>
      </div>
      <!-- 系统设置 -->
      <el-divider class="divider" content-position="center">
        <el-icon><Setting /></el-icon>
        <el-text truncated>{{ $t("theme.systemSetting") }}</el-text>
      </el-divider>
      <div class="theme-item">
        <span>{{ $t("theme.lockScreen") }}</span>
        <el-switch v-model="themeConfig.isLockScreen" inline-prompt :active-icon="Lock" :inactive-icon="Unlock" @change="changeLockScreen" />
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.openGuidePage") }}</span>
        <el-switch v-model="themeConfig.isOpenGuide" inline-prompt :active-icon="Lock" :inactive-icon="Unlock" @change="changeGuide" />
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.openWatermark") }}</span>
        <el-switch v-model="themeConfig.isWatermark" inline-prompt :active-icon="Lock" :inactive-icon="Unlock" @change="setWatermark" />
      </div>
      <div class="theme-item">
        <span>{{ $t("theme.preventDebug") }}</span>
        <el-switch v-model="themeConfig.preventDebug" inline-prompt :active-icon="Lock" :inactive-icon="Unlock" @change="setPreventDebug" />
      </div>
    </el-scrollbar>
    <!-- 锁定屏幕 -->
    <lockScreenDialog ref="lockScreenRef" />
  </el-drawer>
</template>

<script setup lang="ts" name="ThemeConfigPage">
import { ref, computed, watch } from "vue"
import { Check, Close, Lock, Unlock, Sunny, Moon } from "@element-plus/icons-vue"
import { useTheme } from "@/hooks/useTheme"
import { useGlobalStore } from '@/store'
import { DebugControl } from "@/hooks/usePreventDebug"
import lockScreenDialog from "@/components/mainHeader/components/lockScreenDialog.vue";

const props = defineProps(['drawerVisible'])
const emit = defineEmits(['drawerCloseCb'])

const transitionAnimationList: any = ref([
  {
    label: '无过渡',
    enLabel: 'No Transition',
    value: ''
  },
  {
    label: '侧边淡出',
    enLabel: 'Fade Side',
    value: 'fade-side'
  },
  {
    label: '底边淡出',
    enLabel: 'Fade Bottom',
    value: 'fade-bottom'
  },
  {
    label: '收缩淡出',
    enLabel: 'Fade Scale',
    value: 'fade-scale'
  },
  {
    label: '扩大淡出',
    enLabel: 'Zoom Fade',
    value: 'zoom-fade'
  },
  {
    label: '收缩',
    enLabel: 'Zoom Out',
    value: 'zoom-out'
  },
  {
    label: '柔和',
    enLabel: 'Fade',
    value: 'fade'
  },
  {
    label: '卡片',
    enLabel: 'CardInOut',
    value: 'cardInOut'
  },
  {
    label: '渐退',
    enLabel: 'FadeOut',
    value: 'fadeOut'
  }
])
const layouts: any = ref({
  classicLayout: {
    value: "classic",
    class: "layout-classic"
  },
  transverseLayout: {
    value: "transverse",
    class: "layout-transverse"
  },
  mixLayout: {
    value: "mix",
    class: "layout-mix"
  }
});
const myStore: any = useGlobalStore();
const themeConfig = computed(() => myStore.themeConfig);
const lockScreenRef = ref();
// 预定义主题颜色
const colorList: any = ref([
	"#409EFF",
	"#DAA96E",
	"#0C819F",
	"#27ae60",
	"#ff5c93",
	"#e74c3c",
	"#fd726d",
	"#f39c12",
	"#9b59b6"
]);
const colorsData: any = ref(['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399', '#303133', '#009688']);

const { changePrimary, changeGreyOrWeak, switchDark } = useTheme();

const setLayout = (layout: any) => {
  myStore.setThemeConfig({ ...themeConfig.value, layoutType: layout })
}
const changeColors = (color: any) => {
  myStore.setThemeConfig({ ...themeConfig.value, primary: color })
  changePrimary(color)
}

const changeSystemMode = (val: any, mode: any, menuLight: any = false) => {
  const obj: any = {
    ...themeConfig.value,
    isLight: ((mode === 'light' && val) || (!themeConfig.value.isDark && !themeConfig.value.isWindowMode)) ? true : false,
    isDark: mode === 'dark' && val ? true : false,
    isWindowMode: mode === 'auto' && val ? true : false,
  }
  if ((mode === 'dark' && val) || (mode === 'auto') && val && window.matchMedia('(prefers-color-scheme: dark)')?.matches) { // 黑色系列则将侧边栏浅色模式关闭
    obj.sidebarLight = false
  }
  if (menuLight) {
    obj.sidebarLight = true
  }
  myStore.setThemeConfig(obj)
  switchDark()
}

const changeSidebarLight = (val: any) => {
  if (val) { // 开启侧边栏浅色模式则将暗黑系列关闭
    changeSystemMode(val, 'light', true)
  } else {
    myStore.setThemeConfig({ ...themeConfig.value, sidebarLight: val })
  }
}

const changeCollapse = (val: any) => {
  myStore.setThemeConfig({ ...themeConfig.value, isCollapse: val })
}

const changeAccordion = (val: any) => {
  myStore.setThemeConfig({ ...themeConfig.value, accordion: val })
}

const changeBreadcrumb = (val: any) => {
  myStore.setThemeConfig({ ...themeConfig.value, isBreadcrumb: val })
}

const changeTransition = (val: any) => {
  myStore.setThemeConfig({ ...themeConfig.value, transitionAnimation: val })
}

const changeLockScreen = (val: any) => {
  lockScreenRef.value.acceptParams();
}

const changeGuide = (val: any) => {
  myStore.setThemeConfig({ ...themeConfig.value, isOpenGuide: val })
}

const setWatermark = (val: any) => {
  myStore.setThemeConfig({ ...themeConfig.value, isWatermark: val })
}

const setPreventDebug = (val: any) => {
  myStore.setThemeConfig({ ...themeConfig.value, preventDebug: val })
}

// 监听debug开关;
const debugControl = new DebugControl();
watch(() => themeConfig.value.preventDebug, (newVal: any) => {
  if (newVal) {
    debugControl.start();
  } else {
    debugControl.stop();
  }
}, { immediate: true });

const cancel = () => {
  emit('drawerCloseCb')
}
</script>

<style lang="scss" scoped>
.divider {
  :deep(.el-divider__text) {
    display: flex;
    align-items: center;
  }
	.el-icon {
		position: relative;
		top: 0px;
		right: 6px;
		font-size: 15px;
	}
}
.theme-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 14px 0;
	span {
		font-size: 14px;
	}
  .fade-select {
    width: 30%;
  }
}
.colors {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
  .color-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 47px;
    height: 47px;
    border: 1px solid #e7e5e4;
    border-radius: 6px;
    cursor: pointer;
    .color-subitem {
      width: 18px;
      height: 30px;
      border-radius: 50%;
      transition: transform 0.3s ease-in-out;
      transform: rotate(45deg);
    }
    .active-color-subitem {
      transition: transform 0.3s ease-in-out;
      transform: rotate(90deg);
    }
  }
  .color-item:hover {
    animation: border_hover 2.5s linear infinite;
  }
}
@keyframes border_hover {
  0% {
    border-color: #e7e5e4;
  }
  50% {
    border-color: #d48815;
    box-shadow: inset 0 0 12px rgba(26, 73, 34, 0.5);
  }
  100% {
    border-color: #e7e5e4;
  }
}
.layout-box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 7px 0;
  .layout-item {
    position: relative;
    box-sizing: border-box;
    width: 100px;
    height: 70px;
    padding: 6px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px var(--el-border-color-dark);
    transition: all 0.2s;
    .layout-dark {
      background-color: var(--el-color-primary);
      border-radius: 3px;
    }
    .layout-light {
      background-color: var(--el-color-primary-light-5);
      border-radius: 3px;
    }
    .layout-content {
      background-color: var(--el-color-primary-light-8);
      border: 1px dashed var(--el-color-primary);
      border-radius: 3px;
    }
    .el-icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: var(--el-color-primary);
      transition: all 0.2s;
    }
    &:hover {
      box-shadow: 0 0 5px 1px var(--el-text-color-secondary);
    }
  }
  .is-active {
    box-shadow: 0 0 0 2px var(--el-color-primary) !important;
  }
  .layout-classic {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .layout-dark {
      width: 20%;
    }
    .layout-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 74%;
      .layout-light {
        height: 20%;
      }
      .layout-content {
        height: 68%;
      }
    }
  }
  .layout-transverse {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 15px;
    .layout-dark {
      height: 20%;
    }
    .layout-content {
      height: 68%;
    }
  }
  .layout-mix {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .layout-dark {
      width: 20%;
      background-color: var(--el-color-primary-light-5);
    }
    .layout-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 74%;
      .layout-light {
        height: 20%;
        background-color: var(--el-color-primary);
      }
      .layout-content {
        height: 68%;
      }
    }
  }
}
</style>