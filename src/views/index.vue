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

<script setup lang="ts">
import { ref } from 'vue';
import MenuBar from '@/components/menuBar/index.vue';
import Content from '@/components/mainContent/index.vue';
import ComHeader from '@/components/mainHeader/index.vue';
import Tabs from '@/components/headerTabs/index.vue';

const isCollapse: any = ref(true);

const isCurCollapseChange = (bool: any) => {
  isCollapse.value = bool;
}
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
