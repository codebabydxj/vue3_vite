<template>
  <div class="config-btn">
    <el-tooltip effect="dark" content="列设置" placement="top">
      <el-dropdown trigger="click" :hide-on-click="false" popper-class="dropdown-pop">
        <el-button circle>
          <el-icon size="16" color="#383030">
            <appstore-add-outlined />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-checkbox-group v-model="checkList" @change="handleCommand">
                <el-checkbox label="index">序号列</el-checkbox>
                <el-checkbox label="selection">勾选列</el-checkbox>
              </el-checkbox-group>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkList: any = ref([])
const emit = defineEmits(['command'])

const handleCommand = () => {
  emit('command', { type: 'column', command: checkList.value })
}
</script>

<style lang="scss">
.dropdown-pop {
  .el-dropdown-menu__item:not(.is-disabled):focus {
    background-color: #ffffff;
  }
}
</style>
