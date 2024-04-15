import React from 'react';
import { Layout, Menu, theme, Button } from 'antd';
import { Outlet } from 'react-router-dom';
import ToggleTheme from 'src/component/ToggleThem';
import { getMenus } from 'src/hooks';
import { removeToken } from 'src/utils';

const { Header, Content, Sider } = Layout;
const App: React.FC = () => {
	const { token } = theme.useToken();
	const [menus, defaultKey, navigateTo] = getMenus();
	const { colorBgContainer, borderRadiusLG } = token;
	const loginOut = () => {
		removeToken();
		navigateTo('/user/login');
	};
	return (
		<Layout className="h-full">
			<Header
				style={{
					display: 'flex',
					background: colorBgContainer,
					alignItems: 'center',
				}}
			>
				<div className="demo-logo dark:text-gray-300 font-bold text-4xl">LOGO</div>
				{/* <Menu mode="horizontal" defaultSelectedKeys={['2']} items={items1} style={{ flex: 1, minWidth: 0 }}
				 /> */}
				<div className="right flex-1 text-right">
					{menus[0].needAuth && <Button onClick={() => loginOut()}>退出</Button>}
					<ToggleTheme />
				</div>
			</Header>
			<Layout>
				<Sider width={200} style={{ background: colorBgContainer }}>
					<Menu
						mode="inline"
						selectedKeys={[defaultKey]}
						onClick={({ key }) => navigateTo(key)}
						style={{ height: '100%', borderRight: 0 }}
						items={menus}
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
