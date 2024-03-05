import { Outlet } from 'react-router-dom';

function Layout() {
	return (
		<div className='layout-container'>
			<Outlet />
		</div>
	);
}

export default Layout;