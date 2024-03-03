import { message } from "antd";

export enum EMessageType {
	success = "success",
	error = "error",
	warning = "warning",
	info = "info",
}

type TMessageType = keyof typeof EMessageType;

/**
 * @description 清除所有token
 */
export function removeToken(): void {
	localStorage.clear();
}

/**
 * @description 展示提示
 * @param msg  提示信息
 * @param type 类型
 * @param duration 时长
 * @param callback 回调
 */
export function showMessage(
	msg: string,
	type: TMessageType = EMessageType.success,
	duration: number = 3,
	callback?: VoidFunction,
): void | Function {
	message[type](msg, duration, () => {
		callback && callback();
	});
}

/**
 * @description 根据token 解析用户信息并保存
 * @return 是否有登录权限
 */
export function cacheUserInfo(): boolean | null {
	const token = localStorage.getItem("user_token");
	if (token) {
		localStorage.setItem("user", token);
		return  null;
	}
	return null;
}
