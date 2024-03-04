import api from 'src/api';

type loginType = {
	token?: string;
	code: number;
	message?: string;
};
/**
 * 异步函数用于用户登录。
 * @param {{ username: string, password: string }} values - 包含用户名和密码的对象
 * @return {loginType} 登录尝试的结果
 */
async function login(values: { username: string, password: string }): Promise<loginType> {
	let returnData: loginType = { code: 200, message: '登录成功' };
	try {
		const result = await api.post<loginType>('/user/login', values);
		const {
			data,
		} = result;
		returnData = { ...data };
		return returnData;
	} catch (error) {
		returnData.message = error as string;
		return returnData;
	}
}
async function register(values: { username: string, password: string }) {
	let returnData = { code: 200, message: '注册成功' };
	try {
		const result = await api.post('/user/register', values);
		const {
			data,
		} = result;
		returnData = { ...data };
		return returnData;
	} catch (error) {
		returnData.message = error as string;
		return returnData;
	}
}
export default { login, register };
