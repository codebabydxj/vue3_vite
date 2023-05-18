import { reactive, computed, toRefs } from "vue";
import { client } from '@/utils/https/client';
import { Table } from "./interface";

/**
 * @description table 页面操作方法封装
 * @param {Function} apiParams 获取表格数据 apiParams (必传)
 * @param {Object} initParam 获取数据初始化参数(非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页(非必传，默认为true)
 * @param {Function} dataCallback 对后台返回的数据进行处理的方法(非必传)
 * */
export const useTable = (
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
			total: 0
		},
		// 查询参数(只包括查询)
		searchParam: {},
		// 初始化默认的查询参数
		searchInitParam: {},
		// 总参数(包含分页和查询参数)
		totalParam: {},
		// 查询按钮 Loading
		searchLoading: false,
	});

	/**
	 * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
	 * */
	const pageParam = computed({
		get: () => {
			return {
				pageNum: state.pageable.pageNum,
				pageSize: state.pageable.pageSize
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
		try {
			// 先把初始化参数和分页参数放到总参数里面
			Object.assign(state.totalParam, initParam, isPageable ? pageParam.value : {});
      let { data } = apiParams.method === 'get' ? await client.get(apiParams.url, state.totalParam) : await client.post(apiParams.url, state.totalParam)
			state.searchLoading = false;
			dataCallback && (data = dataCallback(data));
			state.tableData = isPageable ? data.list : data;
			// 解构后台返回的分页数据 (如果有分页更新分页信息)
			const { pageNum, pageSize, total } = data;
			isPageable && updatePageable({ pageNum, pageSize, total });
		} catch (error) {
			state.searchLoading = false;
			requestError && requestError(error);
		}
	};

	/**
	 * @description 更新查询参数
	 * @return void
	 * */
	const updatedTotalParam = (defaultParams: any = null) => {
		state.totalParam = {};
		// 处理查询参数，可以给查询参数加自定义前缀操作
		let nowSearchParam: { [key: string]: any } = {};
		// 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
		for (let key in state.searchParam) {
			// * 某些情况下参数为 false/0 也应该携带参数
			if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
				nowSearchParam[key] = state.searchParam[key];
			}
		}
		// 针对一些查询参数作为入参时，根据后台所需做一些变动处理
		if (defaultParams) {
			defaultParams.forEach((item: any) => {
				// 时间范围剔除数组参数，改造成 开始&&结束 时间参数
				if (item.search && item.search.el === 'date-picker' && item.search.resetValue.length && nowSearchParam[item.prop]) {
					[nowSearchParam[item.search.resetValue[0]], nowSearchParam[item.search.resetValue[1]]] = nowSearchParam[item.prop]
					delete nowSearchParam[item.prop]
				}
			})
		}
		Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {});
	};

	/**
	 * @description 更新分页信息
	 * @param {Object} resPageable 后台返回的分页数据
	 * @return void
	 * */
	const updatePageable = (resPageable: Table.Pageable) => {
		Object.assign(state.pageable, resPageable);
	};

	/**
	 * @description 表格数据查询
	 * @return void
	 * */
	const search = (params: any = null) => {
		state.pageable.pageNum = 1;
		state.searchLoading = true;
		updatedTotalParam(params);
		getTableList();
	};

	/**
	 * @description 表格数据重置
	 * @return void
	 * */
	const reset = () => {
		state.pageable.pageNum = 1;
		state.searchParam = {};
		// 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
		Object.keys(state.searchInitParam).forEach(key => {
			state.searchParam[key] = state.searchInitParam[key];
		});
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
		state.searchLoading = true;
		getTableList();
	};

	/**
	 * @description 当前页改变
	 * @param {Number} val 当前页
	 * @return void
	 * */
	const handleCurrentChange = (val: number) => {
		state.pageable.pageNum = val;
		state.searchLoading = true;
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
