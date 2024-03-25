import api from 'src/api';
import axios, { AxiosError } from 'axios';

type loginType = {
	token?: string;
	code: number | string;
	message?: string;
};
type userType = {
	username: string;
	password: string;
};

/**
 * 异步函数用于用户登录。
 * @param {{ username: string, password: string }} values - 包含用户名和密码的对象
 * @return {loginType} 登录尝试的结果
 */
async function login(values: userType): Promise<loginType> {
	try {
		const { data } = await api.post<loginType, userType>('/user/login', values);
		return data;
	} catch (error) {
		let code: string | number = 'unknown';
		let message: string = 'An unknown error occurred';
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			code = axiosError.response?.status || 500; // 获取状态码，如果不存在则默认为 500
			message = axiosError.message || 'An unknown error occurred'; // 获取错误消息
			return {
				code,
				message,
			};
		}
		return {
			code,
			message,
		};
	}
}

type registerType = Omit<loginType, 'token'> & {
	id?: number;
};

async function register(values: userType) {
	try {
		const { data } = await api.post<registerType, userType>('/user/register', values);
		return data;
	} catch (error) {
		let code: number | string = 'unknown';
		let message = 'An unknown error occurred';

		// 根据具体错误类型设置不同的 code 和 message
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			code = axiosError.response?.status || 'unknown';
			message = axiosError.message || message;
		} else if (error instanceof Error) {
			code = 'error';
			message = error.message || message;
		}

		return {
			code,
			message,
		};
	}
}

export default { login, register };
