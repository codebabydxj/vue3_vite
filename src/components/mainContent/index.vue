<template>
  <div class="content-interface" :class="{ 'is-collapse': isCollapse }">
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.content-interface {
  flex: 1 1 auto;
  width: calc(100% - 64px);
  display: flex;
  flex-direction: column;
}

.content-interface.is-collapse {
  width: calc(100% - 200px);
}
</style>
