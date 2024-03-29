import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import ToggleTheme from 'src/component/ToggleThem';
import { Tools } from 'src/utils';

import React from 'react';
import { UserOutlined, DiffOutlined, CheckSquareOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Button } from 'antd';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
	key,
	label: `nav ${key}`,
}));
const siderMenu: MenuProps['items'] = [
	{
		key: 'subUser',
		icon: React.createElement(UserOutlined),
		label: '用户管理',
		children: [
			{
				key: 'UserManagement/AuthorityManagement',
				label: '权限管理',
			},
		],
	},
	{
		key: 'PageTemplate',
		icon: React.createElement(DiffOutlined),
		label: 'PageTemplate',
	},
	{
		key: 'ToDoList',
		icon: React.createElement(CheckSquareOutlined),
		label: 'ToDoList',
	},
];

const App: React.FC = () => {
	const navigate: NavigateFunction = useNavigate();
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const loginOut = () => {
		Tools.removeToken();
		navigate('/user/login');
	};
	const menuClick = (key: string) => {
		navigate(key);
	};
	return (
		<Layout className="h-full">
			<Header style={{ display: 'flex', alignItems: 'center' }}>
				<div className="demo-logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['2']}
					items={items1}
					style={{ flex: 1, minWidth: 0 }}
				/>
				<Button type="primary" className="bg-blue-500" onClick={() => loginOut()}>
					退出
				</Button>
				<ToggleTheme />
			</Header>
			<Layout>
				<Sider width={200} style={{ background: colorBgContainer }}>
					<Menu
						mode="inline"
						defaultSelectedKeys={['1']}
						defaultOpenKeys={['sub1']}
						onClick={({ key }) => menuClick(key)}
						style={{ height: '100%', borderRight: 0 }}
						items={siderMenu}
					/>
				</Sider>
				<Layout style={{ padding: '0 24px 24px' }}>
					<Content
						style={{
							padding: 24,
							margin: '20px 0',
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default App;
