import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss';

const User:FC = () => {

	return (
		<div className="user-main">
			<div className="user-container">
				<div className="title">VITE_APP_TITLE</div>
				<Outlet />
			</div>
		</div>
	);
};
export default User;
