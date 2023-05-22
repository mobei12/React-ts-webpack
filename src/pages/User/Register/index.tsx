import { FC, ReactElement } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api";
import { showMessage } from "../../../utils";

const Register: FC = (): ReactElement => {
	const navigate = useNavigate();
	const onFinish = (data: any) => {
		api.post("/user/register", data).then(
			() => {
				showMessage("注册成功", "success", 2, () => {
					navigate("/user/login", { replace: true });
				});
			},
			(msg) => {
				const {
					data: { message },
				} = msg;
				showMessage(message, "error", 2);
			},
		);
	};
	return (
		<Form
			name="basic"
			wrapperCol={{ span: 24 }}
			style={{ maxWidth: 600, minHeight: "300px" }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item name="name" rules={[{ required: true, message: "请输入用户名!" }]}>
				<Input placeholder="用户名" />
			</Form.Item>

			<Form.Item
				name="password"
				rules={[
					{ required: true, message: "请输入密码!" },
					{
						validator: (_, value) => {
							const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/;
							if (value.length < 6) {
								return Promise.reject(new Error("密码长度不能小于6位!"));
							}
							if (value.length > 20) {
								return Promise.reject(new Error("密码长度不能大于20位!"));
							}
							if (!regex.test(value)) {
								return Promise.reject(new Error("密码必须包含字母和数字!"));
							}
							return Promise.resolve();
						},
					},
				]}
			>
				<Input.Password placeholder="密码" />
			</Form.Item>
			<Form.Item
				name="confirmPassword"
				dependencies={["password"]}
				rules={[
					{
						required: true,
						message: "请再次输入密码",
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("两次输入密码不一致!"));
						},
					}),
				]}
			>
				<Input.Password placeholder="确认密码" />
			</Form.Item>
			<Form.Item wrapperCol={{ span: 24 }}>
				<Button type="primary" htmlType="submit" block>
					注册
				</Button>
			</Form.Item>
			<Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
				<Link to="/user/login">登录</Link>
			</Form.Item>
		</Form>
	);
};
export default Register;
