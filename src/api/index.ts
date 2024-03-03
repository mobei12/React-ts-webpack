// index.ts
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { EMessageType, removeToken, showMessage } from "../utils";
import history from "src/router/History";

// 导出Request，可以用来自定义传递配置来创建实例
export class Request {
	// axios 实例
	instance: AxiosInstance;
	//isLoading: number = 0;
	// 基础配置，url和超时时间
	baseConfig: AxiosRequestConfig = {
		baseURL: process.env.NODE_ENV === "production" ? `正式环境地址` : "/api",
		timeout: 10000,
	};

	constructor(config: AxiosRequestConfig) {
		// 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
		this.instance = axios.create(Object.assign(this.baseConfig, config));
		this.instance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				// 一般会请求拦截里面加token，用于后端的验证
				const token = localStorage.getItem("user_token") as string;
				if (token) {
					config.headers!.Authorization = token;
				}
				return config;
			},
			(err: any): Promise<AxiosResponse> => {
				// 请求错误，这里可以用全局提示框进行提示
				showMessage("请求错误", EMessageType.error);
				return Promise.reject(err);
			},
		);
		this.instance.interceptors.response.use(
			(res: AxiosResponse) => {
				// 直接返回res，当然你也可以只返回res.data
				// 系统如果有自定义code也可以在这里处理
				if (res.headers.authorization) {
					// 判断是否授权
					localStorage.setItem("user_token", res.headers.authorization);
				} else if (res.data.token) {
					// 判断是否授权
					localStorage.setItem("user_token", res.data.token);
				}
				return res;
			},
			(err: any): Promise<AxiosResponse> => {
				// 这里用来处理http常见错误，进行全局提示
				let message: string;
				const status: number | null = err.response?.status || null;
				switch (status) {
					case 400:
						message = "请求错误(400)";
						break;
					case 401:
						message = "未授权，请重新登录(401)";
						// 这里可以做清空storage并跳转到登录页的操作
						break;
					case 403:
						message = "拒绝访问(403)";
						break;
					case 404:
						message = "请求出错(404)";
						break;
					case 405:
						message = "请求方法未允许(405)";
						break;
					case 408:
						message = "请求超时(408)";
						break;
					case 500:
						message = "服务器错误(500)";
						break;
					case 501:
						message = "服务未实现(501)";
						break;
					case 502:
						message = "网络错误(502)";
						break;
					case 503:
						message = "服务不可用(503)";
						break;
					case 504:
						message = "网络超时(504)";
						break;
					case 505:
						message = "HTTP版本不受支持(505)";
						break;
					default:
						message = err.message;
				}
				showMessage(message, "error", 2, () => {
					if (status === 401) {
						removeToken();
						history.push("/user/login");
					}
				});
				return Promise.reject(err);
			},
		);
	}

	/*private showLoading() {
	 if (this.isLoading === 0) {
	 // 显示加载中
	 }
	 this.isLoading++;
	 }

	 private hideLoading() {
	 this.isLoading--;
	 if (this.isLoading === 0) {
	 // 隐藏加载中
	 }
	 }*/

	public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.get(url, config);
	}

	public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.post(url, data, config);
	}

	public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.put(url, data, config);
	}

	public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.delete(url, config);
	}

	// 可用用来发送其他请求，如patch
	public request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.request(config);
	}
}

const request: Request = new Request({});
// 默认导出Request实例
export default request;
