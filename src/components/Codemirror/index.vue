<template>
  <Codemirror
    ref="cmRef"
    v-model:value="code"
    :width="width"
    :height="height"
    :border="border"
    :options="cmOptions"
    @change="onChange"
    @input="onInput"
    @ready="onReady"
  />
</template>

<script setup lang="ts">
import "codemirror/theme/material-darker.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/mode/javascript/javascript.js";

import Codemirror from "codemirror-editor-vue3";
import type { CmComponentRef } from "codemirror-editor-vue3";
import type { Editor, EditorConfiguration } from "codemirror";
import { ref, reactive, computed, watch, nextTick, onUnmounted } from "vue";
import { useGlobalStore } from "@/store";

const props = defineProps({
  width: {
    type: String,
    default: 'calc(100% - 2px)',
  },
  height: {
    type: String,
    default: '400px',
  },
  border: {
    type: Boolean,
    default: true
  }
});
const myStore: any = useGlobalStore()
const isDark = computed(() => myStore.themeConfig.isDark)
const cmRef = ref<CmComponentRef>();
const cmOptions: EditorConfiguration = reactive({
  mode: "text/javascript",
  theme: isDark.value ? "material-darker" : "default",
  tabSize: 4,
  readOnly: false,
  autofocus: true,
  autoRefresh: true,
  lineNumbers: true,
  lineWiseCopyCut: true,
  gutters: ["CodeMirror-lint-markers"],
  lint: true,
  extraKeys: {
    Ctrl: "autocomplete",
    Tab: "autocomplete"
  },
  hintOptions: {
    completeSingle: false
  }
});

const code = ref(`function sayHello() {
    console.log("Hello, World!");
}

sayHello();`);

const onChange = (val: string, cm: Editor) => {
  console.log(val);
  console.log(cm.getValue());
};

const onInput = (val: string) => {
  console.log(val);
};

const onReady = (cm: Editor) => {
  cm.on("keypress", () => cm.showHint());
  // console.log(cm.getValue());
  // console.log(cm.focus());
};

watch(() => isDark.value, async (newVal: any) => {
  await nextTick();
  newVal
    ? cmOptions.theme = "material-darker"
    : cmOptions.theme = "default"
});

onUnmounted(() => {
  cmRef.value?.destroy();
});
</script>

<style lang="scss" scoped>
.codemirror-container.bordered {
  border: 1px solid rgb(5 5 5/6%);
}
</style>