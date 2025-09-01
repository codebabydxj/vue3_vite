<template>
  <flex-card>
    <div class="base-warp">
      <el-scrollbar>
        <div class="content-box" style="position: relative;">
          <SnowModule />
          <div style="position: absolute; left: 0; top: 0; padding: 20px;">
            <Basic />
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
</style>
