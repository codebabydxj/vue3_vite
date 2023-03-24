<template>
  <div class="vite-main">
    <MenuBar :isCollapse="isCollapse" @isCurCollapseChange="isCurCollapseChange"></MenuBar>
    <Content class="el_content" :isCollapse="isCollapse">
      <template v-slot:content>
        <ComHeader>
          <template v-slot:tabs>
            <Tabs></Tabs>
          </template>
        </ComHeader>
        <router-view></router-view>
      </template>
    </Content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MenuBar from '@/components/menuBar/index.vue';
import Content from '@/components/mainContent/index.vue';
import ComHeader from '@/components/mainHeader/index.vue';
import Tabs from '@/components/headerTabs/index.vue';

export default defineComponent({
  components: {
    MenuBar,
    Content,
    ComHeader,
    Tabs,
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
