<template>
  <div class="config-btn">
    <el-tooltip effect="dark" content="表格尺寸" placement="top">
      <el-dropdown trigger="click" @command="handleCommand">
        <el-button circle>
          <el-icon size="16">
            <Menu />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu class="table-size">
            <el-dropdown-item command="default" :class="{ active: curValue === 'default' }">
              默 认
            </el-dropdown-item>
            <el-dropdown-item command="large" :class="{ active: curValue === 'large' }">
              宽 松
            </el-dropdown-item>
            <el-dropdown-item command="small" :class="{ active: curValue === 'small' }">
              紧 凑
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts" name="TableSize">
import { ref } from 'vue'

const curValue: any = ref('default')
const emit = defineEmits(['command'])

const handleCommand = (command: any) => {
  curValue.value = command
  emit('command', { type: 'size', command: command })
}
</script>

<style lang="scss">
.table-size {
  .active {
    color: var(--color-white) !important;
    background: var(--color-text) !important;
  }
}
</style>
