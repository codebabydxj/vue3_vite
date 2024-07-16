<template>
  <div class="content-interface" :class="{ 'is-collapse': isCollapse }">
    <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts" name="MainContent">

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.content-interface {
  flex: 1 1 auto;
  width: calc(100% - 65px);
  display: flex;
  flex-direction: column;
}

.content-interface.is-collapse {
  width: calc(100% - 250px);
}
</style>
