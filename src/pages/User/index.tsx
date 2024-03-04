import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss';

const User: FC = (): ReactElement =>
	(
		<div className='user-main'>
			<div className="user-container">
				<div className="title">某某系统</div>
				<Outlet/>
			</div>
		</div>
	);
export default User;
