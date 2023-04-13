<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <SwitchDark class="dark" />
      <div class="login-left">
        <img src="../../assets/imgs/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img src="../../assets/imgs/logo.png" alt="" />
          <h2 class="logo-text" data-v-a2265173="">Vite-Admin</h2>
        </div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          label-width="0px"
          class="ruleForm"
        >
          <el-form-item
            label=""
            prop="userName"
            :rules="[
              { required: true, message: '请输入用户名', trigger: 'blur' },
            ]"
          >
            <el-input
              type="text"
              autocomplete="off"
              placeholder="用户名：admin / user"
              :prefix-icon="User"
              v-model.trim="ruleForm.userName"
            />
          </el-form-item>
          <el-form-item
            label=""
            prop="password"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' },
            ]"
          >
            <el-input
              type="password"
              autocomplete="off"
              placeholder="密码：123456"
              :prefix-icon="Lock"
              v-model="ruleForm.password"
            />
          </el-form-item>
        </el-form>
        <div class="login-btn">
          <el-button class="btn" round :icon="CircleClose" @click="resetForm"
            >重 置</el-button
          >
          <el-button
            class="btn"
            round
            type="primary"
            :icon="User"
            :loading="loading"
            @click="submitForm(ruleFormRef)"
            >登 录</el-button
          >
        </div>
      </div>
    </div>
  </div>
  <verify-code v-if="isShowCode" :isShowCode="isShowCode" @verifyCb="handleVerifyCb"></verify-code>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { client } from '@/utils/https/client';
import * as API from '@/config/api';
import routers from '@/routers';
import md5 from 'js-md5';
import _localStorage from '@/utils/storage/localStorage';
import { getTimeState } from '@/utils/tools';
import { globalStore } from '@/store'
import { User, Lock, CircleClose } from '@element-plus/icons-vue';
import { ElForm, ElNotification } from 'element-plus';
import verifyCode from '@/components/verifyCode/index.vue';
import SwitchDark from "@/components/ThemeDark/index.vue";

export default defineComponent({
  components: {
    verifyCode,
    SwitchDark
  },
  setup() {
    type FormInstance = InstanceType<typeof ElForm>
    const myStore: any = globalStore()
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
      userName: '',
      password: '',
    });
    const loading = ref(false)
    const isShowCode = ref(false) // 是否显示滑块验证码，看自己逻辑需求处理

    const resetForm = () => {
      ruleForm.userName = ''
      ruleForm.password = ''
    };
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          loading.value = true
          const params = { ...ruleForm, password: md5(ruleForm.password) };
          client.post(API.login, params)
          .then((res: any) => {
            _localStorage.set('TOKEN', res.data.token) // 这里存token 根据接口返回自行处理
            myStore.setUserInfo(res.data) // 登录完成保存用户信息

            routers.replace('/');
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
    // 验证成功之后的回调处理
    const handleVerifyCb = () => {
      isShowCode.value = false // 隐藏模态框
    }
    return {
      ruleForm,
      User,
      Lock,
      CircleClose,
      ruleFormRef,
      loading,
      isShowCode,
      resetForm,
      submitForm,
      handleVerifyCb,
    };
  },
});
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  min-width: 550px;
  height: 100%;
  min-height: 500px;
  background-color: var(--el-color-info-light-9);
  background-image: url("../../assets/svg/login_bg.svg");
  background-position: 50%;
  background-size: 100% 100%;
  background-size: cover;
  .login-box {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 96%;
    height: 94%;
    padding: 0 50px;
    background-color: hsl(0deg 0% 100% / 80%);
    border-radius: 10px;
    .dark {
			position: absolute;
			top: 13px;
			right: 18px;
		}
    .login-left {
      width: 800px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login-form {
      width: 420px;
      padding: 50px 40px 45px;
      border-radius: 10px;
      box-shadow: 2px 3px 7px #0003;
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
    }
  }
}
.flx-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<style lang="scss">
.ruleForm {
  .el-form-item {
    margin-bottom: 40px;
  }
  .el-input__wrapper {
    height: 40px;
  }
}
</style>