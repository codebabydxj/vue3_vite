<template>
	<!-- 分页组件 -->
	<el-pagination
		:current-page="pageable.pageNum"
		:page-size="pageable.pageSize"
		:page-sizes="[10, 20, 50, 100]"
		:background="true"
		:size="size"
		layout="total, sizes, prev, pager, next, jumper"
		:total="pageable.total"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
	></el-pagination>
</template>

<script setup lang="ts" name="Pagination">
interface Pageable {
	pageNum: number;
	pageSize: number;
	total: number;
}

interface PaginationProps {
	size?: string;
	pageable: Pageable;
	handleSizeChange: (size: number) => void;
	handleCurrentChange: (currentPage: number) => void;
}

const props = withDefaults(defineProps<PaginationProps>(), {
	size: 'small'
})
</script>
