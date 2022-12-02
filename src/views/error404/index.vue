<template>
  <div class="not-found">
    <img src="../../assets/404.gif" alt="页面找不到了...">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: '404'
});
</script>

<style scoped lang="scss">
.not-found {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>