import { computed } from "vue";
import { useRoute } from "vue-router";
import { globalStore } from "@/store";

/**
 * @description 页面按钮权限
 * */
export const useAuthButtons = () => {
  const route = useRoute();
  const myStore: any = globalStore();
  const authButtons = myStore.authButtonListGet[route.name as string] || [];

  const BUTTONS = computed(() => {
    let currentPageAuthButton: { [key: string]: boolean } = {};
    authButtons.forEach((item: any) => (currentPageAuthButton[item] = true));
    return currentPageAuthButton;
  });

  return {
    BUTTONS
  };
};
