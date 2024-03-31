import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

function getMenus() {
	const navigate: NavigateFunction = useNavigate();
	const { pathname: defaultKey } = useLocation();
	const menus = JSON.parse(localStorage.getItem('menus') || '[]');
	const navigateTo = (key: string) => {
		navigate(key);
	};
	return [menus, defaultKey, navigateTo];
}

export default { getMenus };
