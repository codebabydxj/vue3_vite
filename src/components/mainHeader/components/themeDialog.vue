<template>
  <el-drawer
    title="主题配置"
    size="300px"
    :modelValue="drawerVisible"
    :append-to-body="true"
    :before-close="cancel">
    <!-- 全局主题 -->
    <el-divider class="divider" content-position="center">
      <el-icon>
        <ColdDrink />
      </el-icon>
      全局主题
    </el-divider>
    <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker v-model="themeConfig.primary" :predefine="colorList" @change="changePrimary" />
    </div>
    <div class="theme-item">
      <span>暗黑模式</span>
      <SwitchDark></SwitchDark>
    </div>
    <div class="theme-item">
      <span>灰色模式</span>
      <el-switch v-model="themeConfig.isGrey" @change="changeGreyOrWeak($event, 'grey')" />
    </div>
    <div class="theme-item">
      <span>色弱模式</span>
      <el-switch v-model="themeConfig.isWeak" @change="changeGreyOrWeak($event, 'weak')" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useTheme } from "@/hooks/useTheme"
import { globalStore } from '@/store'
import SwitchDark from "@/components/ThemeDark/index.vue"

const props = defineProps(['drawerVisible'])
const emit = defineEmits(['drawerCloseCb'])

const myStore: any = globalStore()
const themeConfig = computed(() => myStore.themeConfig);

const { changePrimary, changeGreyOrWeak } = useTheme();

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
	margin-top: 15px;
	.el-icon {
		position: relative;
		top: 2px;
		right: 5px;
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
}
</style>