<template>
  <div class="vite-main">
    <menu-bar :isCollapse="isCollapse" @isCurCollapseChange="isCurCollapseChange"></menu-bar>
    <content class="el_content" :isCollapse="isCollapse" v-slot:content>
      <com-header v-slot:tabs>
        <tabs></tabs>
      </com-header>
      <router-view></router-view>
    </content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import menuBar from '@/components/menu-bar.vue';
import content from '@/components/content.vue';
import comHeader from '@/components/header.vue';
import tabs from '@/components/tabs.vue';

export default defineComponent({
  components: {
    menuBar,
    content,
    comHeader,
    tabs,
  },
  setup() {
    const isCollapse: any = ref(true);

    const isCurCollapseChange = (bool: any) => {
      isCollapse.value = bool;
    }

    return {
      isCollapse,
      isCurCollapseChange,
    }
  }
})
</script>

<style scoped lang="scss">
.vite-main {
  display: flex;
  height: 100%;

  .el_content {
    height: 100%;
    overflow: auto;
  }
}
</style>
<style lang="scss">
/** 全局基本样式 */
.small-input-width {
  width: 150px !important;
}

.middle-input-width {
  width: 180px !important;
}

.large-input-width {
  width: 220px !important;
}

.date-picker-width {
  width: 230px !important;
}
</style>
