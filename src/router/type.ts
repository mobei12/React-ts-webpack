import { RouteObject } from 'react-router-dom';

export interface FunctionalImportType {
	(): never;
}

export type ReactElementType = JSX.Element;
export type roleType = 'admin' | 'user'; // 角色
export type ExtendedRouteObject = RouteObject & {
	needAuth?: boolean;
	component?: FunctionalImportType; // import()懒加载方式引入的组件
	children?: ExtendedRouteObject[];
	element?: ReactElementType;
	role?: roleType[]; //
	title?: string;
}
