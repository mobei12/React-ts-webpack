import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import { Button, } from 'antd';
import ToggleTheme from 'src/component/ToggleThem';

function Layout() {
	const navigate: NavigateFunction = useNavigate();
	const loginOut = () => {
		localStorage.clear();
		navigate('/user/login');
	};
	return (
		<div className="layout-container h-full">
			<Button type="primary" className="bg-blue-500" onClick={() => loginOut()}>
				退出
			</Button>
			<Outlet />
			<ToggleTheme/>
		</div>
	);
}

export default Layout;
