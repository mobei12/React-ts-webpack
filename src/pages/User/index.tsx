import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss';

const User: FC = () => {
	return (
		<div className="user-main bg-gray-700">
			<div className="user-container">
				<div className="title">{process.env.CUSTOMIZE_APP_TITLE}</div>
				<Outlet />
			</div>
		</div>
	);
};
export default User;
