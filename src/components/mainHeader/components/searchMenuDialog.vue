<template>
  <div class="search-menu">
    <el-dialog class="search-dialog" v-model="isShowSearch" :width="600" :show-close="false" top="10vh">
      <el-input
        v-model="searchMenu"
        ref="menuInputRef"
        placeholder="菜单搜索：支持菜单名称、路径"
        size="large"
        clearable
        :prefix-icon="Search"
      ></el-input>
      <div v-if="searchList.length" class="menu-list" ref="menuListRef">
        <div
          v-for="item in searchList"
          :key="item.path"
          :class="['menu-item', { 'menu-active': item.path === activePath }]"
          @mouseenter="mouseoverMenuItem(item)"
          @click="handleClickMenu()"
        >
          <div class="menu-lf">
            <el-icon class="menu-icon">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span class="menu-title">{{ item.meta.title }}</span>
          </div>
          <el-icon class="menu-enter" @click="handleOpen">
            <EnterOutlined style="font-weight: 700;" />
          </el-icon>
        </div>
      </div>
      <el-empty v-else class="mt20 mb20" :image-size="100" description="暂无菜单" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="searchMenuDialog">
import { ref, computed, nextTick, watch, inject } from "vue";
import { InputInstance } from "element-plus";
import { EnterOutlined } from '@vicons/antd'
import { Search } from "@element-plus/icons-vue";
import { useGlobalStore } from '@/store'
import { useDebounceFn } from "@vueuse/core";

const globalRouter: any = inject('globalRouter')
const myStore: any = useGlobalStore()
const menuList = computed(() => myStore.flatMenuListGet.filter((item: any) => !item.meta.isHide))
const activePath = ref("");
const menuInputRef = ref<InputInstance | null>(null);
const isShowSearch = ref<boolean>(false);
const searchMenu = ref<string>("");
const searchList = ref<any[]>([]);
const menuListRef = ref<Element | null>(null);

const mouseoverMenuItem = (menu: any) => {
  activePath.value = menu.path;
};

watch(isShowSearch, val => {
  if (val) {
    document.addEventListener("keydown", keyboardOperation);
  } else {
    document.removeEventListener("keydown", keyboardOperation);
  }
});

const handleOpen = () => {
  isShowSearch.value = true;
  nextTick(() => {
    setTimeout(() => {
      menuInputRef.value?.focus();
    });
  });
};


const updateSearchList = () => {
  searchList.value = searchMenu.value
    ? menuList.value.filter(
        (item: any) =>
          (item.path.toLowerCase().includes(searchMenu.value.toLowerCase()) ||
            item.meta.title.toLowerCase().includes(searchMenu.value.toLowerCase())) &&
          !item.meta?.isHide
      )
    : [];
  activePath.value = searchList.value.length ? searchList.value[0].path : "";
};

const debouncedUpdateSearchList = useDebounceFn(updateSearchList, 300);

watch(searchMenu, debouncedUpdateSearchList);

const keyPressUpOrDown = (direction: number) => {
  const length = searchList.value.length;
  if (length === 0) return;
  const index = searchList.value.findIndex(item => item.path === activePath.value);
  const newIndex = (index + direction + length) % length;
  activePath.value = searchList.value[newIndex].path;
  nextTick(() => {
    if (!menuListRef.value?.firstElementChild) return;
    const menuItemHeight = menuListRef.value.firstElementChild.clientHeight + 12 || 0;
    menuListRef.value.scrollTop = newIndex * menuItemHeight;
  });
};

const keyboardOperation = (event: KeyboardEvent) => {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    keyPressUpOrDown(-1);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    keyPressUpOrDown(1);
  } else if (event.key === "Enter") {
    event.preventDefault();
    handleClickMenu();
  }
};

const handleClickMenu = () => {
  const menu = searchList.value.find((item: any) => item.path === activePath.value);
  if (!menu) return;
  if (menu.meta?.isLink) window.open(menu.meta.isLink, "_blank");
  else globalRouter.openView(menu.redirect ? menu.redirect : menu.path)
  searchMenu.value = "";
  isShowSearch.value = false;
};

// 子组件暴露给父组件的方法
defineExpose({
  handleOpen,
})
</script>

<style scoped lang="scss">
.search-menu {
  :deep(.el-dialog) {
    border-radius: 4px;
    .el-dialog__header {
      display: none;
    }
  }
  .menu-list {
    max-height: 515px;
    margin-top: 15px;
    overflow: auto;
    .menu-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 45px;
      padding: 0 20px;
      margin: 10px 0;
      color: var(--el-text-color-secondary);
      cursor: pointer;
      background-color: transparent;
      border: 1px solid var(--el-border-color);
      border-radius: 6px;
      transition: all 0.2s ease;
      .menu-lf {
        display: flex;
        align-items: center;
      }
      .menu-icon {
        margin-right: 8px;
        font-size: 16px;
      }
      .menu-title {
        font-size: 14px;
      }
      .menu-enter {
        font-size: 24px;
      }
    }
    .menu-active {
      color: #ffffff;
      background-color: var(--el-color-primary);
      .menu-icon {
        font-size: 18px;
      }
      .menu-title {
        font-size: 16px;
      }
      .menu-enter {
        font-size: 28px;
      }
    }
  }
}
</style>