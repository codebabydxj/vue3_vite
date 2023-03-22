<template>
  <div class="config-btn">
    <el-tooltip effect="dark" content="表格尺寸" placement="top">
      <el-dropdown trigger="click">
        <el-button circle>
          <el-icon size="16">
            <column-height-outlined />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="default">
              默 认
            </el-dropdown-item>
            <el-dropdown-item command="large">
              宽 松
            </el-dropdown-item>
            <el-dropdown-item command="small">
              紧 凑
            </el-dropdown-item>
          </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</div></template>