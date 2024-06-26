<template>
	<el-space>
		<el-tooltip
			effect="dark"
			content="切换登录风格"
			placement="bottom">
			<el-switch v-if="fromToLogin" v-model="themeConfig.isReplaceNewLoginPage" @change="switchReplaceLoginPage" inline-prompt :active-icon="CaretLeft" :inactive-icon="CaretRight" />
		</el-tooltip>
		<el-tooltip
			effect="dark"
			content="切换主题色"
			placement="bottom">
			<el-switch v-model="themeConfig.isDark" @change="switchDark" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" />
		</el-tooltip>
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

const switchReplaceLoginPage = (val: any) => {
	myStore.setThemeConfig({ ...themeConfig.value, isReplaceNewLoginPage: val })
	emit('emitSwitch')
}
</script>
