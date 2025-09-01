<template>
  <div class="vite-app">
    <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { getBrowserLang } from "@/utils/tools";
import { useTheme } from "@/hooks/useTheme";
import { LanguageType } from "@/store/interface";
import { useGlobalStore } from "@/store";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const myStore: any = useGlobalStore()
const themeConfig = computed(() => myStore.themeConfig);

// 初始化主题配置
const { initTheme } = useTheme();
initTheme();

const i18n = useI18n();
onMounted(() => {
  const language: any = myStore.themeConfig.language ?? getBrowserLang();
  i18n.locale.value = language;
  myStore.setThemeConfig({ ...themeConfig.value, language: language as LanguageType });
});

const locale = computed(() => {
  if (myStore.themeConfig.language == "zh") return zhCn;
  if (myStore.themeConfig.language == "en") return en;
  return getBrowserLang() == "zh" ? zhCn : en;
});

const buttonConfig: any = ref({ autoInsertSpace: true });
const assemblySize = computed(() => myStore.themeConfig.assemblySize);
</script>

<style lang="scss">
/** 全局基本样式 */
#app, .vite-app {
  height: 100vh !important;
  margin: 0;
}
.base-warp {
  width: calc(100%) !important;
  height: calc(100%) !important;
  display: block;
  flex: 1;
}
</style>
