import { FC } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import "./style/index.scss";
import "./index.scss";
import HeaderContainer from "./component/HeaderContainer";
import SideContainer from "./component/SideContainer";
import routesConfig from "src/router/routesConfig";
const { Content, Footer } = Layout;
const Home: FC = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout style={{ minHeight: "100vh" }} className="layout-main">
			<SideContainer pages={routesConfig[0]!.children!} />
			<Layout className="site-layout">
				<HeaderContainer />
				<Content style={{ margin: "0 16px" }}>
					<div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
						<Outlet />
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>©2024</Footer>
			</Layout>
		</Layout>
	);
};

export default Home;
