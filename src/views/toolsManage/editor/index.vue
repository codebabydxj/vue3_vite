<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
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
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Editor from '@/components/editor/index.vue'

const content = ref('hello editor~')
</script>

<style scoped lang="scss">

</style>
