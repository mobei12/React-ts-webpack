import api from 'src/api';

type loginType = {
	token?: string;
	code: number;
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
		return {
			code: 500,
			message: error instanceof Error ? error.message : 'An unknown error occurred'
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
		return {
			code: 500,
			message: error instanceof Error ? error.message : 'An unknown error occurred'
		};
	}
}

export default { login, register };
