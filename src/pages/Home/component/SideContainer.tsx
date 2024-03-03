import { FC, Key, ReactElement, ReactNode } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ExtendedRouteObject } from "src/router/type";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
type MenuItemClick = MenuProps["onClick"];

function getItem(label: ReactNode, key: Key, icon?: ReactNode, children?: MenuItem[]): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

interface IProps {
	pages: ExtendedRouteObject[];
}

const SideContainer: FC<IProps> = ({ pages }): ReactElement => {
	//const userRole = JSON.parse(localStorage.getItem("user") || "{}").role;
	const items: MenuItem[] = [];
	pages.forEach(({ title, path, role }) => {
		/*if (role && role.includes(userRole)) {
			items.push(getItem(title, path!));
		}*/
		items.push(getItem(title, path!));
	});
	const navigate = useNavigate();
	const location = useLocation();
	const defaultSelectedKeys = [location.pathname.split("/")[2]] || ["PageTemplate"];
	const menuIClick: MenuItemClick = (e) => {
		const { key } = e;
		if (key !== location.pathname.split("/")[2]) {
		}
		navigate(`/home/${key}`);
	};
	return (
		<Sider breakpoint="lg" collapsedWidth="0">
			<div className="logo-container">这里是title</div>
			<Menu
				theme="dark"
				onClick={menuIClick}
				defaultSelectedKeys={defaultSelectedKeys}
				mode="inline"
				items={items}
			/>
		</Sider>
	);
};
export default SideContainer;
