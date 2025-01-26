<template>
  <flex-card>
    <div class="base-warp">
      <div class="content-box">
        <TreeFilter
          title="树形连接线"
          multiple
          label="name"
          :request="{ url: '/api/user/department', method: 'get' }"
          :defaultValue="treeFilterValue1.departmentId"
          :treeWidth="'100%'"
          :isTreeLine="true"
          @change="changeTreeFilter1"
        />
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="TreeLine">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import TreeFilter from "@/components/TreeFilter/index.vue";

const treeFilterValue = ref({ departmentId: "1" });
const changeTreeFilter = (val: string) => {
	ElMessage.success(`你选择了 id 为 ${val} 的数据🤔`);
	treeFilterValue.value.departmentId = val;
};

const treeFilterValue1: any = ref({ departmentId: [] });
const changeTreeFilter1 = (val: string[]) => {
	ElMessage.success(`你选择了 id 为 ${JSON.stringify(val)} 的数据🤔`);
	treeFilterValue1.value.departmentId = val;
};
</script>

<style scoped lang="scss">

</style>
