<template>
  <flex-card>
    <div class="base-warp">
      <div class="error">
        <Transition name="slide-icon">
          <svg-icon v-if="show" name="500" :iconStyle="{ width: '252px', height: '294px'}" />
        </Transition>
        <div class="ml-12">
          <Transition :duration="800" name="slide-num">
            <p v-if="show" class="font-medium text-4xl">500</p>
          </Transition>
          <Transition :duration="1200" name="slide-msg">
            <p v-if="show" class="text-msg">抱歉，服务器出错了</p>
          </Transition>
          <Transition :duration="1400" name="slide-btn">
            <el-button v-if="show" type="primary" @click="goBack">返回首页</el-button>
          </Transition>
        </div>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="page500">
import { ref, onMounted } from "vue";
import routers from '@/routers'

const show = ref(false)

onMounted(() => {
  show.value = true
})
const goBack = async () => {
  await routers.replace('/');
  window.location.reload();
}
</script>

<style scoped lang="scss">
.error {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;

  .ml-12 {
    margin-left: 24px;
    .font-medium {
      font-weight: bold;
      font-size: 30px;
      line-height: 70px;
      margin-top: 50px;
    }

    .text-msg {
      color: #999999;
      font-size: 16px;
      margin-bottom: 16px;
    }
  }
}

.slide-icon-enter-active {
  transition: all 0.5s cubic-bezier(1, 0.6, 0.8, 1);
}

.slide-icon-enter-from,
.slide-icon-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-num-enter-active {
  transition: all 0.5s cubic-bezier(.62, -0.14, .62, 1.7);
  transition-delay: 0.3s;
}

.slide-num-enter-from,
.slide-num-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.slide-msg-enter-active {
  transition: all 0.3s cubic-bezier(.62, -0.14, .62, 1.7);
  transition-delay: 0.7s;
}

.slide-msg-enter-from,
.slide-msg-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

.slide-btn-enter-active {
  transition: all 0.3s cubic-bezier(.62, -0.14, .62, 1.7);
  transition-delay: 1s;
}

.slide-btn-enter-from,
.slide-btn-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>