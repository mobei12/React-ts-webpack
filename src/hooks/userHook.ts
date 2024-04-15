import api from 'src/api';
import { AxiosError } from 'axios';

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
export async function login(values: userType): Promise<loginType> {
	try {
		const { data } = await api.post<loginType, userType>('/user/login', values);
		return data;
	} catch (error) {
		const axiosError = error as AxiosError;
		return {
			code: axiosError.response?.status || 'unknown',
			message: axiosError.message,
		};
	}
}

type registerType = Omit<loginType, 'token'> & {
	id?: number;
};

/**
 * 使用提供的值注册用户。
 *
 * @param {userType} values - 要注册用户的数值
 * @return {Promise<any>} 注册API调用返回的数据，或带有代码和消息的对象
 */
export async function register(values: userType): Promise<registerType> {
	try {
		const { data } = await api.post<registerType, userType>('/user/register', values);
		return data;
	} catch (error) {
		const axiosError = error as AxiosError;
		return {
			code: axiosError.response?.status || 'unknown',
			message: axiosError.message,
		};
	}
}

export interface IUser {
	username: string;
	_id: string;
	ctime: Date;
	level?: number;
}

type UserListType = IUser[];
type RUserListType = Promise<{ code: number; data: UserListType; message: string }>;

export async function getUserList(): Promise<RUserListType> {
	try {
		const { data } = await api.get<UserListType>('/user/getUserList');
		return { code: 200, data, message: 'success' };
	} catch (error) {
		const axiosError = error as AxiosError;
		return {
			code: axiosError.response?.status || 500,
			data: [],
			message: axiosError.message,
		};
	}
}
