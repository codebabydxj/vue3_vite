<template>
  <div class="config-btn">
    <el-tooltip effect="dark" content="表格列配置" placement="top">
      <el-button circle @click="show">
        <el-icon size="16">
          <Operation />
        </el-icon>
      </el-button>
    </el-tooltip>
    <dialog-table-memory :dialogShow="dialogTableMemoryShow" :colSetting="colSetting"
      @closeDialog="closeDialogTableMemory"></dialog-table-memory>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dialogTableMemory from './components/dialog-table-memory.vue'

const props = defineProps({
  colSetting: {
    type: Array,
    required: true,
  },
})

const dialogTableMemoryShow: any = ref(false)

const show = () => {
  dialogTableMemoryShow.value = true
}

const closeDialogTableMemory = () => {
  dialogTableMemoryShow.value = false
}
</script>
