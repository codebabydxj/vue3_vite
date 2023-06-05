<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <SwitchDark class="dark" />
      <template v-if="!themeConfig.isDark">
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
            label-width="0px"
            class="ruleForm"
            @keyup.enter.native="submitForm(ruleFormRef)"
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
                show-password
                :prefix-icon="Lock"
                v-model="ruleForm.password"
              />
            </el-form-item>
          </el-form>
          <div class="login-btn">
            <el-button class="btn" round :icon="CircleClose" @click="resetForm">重 置</el-button>
            <el-button class="btn" round type="primary" :icon="User" :loading="loading" @click="submitForm(ruleFormRef)">登 录</el-button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="login-main">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            label-width="0px"
            class="ruleForm"
            @keyup.enter.native="submitForm(ruleFormRef)"
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
                show-password
                :prefix-icon="Lock"
                v-model="ruleForm.password"
              />
            </el-form-item>
          </el-form>
          <div class="login-btn">
            <el-button class="btn" round :icon="CircleClose" @click="resetForm">重 置</el-button>
            <el-button class="btn" round type="primary" :icon="User" :loading="loading" @click="submitForm(ruleFormRef)">登 录</el-button>
          </div>
        </div>
      </template>
    </div>
  </div>
  <!-- 滑块验证码 -->
  <verify-code v-if="isShowCode" :isShowCode="isShowCode" @verifyCb="handleVerifyCb"></verify-code>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { client } from '@/utils/https/client';
import * as API from '@/config/api';
import { useRouter } from 'vue-router';
import md5 from 'js-md5';
import { getTimeState } from '@/utils/tools';
import { globalStore } from '@/store';
import { useKeepAliveStore } from "@/store/keepAlive";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { User, Lock, CircleClose } from '@element-plus/icons-vue';
import { ElForm, ElNotification } from 'element-plus';
import verifyCode from '@/components/verifyCode/index.vue';
import SwitchDark from "@/components/ThemeDark/index.vue";

type FormInstance = InstanceType<typeof ElForm>
const myStore: any = globalStore()
const themeConfig = computed(() => myStore.themeConfig)
const keepAliveStore = useKeepAliveStore()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
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
  formEl.validate(async (valid: any) => {
    if (valid) {
      loading.value = true
      const params = { ...ruleForm, password: md5(ruleForm.password) }
      client.post(API.login, params, API.loadingConfig)
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
// 验证成功之后的回调处理
const handleVerifyCb = () => {
  isShowCode.value = false // 隐藏模态框
}
</script>

<style scoped lang="scss">
.login-container {
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

    .login-main {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 500px;
      box-sizing: border-box;
      border-radius: 50%;
      background: transparent;
      box-shadow: inset 15px 10px 40px rgba(158, 158, 158, 0.303), 10px 10px 20px rgba(117, 117, 117, 0.3), 15px 15px 30px rgba(72, 70, 70, 0.193), inset -10px -10px 20px rgba(233, 229, 229, 0.873);
      animation: move 6s linear infinite;
      :deep(.ruleForm) {
        width: 60%;
        margin: 150px auto 0;
      }

      .login-btn {
        display: flex;
        justify-content: space-between;
        width: 60%;
        margin: 0 auto;
        white-space: nowrap;
        .btn {
          width: 120px;
          height: 30px;
        }
      }
    }

    .login-main::after {
      position: absolute;
      content: "";
      width: 40px;
      height: 40px;
      background: rgba(254, 254, 254, 0.667);
      left: 80px;
      top: 80px;
      border-radius: 50%;
      animation: move2 6s linear infinite;
      filter:blur(1px);
    }

    .login-main::before {
      position: absolute;
      content: "";
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.5);
      left: 130px;
      top: 70px;
      border-radius: 50%;
      animation: move3 6s linear infinite;
      filter:blur(1px);
    }
    @keyframes move {
      50% {
          border-radius: 42% 58% 49% 51% / 52% 36% 64% 48% ;
      }
      75% {
          border-radius: 52% 48% 49% 51% / 43% 49% 51% 57%  ;
      }
      25% {
          border-radius: 52% 48% 59% 41% / 43% 49% 51% 57%  ;
      }
    }

    @keyframes move2 {
      25% {
          left: 80px;
          top: 110px;
      }
      50% {
          left: 50px;
          top: 80px;
      }
      75% {
          left: 80px;
          top: 120px;
      }
    }

    @keyframes move3 {
      25% {
          left: 100px;
          top: 90px;
      }
      50% {
          left: 110px;
          top: 75px;
      }
      75% {
          left: 130px;
          top: 100px;
      }
    }
  }
}

@media screen and (max-width: 1250px) {
  .login-left {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .login-form {
    width: 97% !important;
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