<template>
	<el-switch v-model="themeConfig.isDark" @change="switchDark" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" />
</template>

<script setup lang="ts" name="ThemeDark">
import { computed } from "vue";
import { globalStore } from "@/store";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useTheme } from "@/hooks/useTheme";

const myStore: any = globalStore();
const themeConfig = computed(() => myStore.themeConfig);

const { switchDark } = useTheme();
</script>
