<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="500px" :title="`${drawerProps.title}菜单`">
    <el-form
      ref="ruleFormRef"
      label-width="110px"
      :rules="rules"
      label-suffix="："
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="菜单类型" prop="menuType">
        <el-radio-group v-model="menuType" @change="changeType">
          <el-radio-button :label="1">菜单</el-radio-button>
          <el-radio-button :label="2">按钮</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="title" v-if="menuType == 1">
        <el-input v-model="drawerProps.row.title" placeholder="请填写菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="按钮名称" prop="btnName" v-if="menuType == 2">
        <el-input v-model="drawerProps.row.btnName" placeholder="请填写按钮名称"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentId">
        <el-tree-select
          v-model="drawerProps.row.parentId"
          :data="drawerProps.treeList"
          check-strictly
          placeholder="请选择上级菜单"
          :render-after-expand="false"
          :props="defaultProps"/>
      </el-form-item>
      <template v-if="menuType == 2">
        <el-form-item label="授权标识" prop="authFlag">
          <el-input v-model="drawerProps.row.authFlag" placeholder="请填写授权标识"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="drawerProps.row.status">
            <el-radio :label="0">无效</el-radio>
            <el-radio :label="1">有效</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
      <template v-if="menuType == 1">
        <el-form-item label="组件name" prop="name">
          <el-input v-model="drawerProps.row.name" placeholder="请用英文命名，用作keep-alive缓存"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
          <SelectIcon v-model:iconValue="drawerProps.row.icon" />
        </el-form-item>
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="drawerProps.row.path" placeholder="请填写菜单路径"></el-input>
        </el-form-item>
        <el-form-item label="子组件路径" prop="component">
          <el-input v-model="drawerProps.row.component" placeholder="请填写子组件路径">
            <template #prepend>
              <el-button>src/views</el-button>
            </template>
            <template #append>
              <el-button>.vue</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="重定向地址" prop="redirect">
          <el-input v-model="drawerProps.row.redirect" placeholder="请填写默认跳转地址"></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏路由" prop="isHide">
          <el-switch v-model="drawerProps.row.isHide" inline-prompt active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="是否缓存页面" prop="isKeepAlive">
          <el-switch v-model="drawerProps.row.isKeepAlive" inline-prompt active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="是否外链" prop="isLink">
          <el-switch v-model="drawerProps.row.isLink" inline-prompt active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="RouterDrawer">
import { ref, reactive } from "vue";
import { client } from "@/utils/https/client";
import { ElMessage, FormInstance } from "element-plus";
import SelectIcon from "@/components/selectIcon/index.vue";

const rules = reactive({
  title: [{ required: true, message: "请填写菜单名称", trigger: 'blur' }],
  icon: [{ required: true, message: "请选择菜单图标", trigger: 'change' }],
  path: [{ required: true, message: "请填写菜单路径", trigger: 'blur' }],
  btnName: [{ required: true, message: "请填写按钮名称", trigger: 'blur' }],
});

interface Tree {
  label: string
  children?: Tree[]
}

interface DrawerProps {
  title: string;
  isView: boolean;
  treeList: Tree[];
  row: object | any;
  api?: string | any;
  getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: '',
  treeList: [],
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

const menuType: any = ref(1)

const changeType = (type: any) => {
  menuType.value = type
}

const defaultProps = {
  children: 'children',
  label: (data: any) => {
    return data.meta.title
  },
  value: 'id'
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid: any) => {
    if (!valid) return;
    try {
      const params: any = {}
      Object.keys(drawerProps.value.row).forEach((k: any) => {
        if (drawerProps.value.row[k] && drawerProps.value.row[k] !== '') {
          params[k] = drawerProps.value.row[k]
        }
      })
      let res: any = await client.post(drawerProps.value.api, params)
      ElMessage.success({ message: '操作成功！' });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
