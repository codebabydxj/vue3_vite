<template>
  <div class="login-container flx-center" :class="{ 'login-bg-new': themeConfig.isReplaceNewLoginPage, 'login-bg': !themeConfig.isReplaceNewLoginPage }">
    <SwitchDark class="dark" :fromToLogin="true" @emitSwitch="emitSwitch"/>
    <div class="login-box-new" :class="{ 'right-panel-active': active == 'signUp' }" v-if="themeConfig.isReplaceNewLoginPage">
      <div class="form-container sign-in-container">
        <div class="login-form-new">
          <div class="typewriter">  
            <p class="text">天生我材必有用，千金散尽还复来。</p>
          </div>
          <svg-icon name="smile" :iconStyle="{ width: '150px', height: '150px'}" />
        </div>
      </div>
      <div class="form-container sign-up-container">
        <div class="login-form-new">
          <LoginForm :darkTheme="false" />
        </div>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 class="h1">你好，朋友！
              <img class="logo" src="../../assets/svg/v.svg" alt="" />
            </h1>
            <p style="margin: 15px 0;">在今天和明天之间，有一段很长的时间，趁你还有精神的时候，学习迅速办事。</p>
            <el-button round style="background-color: transparent; color: #ffffff; border-color: #fff; font-size: 20px;" :icon="Right" @click="active = 'signIn'"></el-button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1 class="h1">欢迎回来！
              <img class="logo" src="../../assets/svg/v.svg" alt="" />
            </h1>
            <p style="margin: 15px 0;">要与我们保持联系，请使用您的个人信息登录</p>
            <el-button round style="background-color: transparent; color: #ffffff; border-color: #fff;" @click="active = 'signUp'">去登录</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="login-box" v-else>
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
import { Right } from "@element-plus/icons-vue";
import { useGlobalStore } from '@/store';
import verifyCode from '@/components/verifyCode/index.vue';
import SwitchDark from "@/components/ThemeDark/index.vue";
import LoginForm from "./loginForm.vue";

const myStore: any = useGlobalStore()
const themeConfig = computed(() => myStore.themeConfig)
const isShowCode = ref(false) // 是否显示滑块验证码，看自己逻辑需求处理
const active: any = ref('signIn')

const emitSwitch = () => {
  active.value = 'signIn'
}

// 验证成功之后的回调处理
const handleVerifyCb = () => {
  isShowCode.value = false // 隐藏模态框
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 550px;
  height: 100%;
  min-height: 500px;
  background-color: var(--el-color-info-light-9);
  background-position: 50%;
  background-size: 100% 100%;
  background-size: cover;
  position: relative;
  .dark {
    position: absolute;
    top: 30px;
    right: 50px;
  }
  .login-box {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 96%;
    height: 94%;
    padding: 0 50px;
    background-color: hsl(0deg 0% 100% / 80%);
    border-radius: 10px;
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
  .login-box-new {
    width: 768px;
    height: 480px;
    box-shadow: 0 14px 28px #00000040,0 10px 10px #00000038;
    background-color: #ffffff;
    border-radius: 10px;
    position: relative;
    .form-container {
      position: absolute;
      top: 0;
      height: 100%;
      transition: all 0.6s ease-in-out;
      .login-form-new {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        border-radius: 10px;
        height: 100%;
        :deep(.logo-text) {
          font-size: 32px !important;
        }
        :deep(.login-content) {
          width: 100%;
        }
        :deep(.loginForm) {
          padding: 0 25px;
          .el-form-item {
            margin-bottom: 25px;
          }
          .el-input__wrapper {
            height: 32px;
          }
        }
        :deep(.login-btn) {
          justify-content: center;
          .btn {
            width: 120px;
            height: 34px;
          }
        }
        :deep(.log) {
          background-color: #4d9078;
          border-color: #4d9078;
        }
        :deep(.log:hover) {
          background-color: #6b9c89;
        }
        :deep(.reset:hover) {
          background-color: #f2f3f5;
          color: #606266;
          border-color: #6b9c89;
        }
      }
    }
    .sign-in-container {
      left: 0;
      width: 50%;
      z-index: 2;
    }
    .sign-up-container {
      left: 0;
      width: 50%;
      opacity: 0;
      z-index: 1;
    } 
  }
  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .6s ease-in-out;
    animation: toggleRight .6s;
    border-radius: 0 10px 10px 0;
    z-index: 100;
  }
  .overlay {
    background: linear-gradient(to right, #326957, #4d9078);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }
  .overlay-panel {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 0 40px;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    .h1 {
      font-size: 34px;
      font-weight: bold;
      margin: 15px 0;
      line-height: 60px;
    }
    .logo {
      display: inline-flex;
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }
  .overlay-left {
    transform: translateX(-20%);
  }
  .right-panel-active .overlay-left {
    transform: translateX(0);
  }
  .overlay-right {
    right: 0;
    transform: translateX(0);
  }
  .right-panel-active .overlay-right {
    transform: translateX(20%);
  }
  .right-panel-active .sign-in-container {
    transform: translateX(100%);
  }
  .right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }
  .right-panel-active .overlay-container {
    animation: toggleLeft 0.6s;
    border-radius: 10px 0 0 10px;
    transform: translateX(-100%);
  }
  .right-panel-active .overlay {
    transform: translateX(50%);
  }
  .typewriter {
    width: 100%;
    height: 80px;
    position: relative;
  }  
  .text {  
    font-weight: 600;
    font-size: 16px;
    position: absolute;
    left: 50%;
    top: 50%;
    color: var(--html-bg-color);
    transform: translate(-50%, -50%);
    overflow: hidden;
    border-right: .15em solid orange;
    white-space: nowrap;
    letter-spacing: .15em;
    animation: typing 4s steps(40, end), blink-caret .5s step-end infinite; /* 模拟打字效果的动画 */
  }
  @keyframes typing {  
    from { width: 0 }  
    to { width: 18em } /* 根据文本长度和列高调整这个值 */  
  }
  @keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: orange; }
  }
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

@keyframes toggleRight {
  0%,
  49.99% {
    border-radius: 10px 0 0 10px;
  }
  50%,
  100% {
    border-radius: 0 10px 10px 0;
  }
}

@keyframes toggleLeft {
  0%,
  49.99% {
    border-radius: 0 10px 10px 0;
  }
  50%,
  100% {
    border-radius: 10px 0 0 10px;
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

.login-bg-new {
  background-image: url("../../assets/svg/bg.svg");
  background-position: unset;
}
.login-bg {
  background-image: url("../../assets/svg/login_bg.svg");
}
</style>