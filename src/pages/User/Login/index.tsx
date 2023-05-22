import { FC, ReactElement, useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import api from "../../../api/index";
import { cacheUserInfo, showMessage } from "../../../utils";

type loginType = {
	token?: string;
	success: boolean;
	message?: string;
};
const Login: FC = (): ReactElement => {
	const navigate: NavigateFunction = useNavigate();
	const [loadings, setLoadings] = useState<boolean>(false);
	const onFinish = (values: any): void => {
		setLoadings(true);
		api.post<loginType>("/user/login", values)
			.then(
				(res): void => {
					const {
						data: { success, message = "登录成功" },
					} = res;
					if (success) {
						const isActive = cacheUserInfo();
						if (!isActive) {
							showMessage("当前用户暂未启用,请联系管理员！", "warning", 3);
							return;
						}
						showMessage(message, "success", 2, () => {
							navigate("/home/overflowAnalysis");
						});
					} else {
						showMessage(message, "error");
					}
				},
				(err) => {
					console.log(err);
				},
			)
			.finally(() => setLoadings(false));
	};
	return (
		<Form
			name="basic"
			wrapperCol={{ span: 24 }}
			style={{ maxWidth: 600, minHeight: "200px" }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item name="name" rules={[{ required: true, message: "请输入用户名!" }]}>
				<Input placeholder="用户名" />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码!" }]}>
				<Input.Password placeholder="密码" />
			</Form.Item>
			<Form.Item wrapperCol={{ span: 24 }}>
				<Button type="primary" loading={loadings} htmlType="submit" block>
					登录
				</Button>
			</Form.Item>
			<Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
				<Link to="/user/Register">注册</Link>
			</Form.Item>
		</Form>
	);
};
export default Login;
