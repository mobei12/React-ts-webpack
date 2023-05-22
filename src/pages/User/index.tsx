import {FC, ReactElement} from "react"
import {Outlet} from "react-router-dom"
import './index.scss'

const User: FC = (): ReactElement => {
	return (
		<div className='user-main'>
			<div className="user-container">
				<div className="title">排水网络知识图谱风险分析平台后台管理系统</div>
				<Outlet/>
			</div>
		</div>
	)
}
export default User