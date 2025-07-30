<template>
	<div class="icon-box">
		<el-input
			ref="inputRef"
			v-model="valueIcon"
			v-bind="$attrs"
			:placeholder="placeholder"
			:clearable="clearable"
			@clear="clearIcon"
			@click="openDialog"
		>
			<template #append>
				<svg-icon v-if="activeTab == '2' && customIcons[iconValue]?.name" :name="customIcons[iconValue].name" :iconStyle="{ width: '20px', height: '20px'}" />
				<el-button v-else :icon="customIcons[iconValue]" />
			</template>
		</el-input>
		<el-dialog v-model="dialogVisible" :title="placeholder" top="60px" width="70%">
			<el-tabs v-model="activeTab" v-if="showIcon == 'ALL'">
				<el-tab-pane label="UI组件图标库" name="1">
				</el-tab-pane>
				<el-tab-pane label="本地SVG图标库" name="2"></el-tab-pane>
			</el-tabs>
			<el-input v-model="inputValue" placeholder="搜索图标" size="large" :prefix-icon="Icons.Search" />
			<el-scrollbar v-if="Object.keys(iconsList).length">
				<div class="icon-list">
					<div v-for="item in iconsList" :key="item" class="icon-item" @click="selectIcon(item)">
						<svg-icon v-if="activeTab == '2'" :name="item.name" :iconStyle="{ width: '30px', height: '30px'}" />
            <component v-else :is="item"></component>
						<span class="text-ellipsis">{{ item.name }}</span>
					</div>
				</div>
			</el-scrollbar>
			<el-empty v-else description="未搜索到您要找的图标~" />
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="SelectIconChild">
import { ref, computed } from "vue";
import * as ElementIcon from '@element-plus/icons-vue'
import * as AntdIcons from '@vicons/antd'

interface SelectIconProps {
	iconValue: string;
	title?: string;
	clearable?: boolean;
	placeholder?: string;
	showIcon?: string;
}
const props = withDefaults(defineProps<SelectIconProps>(), {
	iconValue: "",
	title: "请选择图标",
	clearable: true,
	placeholder: "请选择图标",
	showIcon: "ALL"
});

const Icons = { ...ElementIcon, ...AntdIcons }
const SvgIcons = import.meta.glob("@/icons/svg/*.svg");
const activeTab: any = ref('1')
const dialogVisible = ref(false);

// 重新接收一下，防止打包后 clearable 报错
const valueIcon = ref(props.iconValue);

const openDialog = () => {
	if (props.showIcon == 'SVG') {
		activeTab.value = "2"
	} else if (!valueIcon.value) {
		activeTab.value = "1"
	}
	dialogVisible.value = true
};

const inputRef = ref();
const emit = defineEmits<{"update:iconValue": [value: string]}>();

// 选择图标(触发更新父组件数据)
const selectIcon = (item: any) => {
	dialogVisible.value = false;
	valueIcon.value = item.name;
	emit("update:iconValue", item.name);
	setTimeout(() => inputRef.value.blur(), 0);
};

// 清空图标
const clearIcon = () => {
	valueIcon.value = "";
	emit("update:iconValue", "");
	setTimeout(() => inputRef.value.blur(), 0);
};

// 监听搜索框值
const inputValue = ref();
const customIcons: any = computed(() => {
	let icons: any = {};
	if (activeTab.value == 2) {
		if (!Object.keys(SvgIcons).length) icons = {};
		Object.keys(SvgIcons).forEach((path: any) => {
			const _name: any = path.replace("/src/icons/svg/", "").split(".svg")[0]
			icons[_name] = { name: _name }
		})
	} else {
		icons = Icons
	}
	return icons;
});
const iconsList = computed((): { [key: string]: any } => {
	if (!inputValue.value) return customIcons.value;
	let result: { [key: string]: any } = {};
	for (const key in customIcons.value) {
		if (key.toLowerCase().indexOf(inputValue.value.toLowerCase()) > -1) result[key] = customIcons.value[key];
	}
	return result;
});
</script>

<style scoped lang="scss">
.icon-box {
	width: 100%;
	.el-button {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		color: var(--el-text-color-regular);
	}
	:deep(.el-dialog__body) {
		padding: 25px 20px 20px;
		.el-input {
			margin-bottom: 10px;
		}
		.icon-list {
			display: grid;
			grid-template-columns: repeat(auto-fill, 115px);
			justify-content: space-evenly;
			max-height: 65vh;
			.icon-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 42px;
				padding: 20px 30px;
				cursor: pointer;
				transition: all 0.2s;
				&:hover {
					transform: scale(1.3);
				}
				span {
          width: 115px;
					margin-top: 5px;
					line-height: 20px;
					text-align: center;
				}
			}
		}
	}
}
</style>
