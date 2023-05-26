<template>
	<el-dialog v-model="dialogVisible" title="锁屏操作" :before-close="cancel" :destroy-on-close="true" width="500px" draggable>
    <div class="info">
      <div>
        <el-avatar class="avatar" icon="el-icon-user-solid" :size="70"
          src="/src/assets/imgs/avatar.gif" fit="fill"></el-avatar>
      </div>
      <div>{{ userName }}</div>
    </div>
		<el-form ref="formRef" :model="paramsForm" label-width="100px" @submit.native.prevent  @keyup.enter.native="submitForm">
			<el-form-item label="锁屏密码 :" prop="lockPass" :rules="[{ required: true, message: '请填写锁屏密码', trigger: 'blur' }]">
				<el-input
          type="password"
          autocomplete="off"
          placeholder="请填写锁屏密码"
          show-password
          v-model="paramsForm.lockPass" />
			</el-form-item>
		</el-form>
		<template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </template>
	</el-dialog>
</template>

<script setup lang="ts" name="LockScreenDialog">
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import md5 from 'js-md5';
import { globalStore } from "@/store";
import { FormInstance } from "element-plus";

const router = useRouter()
const myStore: any = globalStore()
const themeConfig = computed(() => myStore.themeConfig)
const userName: any = computed(() => myStore.userInfo.userInfo ? myStore.userInfo.userInfo.userName : '')
// dialog状态
const dialogVisible = ref(false);
// 父组件传过来的参数
const parameter = ref<any>({});
// 接收父组件参数
const acceptParams = (params?: any): void => {
	parameter.value = params;
	dialogVisible.value = true;
};
const paramsForm = ref(<any>{
  lockPass: '',
})

const formRef = ref<FormInstance>();
const submitForm = () => {
  formRef.value!.validate(async (valid: any) => {
    if (!valid) return;
    try {
      myStore.setLockPassword({ lockScreenCode: md5(paramsForm.value.lockPass), unLockBackRoute: myStore.realRoute })
      myStore.setThemeConfig({ ...themeConfig.value, isLockScreen: true })
      dialogVisible.value = false;
      router.replace('/lockScreen');
    } catch(e) {
      console.log(e);
    }
  })
}

const cancel = () => {
  myStore.setLockPassword({ lockScreenCode: '', unLockBackRoute: '' })
  myStore.setThemeConfig({ ...themeConfig.value, isLockScreen: false })
  dialogVisible.value = false;
}

defineExpose({
	acceptParams
});
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  .avatar {
    cursor: pointer;
    background-color: transparent;
  }
}
</style>
