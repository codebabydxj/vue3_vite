<template>
  <flex-card>
    <div class="base-warp">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column align="center" prop="date" label="Date" width="180" />
        <el-table-column align="center" prop="name" label="Name" width="180" />
        <el-table-column align="center" prop="address" label="Address" />
      </el-table>
    </div>
  </flex-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({

  setup() {
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]
    return {
      tableData,
    }
  }
})
</script>

<style scoped lang="scss">
</style>
