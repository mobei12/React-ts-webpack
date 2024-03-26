import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';

function Layout() {
	const navigate: NavigateFunction = useNavigate();
	const loginOut = () => {
		localStorage.clear();
		navigate('/user/login');
	};
	return (
		<div className="layout-container h-full">
			<button type="button" onClick={() => loginOut()}>
				退出
			</button>
			<Outlet />
		</div>
	);
}

export default Layout;
