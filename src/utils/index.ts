import { message } from 'antd';

// eslint-disable-next-line no-shadow
export enum EMessageType {
	success = 'success',
	error = 'error',
	warning = 'warning',
	info = 'info',
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
	// eslint-disable-next-line default-param-last
	type: TMessageType = EMessageType.success,
	// eslint-disable-next-line default-param-last
	duration: number = 3,
	callback?: VoidFunction,
): void {
	message[type](msg, duration, () => {
		if (typeof callback === 'function') {
			callback();
		}
	});
}

/**
 * @description 根据token 解析用户信息并保存
 * @return 是否有登录权限
 */
export function cacheUserInfo(): boolean | null {
	const token = localStorage.getItem('user_token');
	if (token) {
		localStorage.setItem('user', token);
		return null;
	}
	return null;
}

export function getMessage(code: number | null): string {
	let messageInfo :string;
	switch (code) {
		case 400:
			messageInfo = '请求错误(400)';
			break;
		case 401:
			messageInfo = '未授权，请重新登录(401)';
			// 这里可以做清空storage并跳转到登录页的操作
			break;
		case 403:
			messageInfo = '拒绝访问(403)';
			break;
		case 404:
			messageInfo = '请求出错(404)';
			break;
		case 405:
			messageInfo = '请求方法未允许(405)';
			break;
		case 408:
			messageInfo = '请求超时(408)';
			break;
		case 500:
			messageInfo = '服务器错误(500)';
			break;
		case 501:
			messageInfo = '服务未实现(501)';
			break;
		case 502:
			messageInfo = '网络错误(502)';
			break;
		case 503:
			messageInfo = '服务不可用(503)';
			break;
		case 504:
			messageInfo = '网络超时(504)';
			break;
		case 505:
			messageInfo = 'HTTP版本不受支持(505)';
			break;
		default:
			messageInfo = '其他错误';
	}
	return messageInfo;
}
