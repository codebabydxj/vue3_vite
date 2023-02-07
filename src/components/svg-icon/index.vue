<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" :fill="color" :width="width" :height="height" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
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
    width: {
      type: String,
      default: '16',
    },
    height: {
      type: String,
      default: '16',
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    return { symbolId }
  },
})
</script>

<style lang="scss" scoped>
.svg-icon {
  overflow: inherit;
}
</style>
