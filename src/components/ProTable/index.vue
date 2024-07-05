<template>
	<div class="table-main">
		<!-- 搜索 查询表单 -->
		<div class="table-search" ref="searchRef" v-if="isShowSearch">
			<SearchForm
				:columns="searchColumns"
				:search-param="searchParam"
				:search-col="searchCol"
				:search="_search"
				:reset="_reset"
			/>
		</div>
		<!-- 表格头部 操作按钮 -->
		<div class="table-header" ref="headerRef">
			<div class="header-button-lf">
				<slot name="tableHeader" :selectedListIds="selectedListIds" :selectedList="selectedList" :isSelected="isSelected" />
			</div>
			<div class="header-button-ri" v-if="toolButton">
				<table-config ref="colRef" :colSetting="colSetting" :isShowSelIdx="isShowSelIdx" @tableConfigCall="handleConfig">
				</table-config>
			</div>
		</div>
		<!-- 表格主体 -->
		<el-table
			v-if="refreshTable"
			ref="tableRef"
			v-bind="$attrs"
			:id="uuid"
			:size="tableSize"
			:class="{ 'pro_no_table': !tableData.length }"
			:data="tableData"
			:border="border"
			:row-key="rowKey"
			:default-expand-all="isExpand"
			@selection-change="selectionChange">
			<!-- 默认插槽 -->
			<slot />
			<template v-for="item in tableColumns" :key="item">
				<!-- selection || radio || index || expand || sort -->
				<el-table-column
					v-if="(item.type == 'selection' && tableColumn.includes('selection')) || (item.type == 'index' && tableColumn.includes('index'))"
					v-bind="item"
					:align="item.align ?? 'center'"
					:reserve-selection="item.type == 'selection'">
				</el-table-column>
				<el-table-column
					v-else-if="item.type && columnTypes.includes(item.type)"
					v-bind="item"
					:align="item.align ?? 'center'">
					<template #default="scope">
						<!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
						<template v-if="item.type == 'expand'">
							<component v-if="item.render" :is="item.render" v-bind="scope" />
							<slot v-else :name="item.type" v-bind="scope" />
						</template>
						<!-- radio 单选 -->
            <el-radio v-if="item.type == 'radio'" v-model="radio" :value="scope.row[rowKey]">
              <i></i>
            </el-radio>
						<!-- sort 拖动排序 -->
            <el-tag v-if="item.type == 'sort'" class="move">
              <el-icon> <DCaret /></el-icon>
            </el-tag>
					</template>
				</el-table-column>
				<!-- other 循环递归 -->
				<TableColumn v-else :column="item">
					<template v-for="slot in Object.keys($slots)" #[slot]="scope">
						<slot :name="slot" v-bind="scope" />
					</template>
				</TableColumn>
			</template>
			<!-- 插入表格最后一行之后的插槽 -->
			<template #append>
				<slot name="append" />
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
import { ref, unref, onMounted, watch, provide, nextTick, computed } from "vue";
import { useGlobalStore } from "@/store";
import { useTable } from "@/hooks/useTable";
import { useSelection } from "@/hooks/useSelection";
import { generateUUID, handleProp } from "@/utils/tools";
import { ElTable } from "element-plus";
import { ProTableProps, ColumnProps, TypeProps } from "@/components/ProTable/interface";
import tableConfig from "@/components/tableConfig/index.vue";
import SearchForm from "@/components/SearchForm/index.vue";
import TableColumn from "./components/TableColumn.vue";
import Pagination from "./components/Pagination.vue";
import Sortable from "sortablejs";

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
	columns: () => [],
	requestAuto: true,
	pagination: true,
	initParam: {},
	border: true,
	toolButton: true,
	rowKey: 'id',
	isShowSearch: true,
	isShowSelIdx: false,
	searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
});

// 获取store 存储库
const myStore: any = useGlobalStore()

// 存储是否显示分页，为了控制表格最大高度显示
myStore.setPagination(props.pagination)

// table显示大小（default/small/large）
const tableSize: any = ref('')

// table 勾选框和序号配，，默认都显示
const tableColumn: any = ref(['selection', 'index'])

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

// table 实例
const tableRef = ref<InstanceType<typeof ElTable>>();

// 生成组件唯一id
const uuid = ref("id-" + generateUUID());

// column 列类型
const columnTypes: TypeProps[] = ["selection", "radio", "index", "expand", "sort"];

