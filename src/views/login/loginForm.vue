<template>
  <div class="login-content" :class="{ 'login-dark': darkTheme }">
    <div class="login-logo">
      <img src="../../assets/imgs/logo.png" alt="" />
      <h2 class="logo-text" data-v-a2265173="">Vite-Admin</h2>
    </div>
    <el-form ref="ruleFormRef" :model="ruleForm" label-width="0px" class="loginForm"
      @submit.native.prevent @keyup.enter.native="submitForm(ruleFormRef)">
      <el-form-item label="" prop="userName" :rules="[
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ]">
        <el-input type="text" autocomplete="off" placeholder="用户名：admin / user" :prefix-icon="User"
          v-model.trim="ruleForm.userName" />
      </el-form-item>
      <el-form-item label="" prop="password" :rules="[
        { required: true, message: '请输入密码', trigger: 'blur' },
      ]">
        <el-input type="password" autocomplete="off" placeholder="密码：123456" show-password :prefix-icon="Lock"
          v-model="ruleForm.password" />
      </el-form-item>
    </el-form>
    <div class="login-btn">
      <el-button class="btn reset" round :icon="CircleClose" @click="resetForm">重 置</el-button>
      <el-button class="btn log" round type="primary" :icon="User" :loading="loading" @click="submitForm(ruleFormRef)">登 录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { client } from "@/utils/https/client";
import { login, loadingConfig } from "@/config/api";
import { useRouter } from 'vue-router';
import { md5 } from 'js-md5';
import { getTimeState } from '@/utils/tools';
import { useGlobalStore } from "@/store";
import { useKeepAliveStore } from "@/store/keepAlive";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { ElForm, ElNotification } from "element-plus";
import { User, Lock, CircleClose } from "@element-plus/icons-vue";

type FormInstance = InstanceType<typeof ElForm>
type Props = {
  darkTheme?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  darkTheme: false
})
const myStore: any = useGlobalStore()
const themeConfig = computed(() => myStore.themeConfig)
const keepAliveStore = useKeepAliveStore()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const ruleForm: any = ref({
  userName: '',
  password: '',
});

const loading = ref(false)

const resetForm = () => {
  ruleForm.value.userName = ''
  ruleForm.value.password = ''
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: any) => {
    if (valid) {
      loading.value = true
      const params: any = { ...ruleForm.value, password: md5(ruleForm.value.password) }
      client.post(login, params, loadingConfig)
      .then(async (res: any) => {
        // 1.登录完成保存用户信息
        myStore.setUserInfo(res.data) 

        // 2.添加动态路由
        await initDynamicRouter();
        
        // 3.清空 keepAlive 数据
        keepAliveStore.updateKeepAliveName()

        // 4.如果是锁屏状态，重置状态
        myStore.setThemeConfig({ ...themeConfig.value, isLockScreen: false })

        // 5.跳转到首页
        router.replace('/')

        ElNotification({
          title: getTimeState(),
          message: "欢迎登录 Vite-Admin",
          type: "success",
          duration: 3000
        });
      }).catch(() => {
      }).finally(() => {
        loading.value = false
      });
    }
  })
};
</script>

<style lang="scss" scoped>
.login-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 45px;
  img {
    width: 60px;
    height: 52px;
  }
  .logo-text {
    padding: 0 0 0 25px;
    margin: 0;
    font-size: 42px;
    font-weight: 700;
    color: #34495e;
    white-space: nowrap;
  }
}
.login-btn {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  white-space: nowrap;
  .btn {
    width: 185px;
    height: 40px;
  }
}

.login-dark {
  :deep(.loginForm) {
    width: 60%;
    margin: 0 auto;
  }
  .login-logo {
    margin-top: 80px;
    .logo-text {
      color: #CFD3DC;
      font-size: 32px;
    }
  }
  .login-btn {
    width: 60%;
    .btn {
      width: 120px;
      height: 30px;
    }
  }
}
</style>

<style lang="scss">
.loginForm {
  .el-form-item {
    margin-bottom: 40px;
  }
  .el-input__wrapper {
    height: 40px;
  }
}
</style>