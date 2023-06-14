<template>
	<el-dialog v-model="dialogVisible" title="权限按钮配置" :destroy-on-close="true" width="580px" draggable>
		<el-form ref="authRef" :rules="rules" label-suffix="：" :model="dialogProps.row" label-width="100px">
      <el-form-item label="按钮名称" prop="btnName">
        <el-input v-model="dialogProps.row.btnName" placeholder="请填写按钮名称"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentId">
        <el-tree-select
          style="width: 100%;"
          v-model="dialogProps.row.parentId"
          :data="dialogProps.treeList"
          check-strictly
          placeholder="请选择上级菜单"
          :render-after-expand="false"
          :props="defaultProps"/>
      </el-form-item>
      <el-form-item label="授权标识" prop="authFlag">
        <el-input v-model="dialogProps.row.authFlag" placeholder="请填写授权标识"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="dialogProps.row.status">
          <el-radio :label="0">无效</el-radio>
          <el-radio :label="1">有效</el-radio>
        </el-radio-group>
      </el-form-item>
		</el-form>
		<template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
	</el-dialog>
</template>

<script setup lang="ts" name="UploadExcel">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";

const rules = reactive({
  btnName: [{ required: true, message: "请填写按钮名称", trigger: 'blur' }],
});

interface Tree {
  label: string
  children?: Tree[]
}

interface DrawerProps {
  treeList: Tree[];
  row: object | any;
  api?: string | any;
  getTableList?: () => void;
}

const dialogVisible = ref(false);
const dialogProps = ref<DrawerProps>({
  treeList: [],
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  dialogProps.value = params;
  dialogVisible.value = true;
};

const defaultProps = {
  children: 'children',
  label: (data: any) => {
    return data.meta.title
  },
  value: 'id'
}

const ruleFormRef = ref<FormInstance>();
const submit = () => {
  ruleFormRef.value!.validate(async (valid: any) => {
    if (!valid) return;
  })
}

defineExpose({
	acceptParams
});
</script>

<style lang="scss" scoped>
.upload {
	width: 80%;
}
</style>
