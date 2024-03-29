import { useRoutes } from 'react-router-dom';
import './App.scss';
import routesWithGuard from 'src/router/routesConfig';
import { useEffect } from 'react';
import { Tools } from 'src/utils';

const App = () => {
	useEffect(() => {
		Tools.setTheme();
	}, []);
	const routes = routesWithGuard();
	return <div className="App dark:bg-gray-500 dark:text-white bg-gray-300  h-full">{useRoutes(routes)}</div>;
};
export default App;
