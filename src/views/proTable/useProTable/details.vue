<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <el-scrollbar>
          <div class="content-box">
            <el-button type="primary" @click="goBack">返回上级页面</el-button>
            当前是二级页面
            <el-button type="primary" @click="goToDetail">三级详情页面</el-button>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="Pro_Details">
import { inject } from 'vue'

const Router: any = inject('Router')
const goToDetail = () => {
  Router.openView('/proTable/useProTable/details/3?id=10')
}
const goBack = () => {
  Router.goView()
}
</script>