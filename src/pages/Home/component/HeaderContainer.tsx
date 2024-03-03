import { FC, memo, ReactElement } from "react";
import { Dropdown, Layout, MenuProps, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { removeToken } from "src/utils";

const { Header } = Layout;

const HeaderContainer: FC = (): ReactElement => {
	const userName = JSON.parse(localStorage.getItem("user") || "{}").name;
	const navigate = useNavigate();
	const logout = () => {
		removeToken();
		navigate("/user/login");
	};
	const dropdownMenu: MenuProps["items"] = [
		{
			key: "1",
			label: <span onClick={logout}>退出登录</span>,
		},
	];
	return (
		<Header className="header-container">
			<Dropdown menu={{ items: dropdownMenu }}>
				<span>
					<Space>
						<UserOutlined />
						{userName}
					</Space>
				</span>
			</Dropdown>
		</Header>
	);
};
export default memo(HeaderContainer);
