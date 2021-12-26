// 工具箱

export const addEvent = function (ele, type, handle) {
	if (ele.addEventListener) {
		ele.addEventListener(type, handle, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + type, function () {
			handle.call(ele);
		})
	} else {
		ele['on' + type] = handle;
	}
}