import { Navigate } from "react-router-dom";
import { ExtendedRouteObject } from "./type";
import User from "src/pages/User";
import Login from "src/pages/User/Login";
import Register from "src/pages/User/Register";
/*---userEnd---*/
import NotFind from "src/pages/404";
import Home from "src/pages/Home";
import PageTemplate from "src/pages/Home/PageTemplate";
/*---HomeEnd---*/

const routesConfig: ExtendedRouteObject[] = [
	{
		path: "/home",
		auth: true,
		element: <Home />,
		children: [
			{
				path: "PageTemplate",
				title: "页面模板",
				element: <PageTemplate/>,
			},
			{
				path: "",
				element: <Navigate to="PageTemplate" replace />,
			},
		],
	},
	{
		path: "/user",
		element: <User />,
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
			},
			{
				path: "",
				element: <Navigate to="login" replace />,
			},
		],
	},
	{
		path: "*",
		element: <NotFind />,
	},
];
export default routesConfig;
