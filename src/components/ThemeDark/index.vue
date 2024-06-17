<template>
	<el-switch v-model="themeConfig.isDark" @change="switchDark" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" />
</template>

<script setup lang="ts" name="ThemeDark">
import { computed } from "vue";
import { useGlobalStore } from "@/store";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useTheme } from "@/hooks/useTheme";

const myStore: any = useGlobalStore();
const themeConfig = computed(() => myStore.themeConfig);

const { switchDark } = useTheme();
</script>
