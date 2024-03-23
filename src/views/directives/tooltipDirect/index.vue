<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <div class="content-box">
          <div class="text">文字提示说明 🍇🍇🍇🍓🍓🍓</div>
          <div class="box-content">
            <div v-tooltip="{ message: 'hello, 我是说明, 我在左边', effect: 'dark' }">我有一个说明文字（默认在左边）</div>
            <div v-tooltip="{ message: 'hello, 我是说明, 我在右边', position: 'right', placement: 'right' }">我有一个说明文字在右边</div>
          </div>
        </div>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="TooltipDirect">

</script>

<style scoped lang="scss">

</style>
