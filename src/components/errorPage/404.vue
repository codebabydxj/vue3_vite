<template>
  <flex-card>
    <div class="base-warp">
      <div class="error">
        <Transition name="slide-icon">
          <svg-icon v-if="show" name="404" :iconStyle="{ width: '252px', height: '294px'}" />
        </Transition>
        <div class="ml-12">
          <Transition :duration="800" name="slide-num">
            <p v-if="show" class="font-medium text-4xl">404</p>
          </Transition>
          <Transition :duration="1200" name="slide-msg">
            <p v-if="show" class="text-msg">抱歉，你访问的页面不存在 🤷‍♂️🤷‍♀️</p>
          </Transition>
          <Transition :duration="1400" name="slide-btn">
            <el-button v-if="show" type="primary" @click="goBack">返回首页</el-button>
          </Transition>
        </div>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="Page404">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const show = ref(false)

onMounted(() => {
  show.value = true
})
const goBack = () => {
  router.push('/');
}
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>