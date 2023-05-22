import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { ExtendedRouteObject } from "./type";
import Loading from "../component/Loading";
import User from "../pages/User";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
/*---userEnd---*/
import NotFind from "../pages/404";
import Home from "../pages/Home";

/*---HomeEnd---*/
const routesConfig: ExtendedRouteObject[] = [
	{
		path: "/home",
		auth: true,
		element: <Home />,
		children: [
			{
				path: "",
				element: <Navigate to="overflowAnalysis" replace />,
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
