/*
 函数类工具，如：判断登录权限，获取token等
 */

/**
 * @description 根据token 解析用户信息并保存
 * @return {boolean | null} 是否有登录权限
 */
const cacheUserInfo = (): boolean | null => {
	const token = localStorage.getItem('user_token');
	if (token) {
		localStorage.setItem('user', token);
		return true;
	}
	return null;
};

/**
 * @description 清除所有token
 */
const removeToken = (): void => {
	localStorage.clear();
};

/**
 * @description根据给定的 HTTP 状态码获取相应的错误消息。
 * @param {number | null} code - HTTP 状态码。
 * @return {string} 与状态码对应的错误消息。
 */
const getInfoWithCode = (code: number | null): string => {
	let messageInfo: string;
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
};
type TTheme = 'dark' | 'light' | 'auto' | undefined;
const setTheme = (isDark: TTheme): void => {
	if (isDark === 'auto') {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			localStorage.setItem('theme', 'auto');
			document.documentElement.classList.add('dark');
		} else {
			localStorage.removeItem('theme');
			document.documentElement.classList.remove('dark');
		}
	} else if (isDark === 'light') {
		localStorage.setItem('theme', 'light');
		document.documentElement.classList.remove('dark');
	} else if (isDark === 'dark') {
		localStorage.setItem('theme', 'dark');
		document.documentElement.classList.add('dark');
	} else {
		localStorage.removeItem('theme');
		document.documentElement.classList.remove('dark');
	}
};
export default {
	cacheUserInfo,
	removeToken,
	getInfoWithCode,
	setTheme,
};
