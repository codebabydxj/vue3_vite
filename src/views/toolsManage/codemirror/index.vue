<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <el-scrollbar>
          <div>
            <span style="font-size: 16px">代码编辑器组件，采用开源的 </span>
            <el-link
              href="https://rennzhang.github.io/codemirror-editor-vue3/zh-CN/guide/getting-started"
              target="_blank"
              icon="Edit"
              type="primary"
              style="font-size: 16px; margin: 0 4px 5px"
            >
              codemirror-editor-vue3
            </el-link>
          </div>
          <Codemirror />
          <el-descriptions title="配置项 📚" :column="1" border style="margin-top: 10px;">
            <el-descriptions-item label="value"> 编辑器内容，使用示例： v-model:value="code"> </el-descriptions-item>
            <el-descriptions-item label="width"> 编辑器宽度 默认占满 </el-descriptions-item>
            <el-descriptions-item label="height"> 编辑器高度 默认400px </el-descriptions-item>
            <el-descriptions-item label="border"> 编辑器边框 默认显示 </el-descriptions-item>
          </el-descriptions>
        </el-scrollbar>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="Codemirror">
import { ref } from 'vue'
import Codemirror from '@/components/Codemirror/index.vue'

</script>

<style scoped lang="scss">

</style>
