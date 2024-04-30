/*
 函数类工具，如：判断登录权限，获取token等
 */
/**
 * @description 根据token 解析用户信息并保存
 * @return {boolean | null} 是否有登录权限
 */
export const cacheUserInfo = (): boolean | null => {
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
export const removeToken = (): void => {
	localStorage.removeItem('user');
	localStorage.removeItem('user_token');
	localStorage.removeItem('menus');
};

/**
 * @description根据给定的 HTTP 状态码获取相应的错误消息。
 * @param {number | null} code - HTTP 状态码。
 * @return {string} 与状态码对应的错误消息。
 */
export const getInfoWithCode = (code: number | null): string => {
	let info: string;
	switch (code) {
		case 400:
			info = '请求错误(400)';
			break;
		case 401:
			info = '未授权，请重新登录(401)';
			// 这里可以做清空storage并跳转到登录页的操作
			break;
		case 403:
			info = '拒绝访问(403)';
			break;
		case 404:
			info = '请求出错(404)';
			break;
		case 405:
			info = '请求方法未允许(405)';
			break;
		case 408:
			info = '请求超时(408)';
			break;
		case 500:
			info = '服务器错误(500)';
			break;
		case 501:
			info = '服务未实现(501)';
			break;
		case 502:
			info = '网络错误(502)';
			break;
		case 503:
			info = '服务不可用(503)';
			break;
		case 504:
			info = '网络超时(504)';
			break;
		case 505:
			info = 'HTTP版本不受支持(505)';
			break;
		default:
			info = '其他错误';
	}
	return info;
};
/**
 * @description根据给定的 Theme 类型，设置主题模式
 */
export type TTheme = 'dark' | 'light' | 'system' | undefined;

/**
 * @description根据给定的值来设置主题
 * @param {TTheme | null} isDark 是否是暗黑模式
 * @return {string | null}
 */
export const setTheme = (isDark?: TTheme): string | null => {
	const rootElement: HTMLElement = document.documentElement as HTMLElement;
	const localTheme = localStorage.getItem('theme');

	// 页面刷新时，根据 localStorage 中存储的主题设置来确定主题模式
	if (isDark === undefined) {
		if (localTheme) {
			if (localTheme === 'dark') {
				rootElement.classList.add('dark');
			} else if (localTheme === 'system') {
				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					rootElement.classList.add('dark');
				}
			}
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			rootElement.classList.add('dark');
		}
	} else {
		// 用户主动选择主题时，根据用户的选择来设置主题模式，并将选择保存到 localStorage 中
		if (isDark === 'system') {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				rootElement.classList.add('dark');
			} else {
				rootElement.classList.remove('dark');
			}
		} else {
			rootElement.classList.toggle('dark', isDark === 'dark');
		}
		localStorage.setItem('theme', isDark);
	}
	return localStorage.getItem('theme');
};
