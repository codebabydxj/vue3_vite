<template>
  <div class="config-btn">
    <el-tooltip effect="dark" content="列设置" placement="top">
      <el-dropdown trigger="click" :hide-on-click="false" popper-class="dropdown-pop">
        <el-button circle>
          <el-icon size="16">
            <hide />
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

<script setup lang="ts" name="TableColumn">
import { ref } from 'vue'

interface ProTableProps {
  isShowSelIdx?: boolean; // 选择框和序号列
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  isShowSelIdx: false
})

const emit = defineEmits(['command'])

const checkList: any = ref([])

const handleCommand = () => {
  emit('command', { type: 'column', command: checkList.value })
}

if (props.isShowSelIdx) {
  checkList.value = ['selection', 'index']
  handleCommand()
} 
</script>

<style lang="scss">
.dropdown-pop {
  .el-dropdown-menu__item:not(.is-disabled):focus {
    background-color: var(--el-bg-color);
  }
}
</style>
