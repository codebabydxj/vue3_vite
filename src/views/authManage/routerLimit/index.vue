<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <ProTable
          ref="menuProTable"
          title="菜单管理"
          row-key="path"
          :isShowSelIdx="true"
          :columns="columns"
          :requestApiParams="requestApiParams"
          :pagination="false">
          <!-- 表格 header 按钮 -->
          <template #tableHeader="scope">
            <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增菜单</el-button>
            <el-button type="primary" :icon="View" @click="handleExpand">展开 | 合并</el-button>
          </template>
          <!-- 菜单图标 -->
          <template #icon="scope">
            <el-icon :size="18">
              <component :is="scope.row.meta.icon"></component>
            </el-icon>
          </template>
          <!-- 菜单排序 -->
          <template #sort="scope">
            <el-input-number class="el-num" v-model="scope.row.sort" controls-position="right" size="small" :min="1" :max="99" />
          </template>
          <!-- 表格操作 -->
          <template #operation="scope">
            <el-link type="primary" :icon="EditPen" style="margin-left: 30px;" @click="openDrawer('编辑', scope.row)">编辑</el-link>
            <el-popconfirm title="确定删除吗?" @confirm="handleDel(scope.row)">
              <template #reference>
                <el-link type="danger" :icon="Delete">删除</el-link>
              </template>
            </el-popconfirm>
            <el-link type="warning" :icon="Lock" @click="authConfig(scope.row)" v-if="scope.row.component">按钮权限</el-link>
          </template>
        </ProTable>
        <UserDrawer ref="drawerRef" />
        <authButtonDialog ref="authButtonRef" />
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="RouterLimit">
import { ref } from "vue";
import { CirclePlus, Delete, EditPen, View, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { client } from "@/utils/https/client";
import * as API from "@/config/api";
import ProTable from "@/components/ProTable/index.vue";
import UserDrawer from "../components/dialogAddRouter.vue";
import authButtonDialog from "../components/dialogAuthButton.vue";
import { ColumnProps } from "@/components/ProTable/interface";

// 请求table数据
const requestApiParams = ref({ url: API.menuList, method: 'get' })

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const menuProTable = ref();

// 表格配置项 ---- 不加search就不会成为搜索条件，enum 也可以通过接口获取常量值
const columns: ColumnProps[] = [
	{ type: 'selection', fixed: 'left', width: 80 },
	{ type: 'index', label: '序号', width: 80 },
	{ prop: 'meta.title', label: '菜单名称', align: 'left', width: 200, search: { el: 'input' } },
	{ prop: 'meta.icon', label: '菜单图标',  width: 120 },
	{ prop: 'name', label: '组件 name', width: 160 },
	{ prop: 'path', label: '菜单路径', search: { el: 'input' } },
	{ prop: 'component', label: '组件路径' },
	{ prop: 'sort', label: '排序', width: 120 },
	{ prop: 'operation', label: '操作', align: 'left', fixed: 'right', width: 250 }
];

// 删除单个用户
const handleDel = async (row: any) => {
  client.get('/api/user/delete', { id: row.id })
  .then((res: any) => {
    ElMessage({
      type: 'success',
      message: '删除成功!'
    });
    menuProTable.value.getTableList();
  })
}

// 按钮权限配置
const authButtonRef = ref<InstanceType<typeof authButtonDialog> | null>(null);
const authConfig = (row: any) => {
  const treeList: any = [{ meta: { title: '顶级菜单' }, parentId: '0' }, ...menuProTable.value.tableData];
  const params: any = {
    row: { ...row, status: 1 },
    treeList,
    api: '/api/auth',
    getTableList: menuProTable.value.getTableList
  };
  authButtonRef.value?.acceptParams(params);
}

// 新增/查看/编辑 菜单
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
const openDrawer = (title: string, row: any = {}) => {
  const treeList: any = [{ meta: { title: '顶级菜单' }, parentId: '0' }, ...menuProTable.value.tableData];
  const params: any = {
    title,
    row: { ...row, status: 1 },
    treeList,
    isView: title === "查看",
    api: title === "新增" ? '/api/add/router' : title === "编辑" ? '/api/update/router' : undefined,
    getTableList: menuProTable.value.getTableList
  };
  if (title == '编辑') {
    params.row = { ...row, icon: row.meta.icon, isHide: row.meta.isHide, isKeepAlive: row.meta.isKeepAlive, title: row.meta.title, status: 1 }
  }
  drawerRef.value?.acceptParams(params);
};

// 展开 、收起 多级table
const handleExpand = () => {
  menuProTable.value.setExpand();
}
</script>

<style scoped lang="scss">
.el-num {
  width: 60px;
}
:deep(.el-num>span) {
  display: none;
}
:deep(.el-input-number.is-controls-right .el-input__wrapper) {
  padding-right: 15px;
}
</style>
