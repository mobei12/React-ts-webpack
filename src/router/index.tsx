import { ExtendedRouteObject } from 'src/router/type';
import { cacheUserInfo } from 'src/utils';
import { MenuProps } from 'antd';
import { Navigate } from 'react-router-dom';

/**
 * @description根据给定的 HTTP 状态码获取相应的错误消息。
 */
const generateMenu = (source: ExtendedRouteObject[] | undefined, FPath: string): MenuProps['items'] => {
	const arr: MenuProps['items'] = [];
	if (Array.isArray(source) && source.length) {
		source.forEach(({ path, title, children }) => {
			if (path) {
				arr.push({
					key: `${FPath}/${path}`,
					label: title,
					children: children && generateMenu(children, `${FPath}/${path}`),
				});
			}
		});
	}
	return arr;
};
export default function routesWithGuard(routConfig: ExtendedRouteObject[]): ExtendedRouteObject[] {
	const isLogin = !!cacheUserInfo();
	let menus = JSON.parse(localStorage.getItem('menus') || '[]');
	if ((isLogin && menus.length === 0) || (!routConfig[0].needAuth && menus.length === 0)) {
		menus = generateMenu(routConfig[0].children, '/home');
		localStorage.setItem('menus', JSON.stringify(menus));
	}
	return routConfig.map((item) => {
		if (!isLogin && item.needAuth && item.path === '/home') {
			return {
				...item,
				element: <Navigate to="/user/login" />,
			};
		}
		return item;
	});
}
