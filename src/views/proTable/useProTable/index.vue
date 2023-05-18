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
          <!-- 表格 header 按钮 -->
          <template #tableHeader="scope">
            <el-button type="primary" :icon="CirclePlus">新增用户</el-button>
            <el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户</el-button>
            <el-button type="primary" :icon="Download" plain @click="exportData">导出用户数据</el-button>
            <el-button type="danger" :icon="Delete" plain @click="batchDelete(scope.selectedListIds)" :disabled="!scope.isSelected">批量删除用户</el-button>
            <el-button type="primary" @click="goToDetail">二级详情页面</el-button>
          </template>
          <!-- 表格操作 -->
          <template #operation="scope">
            <el-link type="primary" :icon="View">查看</el-link>
            <el-link type="primary" :icon="EditPen">编辑</el-link>
            <el-popconfirm title="确定删除吗?" @confirm="handleDel(scope.row)">
              <template #reference>
                <el-link type="danger" :icon="Delete">删除</el-link>
              </template>
            </el-popconfirm>
          </template>
        </ProTable>
        <uploadExcel ref="importRef" />
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="UseProTable">
import { ref, reactive, inject } from 'vue'
import { CirclePlus, Delete, EditPen, Download, Upload, View } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { client } from "@/utils/https/client"
import { useHandleData } from "@/hooks/useHandleData"
import { useDownload } from "@/hooks/useDownload";
import ProTable from '@/components/ProTable/index.vue'
import { ColumnProps } from "@/components/ProTable/interface"
import uploadExcel from "@/components/uploadExcel/index.vue"

// 请求table数据
const requestApiParams = ref({ url: '/api/proTable' })

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
const dataCallback = (data: any) => {
	return {
		list: data.list,
		total: data.total,
		pageNum: data.page,
		pageSize: data.size
	};
};

/** 
 * 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
 * 如果是结合了tree，给proTable组件 的 requestAuto 属性设为 false，不会自动请求表格数据，等待 treeFilter 数据回来之后，更改 initParam 的值，才会触发请求 proTable 数据
*/
const initParam = reactive(<any>{
	type: 1
});

// 表格配置项 ---- 不加search就不会成为搜索条件，enum 也可以通过接口获取常量值
const columns: ColumnProps[] = [
	{ type: 'selection', fixed: 'left', width: 80 },
	{ type: 'index', label: '序号', width: 80 },
	{ prop: 'username', label: '用户姓名', search: { el: 'input' } },
	{ prop: 'gender', label: '性别', enum: [{ label: '男', value: 1 },{ label: '女', value: 2 }], search: { el: 'select' } },
	{ prop: 'age', label: '年龄', search: { el: 'input' } },
	{ prop: 'idCard', label: '身份证号', search: { el: 'input' } },
	{ prop: 'email', label: '邮箱' },
	{ prop: 'address', label: '居住地址' },
	{ prop: 'status', label: '用户状态', enum: [{ label: '启用', value: 1 },{ label: '禁用', value: 0 }], search: { el: 'select' } },
	{ 
    prop: 'createTime',
    label: '创建时间',
    search: {
      el: 'date-picker',
      span: 2,
      props: {
        type: 'daterange',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]
      },
      resetValue: [ 'startTime', 'endTime' ]
    },
    width: 180
  },
	{ prop: 'operation', label: '操作', fixed: 'right', width: 330 }
];

// 批量添加用户
const importRef = ref<InstanceType<typeof uploadExcel> | null>(null);
const batchAdd = () => {
  const params = {
    title: "用户",
    tempApi: { url: '', params: {} },
		importApi: { url: '/api/geeker/user/import', params: { type: 'sx', id: '123'} },
    getTableList: proTable.value.getTableList
  };
  importRef.value?.acceptParams(params);
};

// 导出数据
const exportData = async () => {
  ElMessageBox.confirm("确认导出用户数据?", "温馨提示", { type: "warning" }).then(() =>
    useDownload({ url: '/api/user/export', params: proTable.value.searchParam }, '用户列表')
  );
}

// 批量删除用户信息
const batchDelete = async (ids: string[]) => {
	await useHandleData('/batch/delete', { ids }, '删除所选用户信息');
	proTable.value.clearSelection();
	proTable.value.getTableList();
};

// 删除单个用户
const handleDel = async (row: any) => {
  client.get('/api/user/delete', { id: row.id })
  .then((res: any) => {
    ElMessage({
      type: "success",
      message: '删除成功!'
    });
    proTable.value.getTableList();
  })
}

// 跳转二级页面
const globalRouter: any = inject('globalRouter')
const goToDetail = () => {
  globalRouter.openView('/proTable/useProTable/details')
}
</script>

<style scoped lang="scss">
</style>
