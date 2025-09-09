<template>
  <flex-card>
    <div class="base-warp">
      <el-scrollbar>
        <div class="over-card mb10">
          <h4 class="title">基本信息</h4>
          <div class="user-info">
            <div class="user-photo">
              <UploadImg v-model:image-url="photo" border-radius="50%" height="100px" width="100px" disabled></UploadImg>
            </div>
            <div class="user-detail">
              <div class="user-row" v-for="item in userData">
                <span>{{ item.label }}：</span>
                <span v-if="item.key === 'sex'">{{ item.value == 1 ? '男' : '女' }}</span>
                <span v-else-if="item.key === 'state'">{{ item.value == 1 ? '启用' : '禁用' }}</span>
                <span v-else>{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="over-card mb10">
          <h4 class="title">安全设置</h4>
          <el-form ref="userFormRef" :model="formParams" label-suffix=" :" :rules="rules" label-width="100px" :style="{ width: '600px' }">
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input v-model="formParams.oldPassword" placeholder="请填写旧密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input v-model="formParams.password" placeholder="请填写新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repeatPassword">
              <el-input v-model="formParams.repeatPassword" placeholder="请再次确认新密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">提 交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="Userinfo">
import { ref } from "vue";
import { FormInstance } from "element-plus";
import { useGlobalStore } from "@/store";
import UploadImg from "@/components/uploadImg/img.vue";

const myStore: any = useGlobalStore()
const photo: any = ref('/src/assets/imgs/avatar.png')
const userFormRef = ref<FormInstance>();
const formParams: any = ref({
  oldPassword: '',
  password: '',
  repeatPassword: '',
});
const rules = ref({
  oldPassword: [{ required: true, message: '请填写', trigger: ['change', 'blur'] }],
  password: [{ required: true, message: '请填写', trigger: ['change', 'blur'] }],
  repeatPassword: [{ required: true, message: '请填写', trigger: ['change', 'blur'] }],
  phone: [{ required: true, message: '请填写', trigger: ['change', 'blur'] }],
})
const userData: any = ref([
  {
    key: 'userName',
    label: '用户名',
    value: myStore?.userInfo?.userInfo?.userName ?? '-'
  },
  {
    key: 'nickname',
    label: '用户昵称',
    value: myStore?.userInfo?.userInfo?.nickname ?? '-'
  },
  {
    key: 'sex',
    label: '性别',
    value: myStore?.userInfo?.userInfo?.sex ?? '-'
  },
  {
    key: 'phone',
    label: '电话',
    value: myStore?.userInfo?.userInfo?.phone ?? '-'
  },
  {
    key: 'email',
    label: '邮箱',
    value: myStore?.userInfo?.userInfo?.email ?? '-'
  },
  {
    key: 'state',
    label: '状态',
    value: myStore?.userInfo?.userInfo?.state ?? '-'
  },
  {
    key: 'roles',
    label: '角色',
    value: myStore?.userInfo?.userInfo?.roles ?? '-'
  },
  {
    key: 'deptName',
    label: '部门',
    value: myStore?.userInfo?.userInfo?.deptName ?? '-'
  },
  {
    key: 'address',
    label: '地址',
    value: myStore?.userInfo?.userInfo?.address ?? '-'
  },
  {
    key: 'remark',
    label: '简介',
    value: myStore?.userInfo?.userInfo?.remark ?? '-'
  },
])


const submit = async () => {
  userFormRef.value!.validate(async (valid: any) => {
    if (!valid) return;
    try {
      
    } catch (error) {

    }
  })
}
</script>

<style scoped lang="scss">
.title {
  margin: 0 0 15px;
  font-size: 17px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}
.user-info {
  display: flex;
  gap: 20px;

  .user-photo {
    width: 150px;
  }

  .user-detail {
    flex: 1;
    display: grid;
    grid-template-rows: repeat(4, 25%);
    grid-template-columns: repeat(4, 25%);
    row-gap: 10px;
    column-gap: 5px;
    width: calc(100% - 150px);

    .user-row {
      display: flex;
      column-gap: 15px;

      span:first-child {
        color: var(--color-text-1);
        width: 80px;
      }
      span:last-child {
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>