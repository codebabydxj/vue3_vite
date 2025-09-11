<template>
	<el-space>
		<el-tooltip
			v-if="fromToLogin"
			effect="dark"
			content="切换登录风格"
			placement="bottom">
			<el-switch v-model="themeConfig.isReplaceNewLoginPage" @change="switchReplaceLoginPage" inline-prompt :active-icon="CaretLeft" :inactive-icon="CaretRight" />
		</el-tooltip>
		<!-- <el-tooltip
			effect="dark"
			content="切换主题色"
			placement="top">
			<el-switch v-model="themeConfig.isDark" @change="handleDark">
				<template #active-action>
					<el-icon><Sunny/></el-icon>
				</template>
				<template #inactive-action>
					<el-icon><Moon/></el-icon>
				</template>
			</el-switch>
		</el-tooltip> -->
	</el-space>
</template>

<script setup lang="ts" name="ThemeDark">
import { computed } from "vue";
import { useGlobalStore } from "@/store";
import { Sunny, Moon, CaretLeft, CaretRight } from "@element-plus/icons-vue";
import { useTheme } from "@/hooks/useTheme";

const props = defineProps({
	fromToLogin: {
		type: Boolean,
		default: false
	}
})
const emit = defineEmits(['emitSwitch'])
const myStore: any = useGlobalStore();
const themeConfig = computed(() => myStore.themeConfig);

const { switchDark } = useTheme();

const handleDark = (val: any) => {
	myStore.setThemeConfig({ ...themeConfig.value, isDark: val, isWindowMode: false })
	switchDark()
}
const switchReplaceLoginPage = (val: any) => {
	myStore.setThemeConfig({ ...themeConfig.value, isReplaceNewLoginPage: val })
	emit('emitSwitch')
}
</script>
