import { FC, ReactElement, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { EMessageType, showMessage } from 'src/utils';
import { register } from 'src/hooks';
import loadsh from 'lodash';

const Register: FC = (): ReactElement => {
	const navigate = useNavigate();
	const [loadings, setLoadings] = useState<boolean>(false);
	const getRegister = async (values: { username: string; password: string }) => {
		setLoadings(true);
		const { code, message, id } = await register(values);
		if (code === 200) {
			if (id) {
				showMessage('注册成功', EMessageType.success);
				navigate('/user/login');
			} else {
				showMessage(message!, EMessageType.warning);
				setLoadings(false);
			}
		} else {
			showMessage(message!, EMessageType.error);
			setLoadings(false);
		}
	};
	const onFinish = loadsh.debounce(getRegister, 1000);
	return (
		<Form
			className=""
			name="basic"
			wrapperCol={{ span: 24 }}
			style={{ maxWidth: 600, minHeight: '300px' }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
				<Input placeholder="用户名" />
			</Form.Item>

			<Form.Item
				name="password"
				rules={[
					{ required: true, message: '请输入密码!' },
					{
						validator: (_, value) => {
							const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/;
							if (value.length < 6) {
								return Promise.reject(new Error('密码长度不能小于6位!'));
							}
							if (value.length > 20) {
								return Promise.reject(new Error('密码长度不能大于20位!'));
							}
							if (!regex.test(value)) {
								return Promise.reject(new Error('密码必须包含字母和数字!'));
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
				dependencies={['password']}
				rules={[
					{
						required: true,
						message: '请再次输入密码',
					},
					({ getFieldValue }) => {
						return {
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('两次输入密码不一致!'));
							},
						};
					},
				]}
			>
				<Input.Password placeholder="确认密码" />
			</Form.Item>
			<Form.Item wrapperCol={{ span: 24 }}>
				<Button type="primary" className="bg-blue-500" loading={loadings} htmlType="submit" block>
					注册
				</Button>
			</Form.Item>
			<Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
				<Link className="dark:text-white" to="/user/login">
					登录
				</Link>
			</Form.Item>
		</Form>
	);
};
export default Register;
