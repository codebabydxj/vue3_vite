<template>
  <flex-card>
    <div class="base-warp">
      <el-scrollbar>
        <div class="over-card mb10">
          <h4 class="title">简介</h4>
          <span class="text">
            <el-link type="primary" @click="Router.openView('/home');">Vite-Admin</el-link>
            一款基于 Vue3.4、TypeScript、Vite4.5、Pinia、Element-Plus 的后台管理框架，使用目前最新技术栈开发。项目提供强大的
            <el-link type="primary">ProTable 组件</el-link>
            在一定程度上提高您的开发效率。另外本项目还封装了一些常用组件、Hooks、指令、动态路由、按钮级别权限控制等功能。
          </span>
        </div>
        <div class="over-card mb10">
          <h4 class="title">项目信息</h4>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="版本号" label-align="left">
              <el-tag>{{ version }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="发布时间" label-align="left">
              <el-tag>{{ lastBuildTime }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Github" label-align="left">
              <el-link type="primary" href="https://github.com/codebabydxj/vue3_vite" target="_blank"> Github </el-link>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="over-card mb10">
          <h4 class="title">生产环境依赖</h4>
          <el-descriptions :column="3" border>
            <el-descriptions-item v-for="item in dependencies" :key="item.key" width="400px" :label="item.key">
              <el-tag type="info">
                {{ item.value }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="over-card">
          <h4 class="title">开发环境依赖</h4>
          <el-descriptions :column="3" border>
            <el-descriptions-item v-for="item in devDependencies" :key="item.key" width="400px" :label="item.key">
              <el-tag type="info">
                {{ item.value }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-scrollbar>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="About">
import { inject } from "vue";

const { pkg, lastBuildTime } = __APP_INFO__;
const { dependencies, devDependencies, version } = pkg;

// 通过inject获取挂载在全局的globalRouter方法，初始化view
const Router: any = inject('Router')
</script>

<style scoped lang="scss">
.title {
  margin: 0 0 15px;
  font-size: 17px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}
.text {
  font-size: 15px;
  line-height: 25px;
  color: var(--el-text-color-regular);
  .el-link {
    font-size: 15px;
  }
}
</style>
