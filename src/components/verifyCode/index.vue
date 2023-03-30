<template>
  <Vcode :show="isShow" @success="onSuccess" @close="onClose" :canvasWidth="410" :canvasHeight="200"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Vcode from "vue3-puzzle-vcode";

const props = defineProps(['isShowCode'])
const emit = defineEmits(['verifyCb'])

const isShow = ref(props.isShowCode);

const onClose = () => {
  isShow.value = false;
};

const onSuccess = () => {
  emit('verifyCb')
};
</script>