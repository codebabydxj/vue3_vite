<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <el-scrollbar>
          <div>
            <span style="font-size: 16px">播放器组件，采用开源的 </span>
            <el-link
              href="https://h5player.bytedance.com/"
              target="_blank"
              icon="VideoPlay"
              type="primary"
              style="font-size: 16px; margin: 0 4px 5px"
            >
              西瓜播放器
            </el-link>
          </div>
          <div style="width: 600px; height: 400px;">
            <Player width="600px" height="400px" />

          </div>
          <div class="content-box">
            <el-descriptions title="配置项 📚" :column="1" border>
              <el-descriptions-item label="使用"> {{ '<svg-icon' }} name="svg命名" :iconStyle="{ width: '100px', height: '100px'}" /> </el-descriptions-item>
              <el-descriptions-item label="name"> 图标的名称，svg 图标必须存储在 src/icons/svg 目录下 </el-descriptions-item>
              <el-descriptions-item label="prefix"> 图标的前缀，默认为 "icon" </el-descriptions-item>
              <el-descriptions-item label="iconStyle"> 图标的样式，默认样式为 { width: "16px", height: "16px" } </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="PlayerPage">
import Player from '@/components/Player/index.vue'

</script>

<style scoped lang="scss">

</style>
