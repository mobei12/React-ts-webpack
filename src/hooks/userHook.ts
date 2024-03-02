import api from "src/api";
type loginType = {
	token?: string;
	success: boolean;
	message?: string;
};

async function login(values: { name: string, password: string }) {
	let returnData: loginType = { success: true, message: "登录成功" };
	debugger
	try {
		const result = await api.post<loginType>("/user/login", values);
		const {
			data,
		} = result;
		returnData = { ...data };
		return returnData;
	} catch (error) {
		returnData.success = false;
		returnData.message = error as string;
		return returnData;
	}
}

export default { login };
