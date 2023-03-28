<template>
  <div class="table-main">
    <!-- 表格头部 操作按钮 -->
		<div class="table-header">
			<div class="header-button-lf">
				<slot name="tableHeader"></slot>
			</div>
		</div>
    <!-- 表格主体 -->
		<el-table
			ref="tableRef"
			v-bind="$attrs"
			:data="tableData"
			:border="border"
			:row-key="getRowKeys"
			@selection-change="selectionChange"
		>
      <!-- 表格无数据情况 -->
			<template #empty>
				<div class="table-empty">
					<slot name="empty">
						<img src="@/assets/imgs/notData.png" alt="notData" />
						<div>暂无数据</div>
					</slot>
				</div>
			</template>
    </el-table>
  </div>
</template>

<script setup lang="ts" name="ProTable">
import { ref, watch, computed, provide } from "vue";
const tableData = ref(<any>[])
const border = ref(<boolean>true)
const getRowKeys = ref(<string>'')
const selectionChange = () => {}
</script>


