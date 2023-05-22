import { FC } from "react";
import { Layout, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import "./style/index.scss";
import "./index.scss";
import HeaderContainer from "./component/HeaderContainer";
import SideContainer from "./component/SideContainer";
import routesConfig from "../../router/routesConfig";
const { Content, Footer } = Layout;
const Home: FC = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const location = useLocation();
	const Breadcrumbs = routesConfig[0]!.children!.filter((item) => item.path === location.pathname.split("/")[2])!;
	return (
		<Layout style={{ minHeight: "100vh" }} className="layout-main">
			<SideContainer pages={routesConfig[0]!.children!} />
			<Layout className="site-layout">
				<HeaderContainer />
				<Content style={{ margin: "0 16px" }}>
					<p style={{ margin: "16px 0", color: "rgba(0, 0, 0, 0.45)" }}>{Breadcrumbs[0].title}</p>
					<div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
						<Outlet />
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>©2023</Footer>
			</Layout>
		</Layout>
	);
};

export default Home;
