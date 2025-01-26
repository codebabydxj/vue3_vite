import { computed } from "vue";
import { Theme } from "./interface";
import { getLightColor, getDarkColor } from "@/utils/tools/color";
import { useGlobalStore } from "@/store";
import { ElMessage } from "element-plus";

/**
 * @description 切换主题
 * */
export const useTheme = () => {
  const myStore: any = useGlobalStore();
  const themeConfig = computed(() => myStore.themeConfig);
  const DEFAULT_PRIMARY = '#409EFF'

  // 切换 暗黑模式 || 明亮模式 || 跟随系统
  const switchDark = () => {
    const body = document.documentElement as HTMLElement;
    if (themeConfig.value.isDark || (themeConfig.value.isWindowMode && window.matchMedia('(prefers-color-scheme: dark)')?.matches)) body.setAttribute("class", "dark");
    else body.setAttribute("class", "");
    changePrimary(themeConfig.value.primary);
  };

  // 修改主题颜色
  const changePrimary = (val: string | null) => {
    if (!val) {
      val = DEFAULT_PRIMARY;
      ElMessage({ type: "success", message: `主题颜色已重置为 ${DEFAULT_PRIMARY}` });
    }
    // 为了兼容暗黑模式下主题颜色也正常，以下方法计算主题颜色 由深到浅 的具体颜色
    document.documentElement.style.setProperty("--el-color-primary", val);
    document.documentElement.style.setProperty(
      "--el-color-primary-dark-2",
      themeConfig.value.isDark ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
    );
    // 颜色加深或变浅
    for (let i = 1; i <= 9; i++) {
      const primaryColor = themeConfig.value.isDark ? `${getDarkColor(val, i / 10)}` : `${getLightColor(val, i / 10)}`;
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor);
    }
    myStore.setThemeConfig({ ...themeConfig.value, primary: val });
};

  // 灰色和弱色切换
  const changeGreyOrWeak = (type: Theme.GreyOrWeakType, value: boolean) => {
    const body = document.body as HTMLElement;
    if (!value) return body.removeAttribute("style");
    const styles: Record<Theme.GreyOrWeakType, string> = {
      grey: "filter: grayscale(1)",
      weak: "filter: invert(80%)"
    };
    body.setAttribute("style", styles[type]);
    const propName = type == "grey" ? "isWeak" : "isGrey";
    myStore.setThemeConfig({ ...themeConfig.value, [propName]: false });
  };

  // 初始化 theme 配置
  const initTheme = () => {
    switchDark();
    if (themeConfig.value.isGrey) changeGreyOrWeak("grey", true);
    if (themeConfig.value.isWeak) changeGreyOrWeak("weak", true);
  };

  return {
    initTheme,
    switchDark,
    changePrimary,
    changeGreyOrWeak
  };
};
