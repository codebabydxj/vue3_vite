<template>
	<component :is="renderLoop(column)"></component>
</template>

<script lang="tsx" setup name="TableColumn">
import { useSlots } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { formatValue, handleRowAccordingToProp } from "@/utils/tools";

defineProps<{ column: ColumnProps }>();

const slots = useSlots();

// 渲染表格数据
const renderCellData = (item: ColumnProps, scope: { [key: string]: any }) => {
	return formatValue(handleRowAccordingToProp(scope.row, item.prop!));
};

const renderLoop = (item: ColumnProps) => {
	return (
		<>
			{item.isShow && (
				<el-table-column
					{...item}
					align={item.align ?? "center"}
					showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== "operation"}
				>
					{{
						default: (scope: any) => {
							if (item._children) return item._children.map(child => renderLoop(child));
							if (item.render) return item.render(scope);
							if (slots[item.prop!]) return slots[item.prop!]!(scope);
							if (item.tag) return <el-tag type={item.tag}>{renderCellData(item, scope)}</el-tag>;
							return renderCellData(item, scope);
						},
						header: () => {
							if (item.headerRender) return item.headerRender(item);
							if (slots[`${item.prop}Header`]) return slots[`${item.prop}Header`]!({ row: item });
							return item.label;
						}
					}}
				</el-table-column>
			)}
		</>
	);
};
</script>