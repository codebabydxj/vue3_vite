<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <el-scrollbar>
          <div class="content-box">
            <el-button type="primary" @click="goBack">返回上级页面</el-button>
            当前是三级页面
          </div>
        </el-scrollbar>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="Pro_Details_3">
import { inject } from 'vue'

const Router: any = inject('Router')
const goBack = () => {
  Router.goView()
}
</script>