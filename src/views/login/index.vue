<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <SwitchDark class="dark" />
      <template v-if="!themeConfig.isDark">
        <div class="login-left">
          <img src="../../assets/imgs/login_left.png" alt="login" />
        </div>
        <div class="login-form">
          <LoginForm :darkTheme="false" />
        </div>
      </template>
      <template v-else>
        <div class="login-main">
          <LoginForm :darkTheme="true" />
        </div>
      </template>
    </div>
  </div>
  <!-- 滑块验证码 -->
  <verify-code v-if="isShowCode" :isShowCode="isShowCode" @verifyCb="handleVerifyCb"></verify-code>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { globalStore } from '@/store';
import verifyCode from '@/components/verifyCode/index.vue';
import SwitchDark from "@/components/ThemeDark/index.vue";
import LoginForm from "./loginForm.vue";

const myStore: any = globalStore()
const themeConfig = computed(() => myStore.themeConfig)
const isShowCode = ref(false) // 是否显示滑块验证码，看自己逻辑需求处理

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
      box-shadow: inset 15px 10px 40px rgba(158, 158, 180, 0.303), 10px 10px 20px rgba(117, 117, 117, 0.3), 15px 15px 30px rgba(72, 70, 70, 0.193), inset -10px -10px 20px rgba(233, 229, 229, 0.873);
      animation: move 6s linear infinite;
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