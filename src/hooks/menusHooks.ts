import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

export const getMenus = () => {
	const navigate: NavigateFunction = useNavigate();
	const { pathname: defaultKey } = useLocation();
	const menus = JSON.parse(localStorage.getItem('menus') || '[]');
	const navigateTo = (key: string) => {
		navigate(key);
	};
	return [menus, defaultKey, navigateTo];
}
// no use
export const filterMenus = (condition: (item: (item: never) => never) => boolean) => {
	const navigate: NavigateFunction = useNavigate();
	const { pathname: defaultKey } = useLocation();
	const menus = JSON.parse(localStorage.getItem('menus') || '[]').map(condition((item: never) => item));
	const navigateTo = (key: string) => {
		navigate(key);
	};
	return [menus, defaultKey, navigateTo];
};
