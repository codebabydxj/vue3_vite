import { reactive, computed, toRefs } from "vue";
import { client } from "@/utils/https/client";
import { Table } from "./interface";

/**
 * @description table 页面操作方法封装
 * @param {Function} resetParams 请求之前对查询参数进行处理 (非必传)
 * @param {Function} apiParams 获取表格数据 apiParams (必传)
 * @param {Object} initParam 获取数据初始化参数(非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页(非必传，默认为true)
 * @param {Function} dataCallback 对后台返回的数据进行处理的方法 (非必传)
 * */
export const useTable = (
	resetParams?: (params: any) => Promise<any>,
	apiParams: object | any = { url: '', method: 'post' },
	initParam: object = {},
	isPageable: boolean = true,
	dataCallback?: (data: any) => any,
	requestError?: (error: any) => void
) => {
	const state = reactive<Table.TableStateProps>({
		// 表格数据
		tableData: [],
		// 分页数据
		pageable: {
			// 当前页数
			pageNum: 1,
			// 每页显示条数
			pageSize: 10,
			// 总条数
			total: 0,
			// 设置最大页码按钮数
			pagerCount: 7
		},
		// 查询参数(只包括查询)
		searchParam: {},
		// 初始化默认的查询参数
		searchInitParam: {},
		// 总参数(包含分页和查询参数)
		totalParam: {},
	});

	/**
	 * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
	 * */
	const pageParam = computed({
		get: () => {
			return {
				pageNum: state.pageable.pageNum,
				pageSize: state.pageable.pageSize,
				pagerCount: state.pageable.pagerCount,
			};
		},
		set: (newVal: any) => {
			console.log("我是分页更新之后的值", newVal);
		}
	});

	/**
	 * @description 获取表格数据
	 * @return void
	 * */
	const getTableList = async () => {
		if (!apiParams.url) return;
		try {
			// 先把初始化参数和分页参数放到总参数里面
			Object.assign(state.totalParam, state.searchInitParam, initParam, isPageable ? pageParam.value : {});
			let newParams: any = { ...state.totalParam }
			if (resetParams) {
				newParams = resetParams({...newParams})
			}
      let { data } = apiParams.method === 'get' ? await client.get(apiParams.url, newParams) : await client.post(apiParams.url, newParams)
			dataCallback && (data = dataCallback(data));
			state.tableData = isPageable ? data.list : data;
			// 解构后台返回的分页数据 (如果有分页更新分页信息)
      if (isPageable) {
				state.pageable.total = data.total;
			}
		} catch (error) {
			requestError && requestError(error);
		}
	};

	/**
	 * @description 更新查询参数
	 * @return void
	 * */
	const updatedTotalParam = () => {
		state.totalParam = {};
		// 处理查询参数，可以给查询参数加自定义前缀操作
		let nowSearchParam: Table.TableStateProps["searchParam"] = {};
		// 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
		for (let key in state.searchParam) {
			// * 某些情况下参数为 false/0 也应该携带参数
			if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
				nowSearchParam[key] = state.searchParam[key];
			}
		}
		Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {});
	};


	/**
	 * @description 表格数据查询
	 * @return void
	 * */
	const search = () => {
		state.pageable.pageNum = 1;
		updatedTotalParam();
		getTableList();
	};

	/**
	 * @description 表格数据重置
	 * @return void
	 * */
	const reset = () => {
		state.pageable.pageNum = 1;
		// 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
		state.searchParam = { ...state.searchInitParam };
		updatedTotalParam();
		getTableList();
	};

	/**
	 * @description 每页条数改变
	 * @param {Number} val 当前条数
	 * @return void
	 * */
	const handleSizeChange = (val: number) => {
		state.pageable.pageNum = 1;
		state.pageable.pageSize = val;
		getTableList();
	};

	/**
	 * @description 当前页改变
	 * @param {Number} val 当前页
	 * @return void
	 * */
	const handleCurrentChange = (val: number) => {
		state.pageable.pageNum = val;
		getTableList();
	};

	return {
		...toRefs(state),
		getTableList,
		search,
		reset,
		handleSizeChange,
		handleCurrentChange,
		updatedTotalParam
	};
};
