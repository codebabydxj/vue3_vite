<template>
	<div class="over-card filter" :style="{ width: treeWidth }">
		<h4 class="title" v-if="title">{{ title }}</h4>
		<div class="search">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
      <el-dropdown trigger="click">
        <el-icon size="20"><MoreFilled /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toggleTreeNodes(true)">展开全部</el-dropdown-item>
            <el-dropdown-item @click="toggleTreeNodes(false)">折叠全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
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
					<div class="custom-tree-node" v-if="isTreeLine">
						<el-tree-line :node="scope.node" :showLabelLine="true">
							<template v-slot:node-label>
								<span>
									{{ scope.node.label }}
								</span>
							</template>
						</el-tree-line>
					</div>
					<span class="el-tree-node__label" v-else>
						<slot :row="scope">
							{{ scope.node.label }}
						</slot>
					</span>
				</template>
			</el-tree>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts" name="TreeFilterChild">
import { ref, watch, onBeforeMount, nextTick } from "vue";
import { client } from "@/utils/https/client";
import { ElTree, ElMessage } from "element-plus";
import ElTreeLine from "@/components/ReTreeLine";

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
	treeWidth?: string; // 自定义树的宽度，不定义有默认宽度
	isTreeLine?: boolean; // 是否显示树形连接线
}
const props = withDefaults(defineProps<TreeFilterProps>(), {
	id: "id",
	label: "label",
	multiple: false,
	checkStrictly: false,
	treeWidth: "300px",
	isTreeLine: false
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
	// 执行api请求数据
	if (props.request && props.request.url) {
		getInitData()
	}
});

// res返回结构因人而异，可以活套改动
const getInitData = async () => {
	try {
		const res: any = props.request.method == 'post' ? await client.post(props.request.url, props.params) : await client.get(props.request.url, props.params);
		if (res.code === 200) {
			treeData.value = res.data;
			treeAllData.value = [{ id: "", [props.label]: "全部" }, ...res.data];
		} else {
      ElMessage.error(res.msg)
    }
	} catch (error) {
	}
}

// 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
watch(
  () => props.defaultValue,
  () => nextTick(() => setSelected()),
  { deep: true, immediate: true }
);

watch(
  () => props.data,
  () => {
    if (props.data?.length && !props.request) {
      treeData.value = props.data;
      treeAllData.value = [{ id: '', [props.label]: '全部' }, ...props.data];
    }
  },
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

// 切换树节点的展开或折叠状态
const toggleTreeNodes = (isExpand: boolean) => {
  let nodes = treeRef.value?.store.nodesMap;
  if (!nodes) return;
  for (const node in nodes) {
    if (nodes.hasOwnProperty(node)) {
      nodes[node].expanded = isExpand;
    }
  }
};

// emit
const emit = defineEmits<{
  change: [value: any];
}>();

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
	width: 300px;
	height: 100%;
	padding: 18px;
	margin-right: 10px;
  background-color: var(--el-bg-color);
	float: left;
	overflow: hidden;
	.title {
		margin: 0 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: var(--el-text-color-regular);
		letter-spacing: 0.5px;
	}
	.search {
    display: flex;
    align-items: center;
    margin: 0 0 15px;
    .el-icon {
      cursor: pointer;
      transform: rotate(90deg) translateY(-8px);
    }
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
		.custom-tree-node {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			padding-right: 8px;
		}
	}
}
</style>
