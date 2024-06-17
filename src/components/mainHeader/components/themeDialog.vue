<template>
  <el-drawer
    title="主题配置"
    size="20%"
    :modelValue="drawerVisible"
    :append-to-body="true"
    :before-close="cancel">
    <el-scrollbar>
      <!-- 全局主题 -->
      <el-divider class="divider" content-position="center">
        <el-icon><ColdDrink /></el-icon>
        <el-text truncated>全局主题</el-text>
      </el-divider>
      <div class="theme-item">
        <span>主题颜色</span>
        <el-color-picker v-model="themeConfig.primary" :predefine="colorList" @change="changePrimary" />
      </div>
      <div class="theme-item">
        <span>暗黑模式</span>
        <SwitchDark />
      </div>
      <div class="theme-item">
        <span>灰色模式</span>
        <el-switch v-model="themeConfig.isGrey" @change="changeGreyOrWeak('grey', !!$event)" />
      </div>
      <div class="theme-item">
        <span>色弱模式</span>
        <el-switch v-model="themeConfig.isWeak" @change="changeGreyOrWeak('weak', !!$event)" />
      </div>
      <!-- 界面设置 -->
      <el-divider class="divider" content-position="center">
        <el-icon><DesktopOutlined /></el-icon>
        <el-text truncated>界面设置</el-text>
      </el-divider>
      <div class="theme-item">
        <span>折叠菜单</span>
        <el-switch v-model="themeConfig.isCollapse" inline-prompt :active-icon="Check" :inactive-icon="Close" @change="changeCollapse" />
      </div>
      <div class="theme-item">
        <span>页面转场动画</span>
        <el-select v-model="themeConfig.transitionAnimation" placeholder="请选择" class="fade-select" @change="changeTransition">
          <el-option v-for="item in transitionAnimationList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <!-- 系统设置 -->
      <el-divider class="divider" content-position="center">
        <el-icon><Setting /></el-icon>
        <el-text truncated>系统设置</el-text>
      </el-divider>
      <div class="theme-item">
        <span>锁定屏幕</span>
        <el-switch v-model="themeConfig.isLockScreen" inline-prompt :active-icon="Lock" :inactive-icon="Unlock" @change="changeLockScreen" />
      </div>
      <div class="theme-item">
        <span>是否开启引导页</span>
        <el-switch v-model="themeConfig.isOpenGuide" inline-prompt :active-icon="Lock" :inactive-icon="Unlock" @change="changeGuide" />
      </div>
    </el-scrollbar>
    <!-- 锁定屏幕 -->
    <lockScreenDialog ref="lockScreenRef" />
  </el-drawer>
</template>

<script setup lang="ts" name="ThemeConfigPage">
import { ref, computed } from "vue"
import { Check, Close, Lock, Unlock } from "@element-plus/icons-vue"
import { useTheme } from "@/hooks/useTheme"
import { useGlobalStore } from '@/store'
import SwitchDark from "@/components/ThemeDark/index.vue"
import lockScreenDialog from "@/components/mainHeader/components/lockScreenDialog.vue";

const props = defineProps(['drawerVisible'])
const emit = defineEmits(['drawerCloseCb'])

const transitionAnimationList: any = ref([
  {
    label: '无过渡',
    value: ''
  },
  {
    label: '侧边淡出',
    value: 'fade-side'
  },
  {
    label: '底边淡出',
    value: 'fade-bottom'
  },
  {
    label: '收缩淡出',
    value: 'fade-scale'
  },
  {
    label: '扩大淡出',
    value: 'zoom-fade'
  },
  {
    label: '收缩',
    value: 'zoom-out'
  },
  {
    label: '柔和',
    value: 'fade'
  }
])
const myStore: any = useGlobalStore()
const themeConfig = computed(() => myStore.themeConfig)
const lockScreenRef = ref();

const { changePrimary, changeGreyOrWeak } = useTheme()

const changeCollapse = (val: any) => {
  myStore.setThemeConfig({ ...themeConfig.value, isCollapse: val })
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

// 预定义主题颜色
const colorList = [
	"#409EFF",
	"#DAA96E",
	"#0C819F",
	"#409EFF",
	"#27ae60",
	"#ff5c93",
	"#e74c3c",
	"#fd726d",
	"#f39c12",
	"#9b59b6"
];

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
    width: 50%;
  }
}
</style>