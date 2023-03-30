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
          <el-col class="flex-right">
            <table-config :configType="['memory', 'size', 'column']" :tableTitle="tableTitle" :titleList="titleListLocal" @tableConfigCall="handleConfig"></table-config>
          </el-col>
        </el-row>
        <el-table border stripe :data="tableData" :size="tableSize">
          <el-table-column width="55" type="selection" align="center" v-if="tableColumn.includes('selection')"></el-table-column>
          <el-table-column width="55" type="index" align="center" label="序号" v-if="tableColumn.includes('index')"></el-table-column>
          <el-table-column align="center" prop="date" label="日期"
            v-if="titleListLocal.some((i: any) => i.title === '日期' && i.status)" />
          <el-table-column align="center" prop="name" label="姓名"
            v-if="titleListLocal.some((i: any) => i.title === '姓名' && i.status)" />
          <el-table-column align="center" prop="age" label="年龄"
            v-if="titleListLocal.some((i: any) => i.title === '年龄' && i.status)" />
          <el-table-column align="center" prop="gender" label="性别"
            v-if="titleListLocal.some((i: any) => i.title === '性别' && i.status)" />
          <el-table-column align="center" prop="address" label="地址"
            v-if="titleListLocal.some((i: any) => i.title === '地址' && i.status)" />
          <template #empty>
            <div class="table-empty">
              <slot name="empty">
                <img src="@/assets/imgs/notData.png" alt="notData" />
                <div>暂无数据</div>
              </slot>
            </div>
          </template>
        </el-table>
      </el-card>
    </div>
  </flex-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject } from 'vue'
import { globalStore } from '@/store'
import tableConfig from '@/components/tableConfig/index.vue'

export default defineComponent({
  components: {
    tableConfig
  },
  setup() {
    // 获取全局store
    const myStore: any = globalStore()
    // 通过inject获取挂载在全局的globalRouter方法，初始化view
    const globalRouter: any = inject('globalRouter')
    const tableSize: any = ref('')
    const tableColumn: any = ref([])
    const searchForm: any = ref({})
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
        title: '日期',
        status: true,
        isDisabled: true,
      },
      {
        title: '姓名',
        status: true,
      },
      {
        title: '年龄',
        status: true,
      },
      {
        title: '性别',
        status: true,
      },
      {
        title: '地址',
        status: true,
      },
    ])

    // 重置查询表单
    const resetForm = () => {
      globalRouter.refreshView()
    }
    // 表格配置项
    const handleConfig = (data: any) => {
      switch (data.type) {
        case 'memory':
          titleListLocal.value = data.command
          break;
        case 'size':
          tableSize.value = data.command
          break;
        case 'column':
          tableColumn.value = data.command
          break;
        default:
          break;
      }
    }
    return {
      tableSize,
      tableColumn,
      searchForm,
      tableData,
      tableTitle,
      titleListLocal,
      resetForm,
      handleConfig
    }
  }
})
</script>

<style scoped lang="scss"></style>
