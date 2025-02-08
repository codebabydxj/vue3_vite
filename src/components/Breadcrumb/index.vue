<template>
  <div class="breadcrumb-container">
    <div :class="['breadcrumb-box']">
      <el-icon :size="20" class="guide"><Guide /></el-icon>
      <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
            <div
              class="el-breadcrumb__inner is-link"
              :class="{ 'item-no-icon': !item.meta.icon }"
              @click="onBreadcrumbClick(item, index)"
            >
              <span class="breadcrumb-title">{{ item.meta.title }}</span>
            </div>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts" name="Breadcrumb">
import { computed, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";
import { useGlobalStore } from "@/store";
import { useKeepAliveStore } from "@/store/keepAlive";
import { HOME_URL } from "@/config";

const route = useRoute();
const router = useRouter();
const Router: any = inject('Router')
const myStore: any = useGlobalStore();
const keepAliveStore: any = useKeepAliveStore();

const breadcrumbList = computed(() => {
  let breadcrumbData = myStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? [];
  // 🙅‍♀️不需要首页面包屑可删除以下判断
  if (breadcrumbData[0].path !== HOME_URL) {
    breadcrumbData = [{ path: HOME_URL, meta: { icon: "HomeFilled", title: "工作台" } }, ...breadcrumbData];
  }
  return breadcrumbData;
});


const onBreadcrumbClick = (item: any, index: number) => {
  if (index !== breadcrumbList.value.length - 1) {
    let path: any = '';
    if (item.redirect) path = item.redirect;
    else path = item.path;
    const options: any = {
      onlyUpdateRouter: true
    }
    if (item.name) options.name = item.name;
    if (item.close) options.close = item.close;
    Router.openView(path, false, options);
    router.replace(path);
    keepAliveStore.updateKeepAliveName([]);
  }
};
</script>

<style scoped lang="scss">
.breadcrumb-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  transition: background-color 0.3s;

  .breadcrumb-box {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 50px;
    overflow: hidden;
    mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);

    .breadcrumb {
      padding-left: 10px;
      white-space: nowrap;
      font-size: 14px;

      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          color: var(--el-header-text-color);
          &:hover {
            color: var(--el-color-primary);
          }
        }
        &:last-child .el-breadcrumb__inner,
        &:last-child .el-breadcrumb__inner:hover {
          color: var(--el-header-text-color-regular);
        }
      }
    }
  }
}
// 面包屑动画
.breadcrumb-enter-active {
  transition: transform 0.3s, opacity 0.3s;
}

.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(30px) skewX(-50deg);
}

.guide {
  color: var(--el-header-text-color);
  padding-left: 10px;
}
</style>
