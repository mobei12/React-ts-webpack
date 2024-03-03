import { FC,  useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { userHook } from "src/hooks/index";
import { showMessage, EMessageType } from "src/utils";

const Login: FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const { login } = userHook;
	const [loadings, setLoadings] = useState<boolean>(false);
	const onFinish = async (values: { username: string, password: string }) => {
		setLoadings(true);
		const {
			code, message, token,
		} = await login(values);
		if (code === 200) {
			if (token) {
				localStorage.setItem("user_token", token);
				localStorage.setItem("user", JSON.stringify({ name: values.username }));
				showMessage("登录成功", EMessageType.success,2,()=>{
					navigate("/home")
				});

			} else {
				showMessage(message!, EMessageType.warning);
			}
		} else {
			showMessage(message!, EMessageType.warning);
		}
		setLoadings(false);
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
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
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
