<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <el-scrollbar>
          <div class="content-box">
            <span class="text"> 按钮权限 🍓🍇🍈🍉</span>
            <el-alert class="mb20" :title="`当前用户按钮权限：${JSON.stringify(Object.keys(BUTTONS))}`" type="success" :closable="false" />
            <el-divider content-position="left">使用 Hooks 方式绑定权限</el-divider>
            <el-row class="mb20">
              <el-button type="primary" :icon="CirclePlus" v-if="BUTTONS.add">新增</el-button>
              <el-button type="warning" :icon="EditPen" v-if="BUTTONS.edit">编辑</el-button>
              <el-button type="danger" plain :icon="Delete" v-if="BUTTONS.delete">删除</el-button>
              <el-button type="info" plain :icon="Upload" v-if="BUTTONS.import">导入数据</el-button>
              <el-button type="info" plain :icon="Download" v-if="BUTTONS.export">导出数据</el-button>
            </el-row>
            <el-divider content-position="left">使用 v-auth 指令绑定单个权限</el-divider>
            <el-row class="mb20">
              <el-button type="primary" :icon="CirclePlus" v-auth="'add'">新增</el-button>
              <el-button type="warning" :icon="EditPen" v-auth="'edit'">编辑</el-button>
              <el-button type="danger" plain :icon="Delete" v-auth="'delete'">删除</el-button>
              <el-button type="info" plain :icon="Upload" v-auth="'import'">导入数据</el-button>
              <el-button type="info" plain :icon="Download" v-auth="'export'">导出数据</el-button>
            </el-row>
            <el-divider content-position="left">使用 v-auth 指令绑定多个权限</el-divider>
            <el-row>
              <el-button type="primary" :icon="CirclePlus" v-auth="['add', 'edit', 'delete', 'import', 'export']">新增</el-button>
              <el-button type="warning" :icon="EditPen" v-auth="['add', 'edit', 'delete', 'import', 'export']">编辑</el-button>
              <el-button type="danger" plain :icon="Delete" v-auth="['add', 'edit', 'delete', 'import', 'export']">删除</el-button>
              <el-button type="info" plain :icon="Upload" v-auth="['add', 'edit', 'delete', 'import', 'export']">导入数据</el-button>
              <el-button type="info" plain :icon="Download" v-auth="['add', 'edit', 'delete', 'import', 'export']">导出数据</el-button>
            </el-row>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="AuthButton">
import { useAuthButtons } from "@/hooks/useAuthButtons";
import { CirclePlus, Delete, EditPen, Download, Upload } from "@element-plus/icons-vue";

const { BUTTONS } = useAuthButtons();
</script>

<style scoped lang="scss">

</style>
