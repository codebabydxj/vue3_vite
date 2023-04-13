<template>
	<el-switch v-model="themeConfig.isDark" @change="onAddDarkChange" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" />
</template>

<script setup lang="ts" name="ThemeDark">
import { computed } from "vue";
import { globalStore } from "@/store";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useTheme } from "@/hooks/useTheme";
const myStore: any = globalStore();

const { switchDark } = useTheme();

const themeConfig = computed(() => myStore.themeConfig);

const onAddDarkChange = () => {
	switchDark();
};
</script>
