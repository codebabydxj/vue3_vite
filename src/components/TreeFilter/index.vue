<template>
	<div class="over-card filter">
		<h4 class="title" v-if="title">{{ title }}</h4>
		<el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
		<el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
			<el-tree
				ref="treeRef"
				default-expand-all
				:node-key="id"
				:data="multiple ? treeData : treeAllData"
				:show-checkbox="multiple"
				:check-strictly="checkStrictly"
				:current-node-key="!multiple ? selected : ''"
				:highlight-current="!multiple"
				:expand-on-click-node="false"
				:check-on-click-node="multiple"
				:props="defaultProps"
				:filter-node-method="filterNode"
				:default-checked-keys="multiple ? selected : []"
				@node-click="handleNodeClick"
				@check="handleCheckChange"
			>
				<template #default="scope">
					<span class="el-tree-node__label">
						<slot :row="scope">
							{{ scope.node.label }}
						</slot>
					</span>
				</template>
			</el-tree>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts" name="TreeFilter">
import { client } from "@/utils/https/client";
import { ref, watch, onBeforeMount, nextTick } from "vue";
import { ElTree } from "element-plus";

// 接收父组件参数并设置默认值
interface TreeFilterProps {
	request?: { url: string, method: string } | any; // 请求api包含 url和 method ==> 非必传
	params?: any; // 请求分类数据的参数 ==> 非必传
	data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
	title?: string; // treeFilter 标题 ==> 非必传
	id?: string; // 选择的id ==> 非必传，默认为 “id”
	label?: string; // 显示的label ==> 非必传，默认为 “label”
	multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
	defaultValue?: any; // 默认选中的值 ==> 非必传
  checkStrictly?: boolean // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 ==> 非比传,默认 false
}
const props = withDefaults(defineProps<TreeFilterProps>(), {
	id: "id",
	label: "label",
	multiple: false,
	checkStrictly: false
});

const defaultProps = {
	children: "children",
	label: props.label
};

const filterText = ref<string>("");
const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);
// 选中的值
const selected = ref();

const setSelected = () => {
  if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
  else selected.value = typeof props.defaultValue === "string" ? props.defaultValue : "";
};

onBeforeMount(async () => {
	// 重新接收一下默认值
	setSelected()

	// 有数据就直接赋值，没有数据就执行请求函数
	if (props.data?.length) {
		treeData.value = props.data;
		treeAllData.value = [{ id: '', [props.label]: '全部' }, ...props.data];
		return;
	}
	// 没有mock数据执行api请求数据
	if (props.request && props.request.url) {
		getInitData()
	}
});

// res返回结构因人而异，可以活套改动
const getInitData = async () => {
	const { data } = props.request.method == 'post' ? await client.post(props.request.url, props.params) : await client.get(props.request.url, props.params)
	treeData.value = data;
	treeAllData.value = [{ id: "", [props.label]: "全部" }, ...data];
}

// 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
watch(
  () => props.defaultValue,
  () => nextTick(() => setSelected()),
  { deep: true, immediate: true }
);

watch(filterText, val => {
	treeRef.value!.filter(val);
});

// 过滤
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
	if (!value) return true;
	let parentNode = node.parent,
			labels = [node.label],
			level = 1;
	while (level < node.level) {
		labels = [...labels, parentNode.label];
		parentNode = parentNode.parent;
		level++;
	}
	return labels.some(label => label.indexOf(value) !== -1);
};

interface FilterEmits {
	(e: "change", value: any): void;
}
const emit = defineEmits<FilterEmits>();

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
	if (props.multiple) return;
	emit("change", data[props.id]);
};

// 多选
const handleCheckChange = () => {
	emit("change", treeRef.value?.getCheckedKeys());
};

// 暴露给父组件使用
defineExpose({ treeData, treeAllData, treeRef });
</script>

<style scoped lang="scss">
.filter {
	box-sizing: border-box;
	width: 220px;
	height: 100%;
	padding: 18px;
	margin-right: 10px;
  background-color: var(--el-bg-color);
	float: left;
	.title {
		margin: 0 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: var(--el-text-color-regular);
		letter-spacing: 0.5px;
	}
	.el-input {
		margin: 0 0 15px;
	}
	.el-scrollbar {
		:deep(.el-tree) {
			height: 80%;
			overflow: auto;
			.el-tree-node__content {
				height: 33px;
			}
		}
		:deep(.el-tree--highlight-current) {
			.el-tree-node.is-current > .el-tree-node__content {
				background-color: var(--el-color-primary);
				.el-tree-node__label,
				.el-tree-node__expand-icon {
					color: white;
				}
				.is-leaf {
					color: transparent;
				}
			}
		}
	}
}
</style>
