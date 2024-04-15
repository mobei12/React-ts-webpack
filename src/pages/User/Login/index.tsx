import { FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import loadsh from 'lodash';
import { login } from 'src/hooks';
import { EMessageType, showMessage } from 'src/utils';

const Login: FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const [loadings, setLoadings] = useState<boolean>(false);
	const getLogin = async (values: { username: string; password: string }) => {
		setLoadings(true);
		const { code, message, token } = await login(values);
		if (code === 200) {
			if (token) {
				localStorage.setItem('user_token', token);
				localStorage.setItem('user', JSON.stringify({ name: values.username }));
				showMessage('登录成功', EMessageType.success, 2, () => {
					navigate('/home');
				});
			} else {
				showMessage(message!, EMessageType.warning);
				setLoadings(false);
			}
		} else {
			showMessage(message!, EMessageType.error);
			setLoadings(false);
		}
	};
	const onFinish = loadsh.debounce(getLogin, 1000);
	return (
		<Form
			name="basic"
			wrapperCol={{ span: 24 }}
			style={{ maxWidth: 600, minHeight: '200px' }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
				<Input placeholder="用户名" />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
				<Input.Password placeholder="密码" />
			</Form.Item>
			<Form.Item wrapperCol={{ span: 24 }}>
				<Button type="primary" className="bg-blue-500" loading={loadings} htmlType="submit" block>
					登录
				</Button>
			</Form.Item>
			<Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
				<Link className="dark:text-white" to="/user/register">
					注册
				</Link>
			</Form.Item>
		</Form>
	);
};
export default Login;
