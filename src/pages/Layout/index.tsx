import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import { Button, Radio, RadioChangeEvent } from 'antd';
import { Tools } from 'src/utils';

function Layout() {
	const navigate: NavigateFunction = useNavigate();
	const loginOut = () => {
		localStorage.clear();
		navigate('/user/login');
	};
	const defaultChecked = localStorage.getItem('theme') || 'auto';
	const onChange = (e: RadioChangeEvent) => {
		Tools.setTheme(e.target.value);
	};
	return (
		<div className="layout-container h-full">
			<Button type="primary" className="bg-blue-500" onClick={() => loginOut()}>
				退出
			</Button>
			<Radio.Group onChange={onChange} defaultValue={defaultChecked}>
				<Radio value="dark">dark</Radio>
				<Radio value="light">light</Radio>
				<Radio value="auto">auto</Radio>
			</Radio.Group>
			<Outlet />
		</div>
	);
}

export default Layout;
