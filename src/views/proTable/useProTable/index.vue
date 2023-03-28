<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <ProTable
          ref="proTable"
          title="用户列表">
          <!-- 表格 header 按钮 -->
          <template #tableHeader="scope">
            <el-button type="primary" :icon="CirclePlus">新增用户</el-button>
            <el-button type="primary" :icon="Upload" plain>批量添加用户</el-button>
            <el-button type="primary" :icon="Download" plain>导出用户数据</el-button>
            <el-button type="danger" :icon="Delete" plain>批量删除用户</el-button>
          </template>
        </ProTable>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProTable from '@/components/ProTable/index.vue'
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from "@element-plus/icons-vue";

</script>

<style scoped lang="scss">
</style>
