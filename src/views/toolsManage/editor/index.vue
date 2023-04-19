<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <el-scrollbar :height="maxHeight">
          <template #header>
            <span style="font-size: 16px">编辑器组件，采用开源的 </span>
            <el-link
              href="https://www.wangeditor.com"
              target="_blank"
              icon="Edit"
              type="primary"
              style="font-size: 16px; margin: 0 4px 5px"
            >
              Wangeditor
            </el-link>
          </template>
          <Editor v-model="content" />
          <el-descriptions title="配置项 📚" :column="1" border style="margin-top: 10px;">
            <el-descriptions-item label="value"> 双向绑定的 value 值，使用示例： v-model:value="content"> </el-descriptions-item>
            <el-descriptions-item label="toolbarConfig">
              富文本 ToolBar区域 配置：
              <a href="https://www.wangeditor.com/v5/toolbar-config.html"> https://www.wangeditor.com/v5/toolbar-config.html </a>
            </el-descriptions-item>
            <el-descriptions-item label="editorConfig">
              富文本 编辑区域 配置：
              <a href="https://www.wangeditor.com/v5/editor-config.html"> https://www.wangeditor.com/v5/editor-config.html </a>
            </el-descriptions-item>
            <el-descriptions-item label="height"> 富文本高度，默认为 500px </el-descriptions-item>
            <el-descriptions-item label="mode"> 富文本模式，默认为 default（"default" | "simple"） </el-descriptions-item>
            <el-descriptions-item label="hideToolBar"> 隐藏 ToolBar 区域，默认为 false </el-descriptions-item>
            <el-descriptions-item label="disabled"> 禁用富文本编辑器，默认为 false </el-descriptions-item>
          </el-descriptions>
        </el-scrollbar>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { globalStore } from '@/store'
import Editor from '@/components/editor/index.vue'

// 最大高度计算
const myStore: any = globalStore()
const maxHeight: any = computed(() => myStore.maxHeight)
const content = ref('hello editor~')
</script>

<style scoped lang="scss">

</style>
