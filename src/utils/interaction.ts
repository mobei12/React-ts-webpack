/*
 交互类工具，如：消息提示、页面跳转
 */
import { message } from 'antd';

export enum EMessageType {
	success = 'success',
	error = 'error',
	warning = 'warning',
	info = 'info',
}

type TMessageType = keyof typeof EMessageType;

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
): void {
	message[type](msg, duration, () => {
		if (typeof callback === 'function') {
			callback();
		}
	});
}
