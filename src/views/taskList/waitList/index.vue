<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <el-row>
          <el-form ref="ruleFormRef" :model="searchForm" inline>
            <el-form-item label="用户名" prop="userName">
              <el-input type="text" placeholder="用户名：admin / user" v-model="searchForm.userName" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-col class="tar">
            <table-memory :tableTitle="tableTitle" :titleList="titleListLocal" @titleChange="handleTitleChange">
            </table-memory>
          </el-col>
        </el-row>
        <el-row>
          <el-table id="tableStyle" border stripe style="width: 100%" :data="tableData">
            <el-table-column width="55" type="selection" align="center"></el-table-column>
            <el-table-column align="center" prop="date" label="Date"
              v-if="titleListLocal.some((i: any) => i.title === 'Date' && i.status)" />
            <el-table-column align="center" prop="name" label="Name"
              v-if="titleListLocal.some((i: any) => i.title === 'Name' && i.status)" />
            <el-table-column align="center" prop="age" label="Age"
              v-if="titleListLocal.some((i: any) => i.title === 'Age' && i.status)" />
            <el-table-column align="center" prop="gender" label="Gender"
              v-if="titleListLocal.some((i: any) => i.title === 'Gender' && i.status)" />
            <el-table-column align="center" prop="address" label="Address"
              v-if="titleListLocal.some((i: any) => i.title === 'Address' && i.status)" />
          </el-table>
        </el-row>
      </el-card>
    </div>
  </flex-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick, onMounted, inject } from 'vue'
import { globalStore } from '@/store'
import tableMemory from '@/components/table-memory/index.vue';

export default defineComponent({
  components: {
    tableMemory,
  },
  setup() {
    // 获取全局store
    const myStore: any = globalStore()
    // 通过inject获取挂载在全局的globalFunc方法，初始化view
    const globalFunc: any = inject('globalFunc')
    const searchForm: any = ref({

    })
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
    const resetForm = () => {
      globalFunc.refreshView()
    }
    return {
      searchForm,
      tableData,
      tableTitle,
      titleListLocal,
      handleTitleChange,
      resetForm,
    }
  }
})
</script>

<style scoped lang="scss">

</style>
