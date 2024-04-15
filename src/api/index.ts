// index.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { getInfoWithCode, removeToken, showMessage, EMessageType } from 'src/utils';
import GlobalLoading from 'src/component/Loading';

// 导出Request，可以用来自定义传递配置来创建实例
export class Request {
	// axios 实例
	private instance: AxiosInstance;

	private isLoading: number = 0;

	// 基础配置，url和超时时间
	private static baseConfig: AxiosRequestConfig = {
		baseURL: process.env.CUSTOMIZE_MODE === 'production' ? process.env.CUSTOMIZE_SERVER_URL : '/api',
		timeout: parseInt(process.env.CUSTOMIZE_TIMEOUT, 10) || 10000,
	};

	constructor(config: AxiosRequestConfig) {
		// 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
		this.instance = axios.create(Object.assign(Request.baseConfig, config));
		this.instance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				// 一般会请求拦截里面加token，用于后端的验证
				this.showLoading(); // 请求发起前显示加载状态
				const token = localStorage.getItem('user_token') as string;
				if (token) {
					const temp = { ...config };
					temp.headers!.Authorization = token;
					return temp;
				}
				return config;
			},
			(err: AxiosError): Promise<AxiosResponse> => {
				// 请求错误，这里可以用全局提示框进行提示
				this.showLoading(); // 请求发起前显示加载状态
				showMessage('请求错误', EMessageType.error);
				return Promise.reject(err);
			},
		);
		this.instance.interceptors.response.use(
			(res: AxiosResponse) => {
				this.hideLoading(); // 请求错误时隐藏加载状态
				// 直接返回res，当然你也可以只返回res.data
				// 系统如果有自定义code也可以在这里处理
				// 判断是否授权
				if (res.headers.authorization) {
					localStorage.setItem('user_token', res.headers.authorization);
				} else if (res.data.token) {
					localStorage.setItem('user_token', res.data.token);
				}
				return res;
			},
			(err: AxiosError): Promise<AxiosResponse> => {
				this.hideLoading(); // 请求错误时隐藏加载状态
				// 这里用来处理http常见错误，进行全局提示
				const status: number | null = err.response?.status || null;
				const message: string = getInfoWithCode(status) || err.message;
				if (status === 401) {
					showMessage(message, 'error', 2, () => {
						removeToken();
						const dynamicPartRegex = /\/\/[^/]+\/(.*)/; // 匹配第一个斜杠后的所有部分
						const dynamicPartMatch = window.location.href.match(dynamicPartRegex);
						if (dynamicPartMatch && dynamicPartMatch[1]) {
							window.location.href = window.location.href.replace(dynamicPartMatch[1], 'user/login'); // 执行页面导航操作
						}
					});
				}
				return Promise.reject(Object.assign(err, { message }));
			},
		);
	}

	private showLoading = () => {
		if (this.isLoading === 0) {
			// 显示加载中
			GlobalLoading.showLoading();
		}
		this.isLoading += 1;
	};

	private hideLoading = () => {
		this.isLoading -= 1;
		if (this.isLoading === 0) {
			// 隐藏加载中
			GlobalLoading.hideLoading();
		}
	};

	public get<T = never>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.get(url, config);
	}

	public post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.post<T>(url, data, config);
	}

	public put<T = never>(url: string, data?: never, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.put(url, data, config);
	}

	public delete<T = never>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.delete(url, config);
	}

	// 可用用来发送其他请求，如patch
	public request<T = never>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.instance.request(config);
	}
}

const request: Request = new Request({});
// 默认导出Request实例
export default request;
