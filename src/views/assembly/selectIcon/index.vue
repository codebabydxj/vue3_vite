<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <div class="content-box">
          <span class="text">图标选择器 🍓🍇🍈🍉</span>
          <SelectIcon v-model:iconValue="iconValue" />
          <el-descriptions style="margin-top: 15px;" title="配置项 📚" :column="1" border>
            <el-descriptions-item label="iconValue"> 双向绑定的icon值，使用示例：v-model:iconValue="iconValue" </el-descriptions-item>
            <el-descriptions-item label="title"> 弹窗标题 </el-descriptions-item>
            <el-descriptions-item label="clearable"> 是否可清空，默认为 true </el-descriptions-item>
            <el-descriptions-item label="placeholder"> 输入框占位文本 </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="SelectIcon">
import { ref } from "vue";
import SelectIcon from "@/components/selectIcon/index.vue";
const iconValue = ref('');

</script>

<style scoped lang="scss">
.content-box {
  display: flex;
  flex-direction: column;
  .text {
    margin: 20px 0 30px;
    font-size: 23px;
    font-weight: bold;
    text-align: center;
    color: var(--el-text-color-regular);
  }
}
</style>
