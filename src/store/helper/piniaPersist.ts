import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */
const piniaPersistConfig = (key: string, paths?: string[]) => {
	const persist: PersistedStateOptions = {
		key,
		storage: localStorage, // 选择缓存方式 sessionStorage / localStorage
		paths, // 默认全部缓存，部分缓存需要传paths[key]
	};
	return persist;
};

export default piniaPersistConfig;
