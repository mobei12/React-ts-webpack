import { ExtendedRouteObject, ReactElementType, roleType } from "./type";
import { Navigate } from "react-router-dom";

export default class Guard {
	routes: ExtendedRouteObject[];
	role: roleType;

	constructor(routes: ExtendedRouteObject[]) {
		this.routes = routes;
		this.role = JSON.parse(localStorage.getItem("user") || "{}").role;
	}

	transformRoutes(routes = this.routes): ExtendedRouteObject[] {
		const routesMap: ExtendedRouteObject[] = [];
		for (let j = 0; j < routes.length; j++) {
			const temp: ExtendedRouteObject = { ...routes[j] };
			if (this.role && temp.role && !temp.role.includes(this.role)) {
				delete temp.role;
				continue;
			}
			if (temp.auth) {
				temp.element = this.checkAuth(temp.element!);
				delete temp.auth;
			}
			if (temp.children) {
				temp.children = this.transformRoutes(temp.children);
			}
			routesMap.push(temp);
		}
		return routesMap;
	}

	checkAuth(element: ReactElementType): ReactElementType {
		const isAuthenticated = localStorage.getItem("user_token");
		if (isAuthenticated) {
			return element;
		} else {
			return <Navigate to="/user/login" replace />;
		}
	}
}
