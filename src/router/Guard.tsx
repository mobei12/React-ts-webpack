import { Navigate } from 'react-router-dom';
import { ExtendedRouteObject, ReactElementType, roleType } from './type';

export default class Guard {
	routes: ExtendedRouteObject[];

	role: roleType;

	constructor(routes: ExtendedRouteObject[]) {
		this.routes = routes;
		this.role = JSON.parse(localStorage.getItem('user') || '{}').role;
	}

	transformRoutes(routes = this.routes): ExtendedRouteObject[] {
		const routesMap: ExtendedRouteObject[] = [];
		routes.forEach(item => {
			const temp: ExtendedRouteObject = { ...item };
			if (this.role && temp.role && !temp.role.includes(this.role)) {
				delete temp.role;
				return;
			}
			if (temp.auth) {
				temp.element = Guard.checkAuth(temp.element!);
				delete temp.auth;
			}
			if (temp.children) {
				temp.children = this.transformRoutes(temp.children);
			}
			routesMap.push(temp);
		});
		return routesMap;
	}

	static checkAuth(element: ReactElementType): ReactElementType {
		const isAuthenticated = localStorage.getItem('user_token');
		if (isAuthenticated) {
			return element;
		}
		return <Navigate to="/user/login" replace />;
	}
}
