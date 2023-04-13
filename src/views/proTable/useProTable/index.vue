<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <ProTable
          ref="proTable"
          title="用户列表"
          :columns="columns"
          :initParam="initParam"
          :requestApiParams="requestApiParams"
			    :dataCallback="dataCallback">
          <!-- 表格 查询 -->
          <template #tableSearch="scope">
            <el-form ref="ruleFormRef" :model="searchForm" inline>
              <el-form-item label="用户名" prop="userName">
                <el-input type="text" placeholder="用户名" v-model="searchForm.userName" />
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-select v-model="searchForm.gender" placeholder="性别">
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button @click="reset">重置</el-button>
              </el-form-item>
            </el-form>
          </template>
          <!-- 表格 header 按钮 -->
          <template #tableHeader="scope">
            <el-button type="primary" :icon="CirclePlus">新增用户</el-button>
            <el-button type="primary" :icon="Upload" plain>批量添加用户</el-button>
            <el-button type="primary" :icon="Download" plain>导出用户数据</el-button>
            <el-button type="danger" :icon="Delete" plain @click="batchDelete(scope.selectedListIds)" :disabled="!scope.isSelected">批量删除用户</el-button>
          </template>
          <!-- 表格操作 -->
          <template #operation="scope">
            <el-button type="primary" link :icon="View">查看</el-button>
            <el-button type="primary" link :icon="EditPen">编辑</el-button>
            <el-button type="primary" link :icon="Delete">删除</el-button>
          </template>
        </ProTable>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from 'vue'
import ProTable from '@/components/ProTable/index.vue'
import { CirclePlus, Delete, EditPen, Download, Upload, View } from "@element-plus/icons-vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";

// 通过inject获取挂载在全局的globalRouter方法，初始化view
const globalRouter: any = inject('globalRouter')

// 请求table数据
const requestApiParams = ref({ url: '/api/getTableData' })

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
const dataCallback = (data: any) => {
	return {
		list: data.list,
		total: data.total,
		pageNum: data.pageNum,
		pageSize: data.pageSize
	};
};

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
	type: 1
});

// 查询参数
const searchForm = reactive(<any>{
  userName: '',
  gender: '',
})

// 表格配置项
const columns: ColumnProps[] = [
	{ type: "selection", fixed: "left", width: 80 },
	{ type: "index", label: "序号", width: 80 },
	{ prop: "username", label: "用户姓名" },
	{ prop: "gender", label: "性别" },
	{ prop: "age", label: "年龄" },
	{ prop: "idCard", label: "身份证号" },
	{ prop: "email", label: "邮箱" },
	{ prop: "address", label: "居住地址" },
	{ prop: "status", label: "用户状态" },
	{ prop: "createTime", label: "创建时间", width: 180 },
	{ prop: "operation", label: "操作", fixed: "right", width: 330 }
];

// 查询
const search = () => {
  proTable.value.searchParam = { ...searchForm }
  proTable.value.search();
}

// 重置
const reset = () => {
  globalRouter.refreshView()
}

// 批量删除用户信息
const batchDelete = async (ids: string[]) => {
	await useHandleData('/batch/delete', { ids }, "删除所选用户信息");
	proTable.value.clearSelection();
	proTable.value.getTableList();
};
</script>

<style scoped lang="scss">
</style>
