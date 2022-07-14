<template>
  <flex-card>
    <div class="base-warp">
      <el-row>
        <el-col class="tar">
          <table-memory 
            :tableTitle="tableTitle"
            :titleList="titleListLocal"
            @titleChange="handleTitleChange">
          </table-memory>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="tableData" border stripe style="width: 100%">
          <el-table-column width="55" type="selection" align="center"></el-table-column>
          <el-table-column align="center" prop="date" label="Date" v-if="titleListLocal.some((i: any) => i.title === 'Date' && i.status)"/>
          <el-table-column align="center" prop="name" label="Name" v-if="titleListLocal.some((i: any) => i.title === 'Name' && i.status)"/>
          <el-table-column align="center" prop="age" label="Age" v-if="titleListLocal.some((i: any) => i.title === 'Age' && i.status)"/>
          <el-table-column align="center" prop="gender" label="Gender" v-if="titleListLocal.some((i: any) => i.title === 'Gender' && i.status)"/>
          <el-table-column align="center" prop="address" label="Address" v-if="titleListLocal.some((i: any) => i.title === 'Address' && i.status)"/>
        </el-table>
      </el-row>
    </div>
  </flex-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { globalStore } from '@/store'
import tableMemory from '@/components/table-memory/index.vue';

export default defineComponent({
  components: {
    tableMemory,
  },
  setup() {
    // 获取全局store
    const myStore: any = globalStore()
    const tableTitle: any = computed(() => `${myStore.userInfo ? myStore.userInfo.userName : 'vite'}-${myStore.currentRoute}`)
    const tableData: any = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        age: 18,
        gender: '男',
      },
      {
        date: '2016-05-02',
        name: 'go',
        address: 'No. 189, Grove St, Los Angeles',
        age: 20,
        gender: '女',
      },
      {
        date: '2016-05-04',
        name: 'jim',
        address: 'No. 189, Grove St, Los Angeles',
        age: 30,
        gender: '女',
      },
      {
        date: '2016-05-01',
        name: 'jack',
        address: 'No. 189, Grove St, Los Angeles',
        age: 18,
        gender: '男',
      },
    ])
    const titleListLocal: any = ref([
      {
        name: 'date',
        title: 'Date',
        status: true,
        isDisabled: true,
      },
      {
        name: 'name',
        title: 'Name',
        status: true,
      },
      {
        name: 'age',
        title: 'Age',
        status: true,
      },
      {
        name: 'gender',
        title: 'Gender',
        status: true,
      },
      {
        name: 'address',
        title: 'Address',
        status: true,
      },
    ])

    const handleTitleChange = (newTitleList: any) => {
      titleListLocal.value = newTitleList;
    }
    return {
      tableData,
      tableTitle,
      titleListLocal,
      handleTitleChange,
    }
  }
})
</script>

<style scoped lang="scss">
</style>
