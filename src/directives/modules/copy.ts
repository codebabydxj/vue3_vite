/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */

import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";
interface ElType extends HTMLElement {
	copyData: string | number;
}
const copy: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value;
		el.addEventListener("click", handleClick);
	},
	updated(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value;
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", handleClick);
	}
};

async function handleClick(this: any) {
	if (window.isSecureContext && navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(this.copyData);
			ElMessage({
				type: "success",
				message: "复制成功"
			});
		} catch (err) {
			console.error("复制操作不被支持或失败: ", err);
		}
	} else {
		unsecuredCopyToClipboard(this.copyData)
	}
}
const unsecuredCopyToClipboard = (text: string) => {
	const textArea = document.createElement("textarea");
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	try {
		document.execCommand('copy')
		ElMessage.success(`"${text}"已复制到剪切板`)
	} catch (err) {
		console.error("复制操作不被支持或失败: ", err);
	}
	document.body.removeChild(textArea)
}

export default copy;
