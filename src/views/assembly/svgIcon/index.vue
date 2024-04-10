<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <el-scrollbar>
          <div class="content-box">
            <el-alert
              title="SVG 图标目前使用 vite-plugin-svg-icons 插件完成，官方文档请查看 ：https://github.com/vbenjs/vite-plugin-svg-icons"
              type="warning"
              :closable="false"
            />
            <div class="icon-list">
              <svg-icon name="s1" :iconStyle="{ width: '100px', height: '100px'}" />
              <svg-icon name="s2" :iconStyle="{ width: '100px', height: '100px'}" />
              <svg-icon name="s3" :iconStyle="{ width: '100px', height: '100px'}" />
            </div>
            <el-descriptions title="配置项 📚" :column="1" border>
              <el-descriptions-item label="使用"> {{ '<svg-icon' }} name="svg命名" : :iconStyle="{ width: '100px', height: '100px'}" /> </el-descriptions-item>
              <el-descriptions-item label="name"> 图标的名称，svg 图标必须存储在 src/icons/svg 目录下 </el-descriptions-item>
              <el-descriptions-item label="prefix"> 图标的前缀，默认为 "icon" </el-descriptions-item>
              <el-descriptions-item label="iconStyle"> 图标的样式，默认样式为 { width: "16px", height: "16px" } </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="SvgIcon">

</script>

<style scoped lang="scss">
.icon-list {
  margin-top: 15px;
}
</style>
