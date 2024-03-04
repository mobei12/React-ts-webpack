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
	let returnData: loginType = { code: 200, message: '登录成功' };
	try {
		const result = await api.post<loginType, userType>('/user/login', values);
		const { data } = result;
		returnData = { ...data };
		return returnData;
	} catch (error) {
		returnData.message = error as string;
		return returnData;
	}
}

type registerType = Omit<loginType, 'token'> & {
	id?: number;
};

async function register(values: userType) {
	let returnData: registerType = { code: 200, message: '注册成功' };
	try {
		const result = await api.post<loginType, userType>('/user/register', values);
		const { data } = result;
		returnData = { ...data };
		return returnData;
	} catch (error) {
		returnData.message = error as string;
		return returnData;
	}
}

export default { login, register };
