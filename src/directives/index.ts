import { App } from "vue";
import auth from "./modules/auth";
import copy from "./modules/copy";
import waterMarker from "./modules/waterMarker";
import draggable from "./modules/draggable";
import debounce from "./modules/debounce";
import throttle from "./modules/throttle";
import longpress from "./modules/longpress";
import inputNumber from "./modules/inputNumber";
import tooltip from "./modules/tooltip";

const directivesList: any = {
	auth,
	copy,
	waterMarker,
	draggable,
	debounce,
	throttle,
	longpress,
	inputNumber,
	tooltip
};

const directives = {
	install: function (app: App<Element>) {
		Object.keys(directivesList).forEach(key => {
			// 注册所有自定义指令
			app.directive(key, directivesList[key]);
		});
	}
};

export default directives;
