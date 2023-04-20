<template>
  <el-drawer
    size="450px"
    title="表格列配置"
    :modelValue="dialogShow"
    :append-to-body="true"
    :before-close="cancel">
    <div class="table-main" v-if="dialogShow">
			<el-table :data="colSetting" :border="true" row-key="prop" default-expand-all :tree-props="{ children: '_children' }">
				<el-table-column prop="label" align="center" label="列名" />
				<el-table-column prop="isShow" align="center" label="显示">
          <template #default="{ row }">
            <el-switch v-model="row.isShow"></el-switch>
          </template>
				</el-table-column>
				<el-table-column prop="sortable" align="center" label="排序">
          <template #default="{ row }">
            <el-switch :disabled="!row.isShow" v-model="row.sortable"></el-switch>
          </template>
				</el-table-column>
				<template #empty>
					<div class="table-empty">
						<img src="@/assets/imgs/notData.png" alt="notData" />
						<div>暂无可配置列</div>
					</div>
				</template>
			</el-table>
		</div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ColumnProps } from '@/components/ProTable/interface'

const props = defineProps({
  colSetting: {
    type: Array,
    default: () => [] as ColumnProps[]
  },
  dialogShow: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['closeDialog'])

const cancel = () => {
  emit('closeDialog', false);
}
</script>
