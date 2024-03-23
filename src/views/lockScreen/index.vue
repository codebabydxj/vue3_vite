<template>
  <div class="user-sel fullLock">
    <div class="unlock">
      <el-icon size="22" color="#ffffff"><Lock/></el-icon>
      <span @click="showLock = true">点击解锁</span>
    </div>
    <div class="lock-box"><span class="ap">{{ ap }}</span><span class="enter-time">{{ hour }}</span></div>
    <div class="lock-box"><span class="enter-time">{{ minute }}</span></div>
    <div class="foot">
      <div class="cur-time enter-form" v-show="showLock">
        <span>{{ hour }}:{{ minute }}</span><span class="zone">{{ ap }}</span>
      </div>
      <div class="enter-date">
        <span>{{ `${year}/${month}/${day}` }}</span>
        <span>{{ week }}</span>
      </div>
    </div>
    <transition name="fade-slide">
      <div class="entry" v-show="showLock">
        <div class="entry-content">
          <div class="tp enter-form">
            <el-avatar class="avatar" icon="el-icon-user-solid" :size="70"
              src="/src/assets/imgs/avatar.gif" fit="fill"></el-avatar>
            <p>{{ userName }}</p>
          </div>
          <span class="mid enter-form">
            <el-input
              type="password"
              autocomplete="off"
              placeholder="请填写锁屏密码"
              show-password
              v-model="unLockPass"
              @submit.native.prevent
              @keyup.enter.native="goSys" />
          </span>
          <div class="bot enter-form">
            <el-link type="primary" :underline="false" @click="goBack">返回</el-link>
            <el-link type="primary" :underline="false" @click="logout">返回登录</el-link>
            <el-link type="primary" :underline="false" @click="goSys">进入系统</el-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts" name="LockScreen">
import  { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";
import { md5 } from 'js-md5';
import { globalStore } from "@/store";
import { client } from "@/utils/https/client";
import * as API from "@/config/api";
import { useTime } from "@/hooks/useTime";
import { getTimeState } from "@/utils/tools";
import { ElMessage } from "element-plus";

const router = useRouter()
const globalRouter: any = inject('globalRouter')
const myStore: any = globalStore()
const themeConfig = computed(() => myStore.themeConfig)
const userName: any = computed(() => myStore.userInfo.userInfo ? myStore.userInfo.userInfo.userName : '')

const { year, month, day, hour, minute, week } = useTime(true)
const ap: any = getTimeState(true)
const showLock = ref(false)
const unLockPass: any = ref('')

const goBack = () => {
  showLock.value = false
  unLockPass.value = ''
}
const logout = () => {
  client.post(API.loginOut)
  .then(async () => {
    // 1.清除store、token存储
    myStore.logout()
    // 2.重定向登录页
    await router.replace('/login');
  }).catch(() => {
  }).finally(() => {
  });
}

const goSys = () => {
  if (!unLockPass.value) {
    ElMessage.warning('干嘛！！想越狱？？')
    return
  }
  if (md5(unLockPass.value) !== myStore.lockScreen.lockScreenCode) {
    ElMessage.warning('锁屏密码错误')
    return
  }
  globalRouter.openView(myStore.lockScreen.unLockBackRoute)
  myStore.setThemeConfig({ ...themeConfig.value, isLockScreen: false })
  myStore.setLockPassword({ lockScreenCode: '', unLockBackRoute: '' })
}
</script>

<style scoped lang="scss">
.fullLock {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  height: 0;
  opacity: 0.5;
  animation: enter-full-animation 0.3s ease-in-out 0.2s;
  animation-fill-mode: forwards;
  background: #000000;
  color: #ffffff;
  overflow: hidden;
  position: relative;
  .unlock {
    position: absolute;
    left: 0;
    top: 20px;
    width: 100%;
    line-height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
  }
  .lock-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 80%;
    background-color: rgb(20, 19, 19);
    border-radius: 30px;
    color: rgb(186, 186, 186);
    font-weight: 700;
    position: relative;
  }
  .lock-box::after {
    content: "";
    width: 100%;
    height: 12px;
    background: #000000;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .ap {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 18px;
  }
  .foot {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 20px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 22px;
    span {
      margin-right: 10px;
    }
  }
  .cur-time {
    font-size: 42px;
    margin-bottom: 35px;
    .zone {
      font-size: 24px;
    }
  }
}

@media screen and (min-width: 576px) {
  .lock-box {
    font-size: 90px;
  }
}

@media screen and (min-width: 768px) {
  .lock-box {
    font-size: 160px;
  }
}

@media screen and (min-width: 992px) {
  .lock-box {
    font-size: 220px;
  }
}

@media screen and (min-width: 1200px) {
  .lock-box {
    font-size: 260px;
  }
}

@media screen and (min-width: 1600px) {
  .lock-box {
    font-size: 320px;
  }
}

.entry {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  justify-content: center;
  align-items: center;
  .entry-content {
    width: 260px;
    .tp {
      text-align: center;
      animation-delay: 0.1s;
      p {
        margin: 5px auto 12px;
        font-weight: 500;
        color: rgb(186, 186, 186);
      }
    }
    .mid {
      position: relative;
      width: 100%;
      min-width: 0px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      line-height: 1.5715;
      background-image: none;
      display: inline-flex;
      border-width: 1px;
      border-color: rgb(217, 217, 217);
      border-image: initial;
      border-radius: 2px;
      transition: all 0.3s ease 0s;
      animation-delay: 0.2s;
    }
    .bot {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      animation-delay: 0.3s;
      .el-link {
        margin-right: 0px;
        color: rgb(9, 96, 189);
      }
      .el-link:hover {
        color: var(--color-text);
      }
    }
  }
}
.enter-date {
  transform: translateX(50px);
  opacity: 0;
  animation: enter-x-animation 0.8s ease-in-out 0.3s;
  animation-fill-mode: forwards;
  animation-delay: 0.2s;
}

.enter-form {
  transform: translateX(50px);
  opacity: 0;
  animation: enter-x-animation 0.4s ease-in-out 0.3s;
  animation-fill-mode: forwards;
  animation-delay: 0.2s;
}

.enter-time {
  transform: scale(0);
  animation: enter-t-animation 0.8s ease-in-out 0.3s;
  animation-fill-mode: forwards;
  animation-delay: 0.2s;
}

@keyframes enter-full-animation {
  to {
    opacity: 1;
    height: 100vh;
  }
}
@keyframes enter-x-animation {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes enter-t-animation {
  to {
    transform: scale(1);
  }
}
</style>