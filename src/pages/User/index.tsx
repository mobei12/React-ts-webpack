import {FC, ReactElement} from "react"
import {Outlet} from "react-router-dom"
import './index.scss'

const User: FC = (): ReactElement => {
	return (
		<div className='user-main'>
			<div className="user-container">
				<div className="title">登录</div>
				<Outlet/>
			</div>
		</div>
	)
}
export default User