// 单选值
const radio = ref('');

// 表格多选 Hooks
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey);

// 表格操作 Hooks
const { tableData, pageable, searchParam, searchInitParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
	useTable(props.resetParams, props.requestApiParams, props.initParam, props.pagination, props.dataCallback, props.requestError);

// table 表格查询区 元素
const searchRef = ref<HTMLElement>()
// 头部 操作按钮 元素
const headerRef = ref<HTMLElement>()

// 存在树形 table 时， 展开和合并调用
const isExpand = ref(<boolean>true);
const refreshTable = ref(<boolean>true);
const setExpand = () => {
	refreshTable.value = false;
	isExpand.value = !isExpand.value;
	nextTick(() => {
		refreshTable.value = true;
	})
}

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection();

// 初始化表格 默认发起请求 具体看 requestAuto 属性 &&  拖拽排序
onMounted(() => {
	dragSort()
	props.requestAuto && getTableList()
});

// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true });

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns);

// 扁平化 columns
const flatColumns = computed(() => flatColumnsFunc(tableColumns.value));

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
const setEnumMap = async ({ prop, enum: enumValue }: ColumnProps) => {
	if (!enumValue) return;

  // 如果当前 enumMap 存在相同的值 return
  if (enumMap.value.has(prop!) && (typeof enumValue === "function" || enumMap.value.get(prop!) === enumValue)) return;

  // 当前 enum 为静态数据，则直接存储到 enumMap
  if (typeof enumValue !== "function") return enumMap.value.set(prop!, unref(enumValue!));

  // 为了防止接口执行慢，而存储慢，导致重复请求，所以预先存储为[]，接口返回后再二次存储
  enumMap.value.set(prop!, []);

  // 当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  const { data } = await enumValue();
  enumMap.value.set(prop!, data);
};

// 注入 enumMap
provide("enumMap", enumMap);

// 扁平化 columns
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
	columns.forEach(async col => {
		if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
		flatArr.push(col);

		// 给每一项 column 添加 isShow && isSetting && isFilterEnum 默认属性
		col.isShow = col.isShow ?? true;
		col.isSetting = col.isSetting ?? true;
		col.isFilterEnum = col.isFilterEnum ?? true;

		// 设置 enumMap
		await setEnumMap(col);
	});
	return flatArr.filter(item => !item._children?.length);
};

// 过滤需要搜索的配置项 && 排序
const searchColumns = computed(() => {
  return flatColumns.value
    ?.filter(item => item.search?.el || item.search?.render)
    .sort((a, b) => a.search!.order! - b.search!.order!);
});

// 设置搜索表单排序默认值 && 设置搜索表单项的默认值
searchColumns.value?.forEach((column, index) => {
  column.search!.order = column.search?.order ?? index + 2;
	const key = column.search?.key ?? handleProp(column.prop!);
	const defaultValue = column.search?.defaultValue;
  if (defaultValue !== undefined && defaultValue !== null) {
    searchInitParam.value[key] = defaultValue;
    searchParam.value[key] = defaultValue;
  }
});

// 列设置 ==> 过滤掉不需要设置显隐的列
const colSetting = tableColumns.value!.filter(item => {
	const { type, prop, isSetting } = item;
	return !columnTypes.includes(type!) && prop !== "operation" && isSetting;
});

// 定义 emit 事件
const emit = defineEmits<{
  search: [];
  reset: [];
  dragSort: [{ newIndex?: number; oldIndex?: number }];
}>();

const _search = () => {
  search();
  emit("search");
};

const _reset = () => {
  reset();
  emit("reset");
};

// 拖拽排序
const dragSort = () => {
  const tbody = document.querySelector(`#${uuid.value} tbody`) as HTMLElement;
  Sortable.create(tbody, {
    handle: ".move",
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
			const [removedItem] = tableData.value.splice(oldIndex!, 1);
      tableData.value.splice(newIndex!, 0, removedItem);
      emit("dragSort", { newIndex, oldIndex });
    }
  });
};

// 子组件暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去) 父组件使用ref接收（fatherRef.value.属性/方法）
defineExpose({
	element: tableRef,
	tableData,
	radio,
	searchParam,
	searchInitParam,
	pageable,
	enumMap,
	isSelected,
	selectedList,
	selectedListIds,
	getTableList,
	search,
	reset,
	handleSizeChange,
	handleCurrentChange,
	clearSelection,
	setExpand
});
</script>
