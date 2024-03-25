import { Outlet } from 'react-router-dom';

function Layout() {
	return (
		<div className='layout-container h-full'>
			<Outlet />
		</div>
	);
}

export default Layout;
