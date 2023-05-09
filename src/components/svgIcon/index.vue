<template>
  <svg class="svg-icon" :style="iconStyle" aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts" name="SvgIconChild">
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#444',
  },
  iconStyle: {
    type: Object,
    default: () => ({ width: "16px", height: "16px" })
  },
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  overflow: inherit;
}
</style>
