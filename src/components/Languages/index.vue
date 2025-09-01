<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <svg-icon name="lang" :iconStyle="{ width: '23px', height: '23px'}" color=""></svg-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageList"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="Languages">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useGlobalStore } from '@/store';
import { LanguageType } from "@/store/interface";

const myStore = useGlobalStore();
const themeConfig = computed(() => myStore.themeConfig);
const i18n = useI18n();
const language: any = computed(() => myStore.themeConfig.language);

const languageList: any = ref([
  { label: "简体中文", value: "zh" },
  { label: "English", value: "en" }
]);

const changeLanguage = (lang: string) => {
  i18n.locale.value = lang;
  myStore.setThemeConfig({ ...themeConfig.value, language: lang as LanguageType });
};
</script>
