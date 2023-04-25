<template>
	<div class="table-main">
		<!-- 搜索 查询表单 -->
		<div class="table-search" ref="searchRef">
			<slot name="tableSearch"></slot>
		</div>
		<!-- 表格头部 操作按钮 -->
		<div class="table-header" ref="headerRef">
			<div class="header-button-lf">
				<slot name="tableHeader" :selectedListIds="selectedListIds" :selectedList="selectedList" :isSelected="isSelected" />
			</div>
			<div class="header-button-ri" v-if="toolButton">
				<table-config ref="colRef" :colSetting="colSetting" @tableConfigCall="handleConfig">
				</table-config>
			</div>
		</div>
		<!-- 表格主体 -->
		<el-table
			ref="tableRef"
			v-bind="$attrs"
			:size="tableSize"
			:class="{ 'pro_no_table': !tableData.length }"
			:max-height="maxHeight"
			:data="tableData"
			:border="border"
			:row-key="rowKey"
			@selection-change="selectionChange">
			<!-- 默认插槽 -->
			<slot>我是默认插槽</slot>
			<template v-for="item in tableColumns" :key="item">
				<!-- selection || index -->
				<el-table-column
					v-bind="item"
					:align="item.align ?? 'center'"
					:reserve-selection="item.type == 'selection' && item.reserve"
					v-if="(item.type == 'selection' && tableColumn.includes('selection')) || (item.type == 'index' && tableColumn.includes('index'))">
				</el-table-column>
				<!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
				<el-table-column
					v-bind="item"
					:align="item.align ?? 'center'"
					v-if="item.type == 'expand'"
					v-slot="scope">
					<component :is="item.render" v-bind="scope" v-if="item.render"> </component>
					<slot :name="item.type" v-bind="scope" v-else></slot>
				</el-table-column>
				<!-- other 循环递归 -->
				<TableColumn v-if="!item.type && item.prop && item.isShow" :column="item">
					<template v-for="slot in Object.keys($slots)" #[slot]="scope">
						<slot :name="slot" v-bind="scope"></slot>
					</template>
				</TableColumn>
			</template>
			<!-- 插入表格最后一行之后的插槽 -->
			<template #append>
				<slot name="append"></slot>
			</template>
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
		<!-- 分页组件 -->
		<slot name="pagination">
			<Pagination
				v-if="pagination && tableData.length > 0"
				:pageable="pageable"
				:handleSizeChange="handleSizeChange"
				:handleCurrentChange="handleCurrentChange"
			/>
		</slot>
	</div>
</template>

<script setup lang="ts" name="ProTable">
import { ref, onMounted, watchEffect, watch } from "vue"
import { globalStore } from '@/store'
import { useTable } from "@/hooks/useTable"
import { useSelection } from "@/hooks/useSelection"
import { ColumnProps, BreakPoint } from "@/components/ProTable/interface"
import tableConfig from '@/components/tableConfig/index.vue'
import TableColumn from "./components/TableColumn.vue"
import Pagination from "./components/Pagination.vue";
import { ElTable, TableProps } from "element-plus"

interface ProTableProps extends Partial<Omit<TableProps<any>, "data">> {
	columns: ColumnProps[]; // 列配置项
	requestApiParams: object | any; // 请求表格数据的api参数 ==> 必传 接口url和请求方法类型
	requestAuto?: boolean; // 是否自动执行请求 api ==> 非必传（默认为true）
	requestError?: (params: any) => void; // 表格 api 请求错误监听 ==> 非必传
	dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
	title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
	pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
	border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
	toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
	rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
	searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
	requestAuto: true,
	columns: () => [],
	pagination: true,
	initParam: {},
	border: true,
	toolButton: true,
	rowKey: 'id',
	searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
});

// 获取store 存储库
const myStore: any = globalStore()

// 存储是否显示分页，为了控制表格最大高度显示
myStore.setPagination(props.pagination)

// table显示大小（default/small/large）
const tableSize = ref(<any>'')

// table多选和序号配置
const tableColumn: any = ref(<any>[])

// table工具按钮配置 回调处理
const handleConfig = (data: any) => {
	switch (data.type) {
		case 'size':
			tableSize.value = data.command
			break;
		case 'column':
			tableColumn.value = data.command
			break;
		default:
			break;
	}
}

// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>();

// 表格多选 Hooks
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey);

// 表格操作 Hooks
const { tableData, pageable, searchParam, searchInitParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
	useTable(props.requestApiParams, props.initParam, props.pagination, props.dataCallback, props.requestError);

// table 表格查询区 元素
const searchRef = ref<HTMLElement>()
// 头部 操作按钮 元素
const headerRef = ref<HTMLElement>()
// 表格最大高度计算
const maxHeight: any = ref(myStore.maxHeight)
// 获取window 高度
watchEffect(() => {
	if (tableData.value.length > 0 && myStore.winSize!.contentHeight) {
		if (headerRef.value && searchRef.value) {
			maxHeight.value = `${myStore.winSize.contentHeight - headerRef.value!.clientHeight - searchRef.value!.clientHeight }px`
			return
		}
		if (headerRef.value) {
			maxHeight.value = `${myStore.winSize.contentHeight - headerRef.value!.clientHeight}px`
			return
		}
		if (searchRef.value) {
			maxHeight.value = `${myStore.winSize.contentHeight - searchRef.value!.clientHeight}px`
			return
		}
		maxHeight.value = `${myStore.winSize.contentHeight}px`
	}
})

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection();

// 初始化请求
onMounted(() => props.requestAuto && getTableList());

// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true });

// 扁平化 columns
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
	columns.forEach(async col => {
		if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
		flatArr.push(col);

		// 给每一项 column 添加 isShow && isFilterEnum 默认属性
		col.isShow = col.isShow ?? true;
	});
	return flatArr.filter(item => !item._children?.length);
};

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(flatColumnsFunc(props.columns));

// 列设置 ==> 过滤掉不需要设置显隐的列
const colSetting = tableColumns.value!.filter(item => {
	return item.type !== "selection" && item.type !== "index" && item.type !== "expand" && item.prop !== "operation";
});

// 子组件暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去) 父组件使用ref接收（fatherRef.value.属性/方法）
defineExpose({
	element: tableRef,
	tableData,
	searchParam,
	pageable,
	searchInitParam,
	search,
	getTableList,
	reset,
	clearSelection,
	isSelected,
	selectedList,
	selectedListIds
});
</script>
