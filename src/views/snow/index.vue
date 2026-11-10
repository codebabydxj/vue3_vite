<template>
  <flex-card>
    <div class="base-warp">
      <el-scrollbar>
        <div class="content-box" style="position: relative;">
          <!-- <SnowModule />
          <div style="position: absolute; left: 0; top: 0; padding: 20px;">
            <Basic />
          </div> -->
          <div class="slider">
            <h1>VITEADMIN</h1>
            <h3>欢迎使用</h3>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </flex-card>
  </template>

<script setup lang="ts" name="Snow">
import SnowModule from "@/components/SnowModule/index.vue"
import Basic from "@/views/basic/index.vue"

</script>

<style scoped lang="scss">
.slider {
  width: 100%;
  height: calc(100vh - 128px);
  background: #000000;
  overflow: hidden;
  color: #ffffff;

  h1 {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10vw;
    color: transparent;
    background: url(https://gips0.baidu.com/it/u=1554219608,1296206870&fm=3074&app=3074&f=PNG?w=2560&h=1440) no-repeat center;
    background-clip: text;
    background-size: cover;
    animation: scale 2.5s forwards;
  }

  @keyframes scale {
    0% {
      font-size: 100vw;
      color: transparent;
    }
    100% {
      font-size: 10vw;
      color: #ffffff;
      transform: translateY(-200px) scale(0.7);
    }
  }

  h3 {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5vw;
    color: transparent;
    opacity: 0;
    filter:alpha(opacity=0);
    letter-spacing: 10px;
    background: linear-gradient(90deg, #00f5d4, #00bbf9, #5e60ce);
    -webkit-background-clip: text;
    background-clip: text;
    text-shadow: 0 0 0.1875rem rgba(0, 0, 0, 0.3);
    transform: translateY(-350px);
    animation: opacity 3s forwards 2s;
  }

  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
