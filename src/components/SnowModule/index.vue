<template>
  <div class="snow-container">
    <!-- 雪花元素 -->
    <div v-for="(snowflake, index) in snowflakes" :key="index" :style="snowflake.style" class="snowflake">❄</div>
  </div>
</template>

<script setup lang="ts" name="SnowModule">
import { ref, onMounted, onUnmounted } from 'vue';

// 雪花数组
const snowflakes: any = ref([]);

// 创建雪花
const createSnowflake = () => {
  if (snowflakes.value.length >= 300) return;
  const snowflake = {
    style: {
      left: `${Math.random() * 100}%`, // 随机水平位置
      fontSize: `${Math.random() * 20 + 10}px`, // 随机大小（10px - 30px）
      animationDuration: `${Math.random() * 5 + 5}s`, // 随机动画时长（5s - 10s）
      animationDelay: `${Math.random() * 5}s`, // 随机动画延迟（0s - 5s）
    },
  };
  snowflakes.value.push(snowflake);

  // 雪花飘落后移除
  setTimeout(() => {
    snowflakes.value = snowflakes.value.filter((item: any) => item !== snowflake);
  }, parseFloat(snowflake.style.animationDuration) * 1000);
}

// 定时生成雪花
let interval: any = null;
onMounted(() => {
  interval = setInterval(createSnowflake, 100); // 每 100ms 生成一个雪花
});

// 组件卸载时清除定时器
onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.snow-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /* background: url(http://mms0.baidu.com/it/u=4004612276,3764837023&fm=253&app=138&f=JPEG?w=889&h=500) no-repeat; */
  /* background-size: 100% 100%; */
}
.snow-container::after {
  content: "";
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(http://mms0.baidu.com/it/u=4004612276,3764837023&fm=253&app=138&f=JPEG?w=889&h=500) no-repeat;
  background-size: cover;
  filter: blur(5px);
}

.snowflake {
  position: absolute;
  top: -5%;
  color: #fff;
  /* 雪花颜色 */
  user-select: none;
  /* 禁止选中 */
  animation: fall linear infinite;
  z-index: 10;
}

@keyframes fall {
  to {
    transform: translateY(100vh);
    /* 雪花从顶部飘落到底部 */
  }
}
</style>