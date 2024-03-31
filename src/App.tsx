import { useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { useRoutes } from 'react-router-dom';
import routesWithGuard from 'src/router';
import routConfig from 'src/router/routesConfig';
import { ETheme, useTheme } from 'src/context/Theme';
import { Tools } from 'src/utils';
import './App.scss';

const Temp = () => {
	const routes = routesWithGuard(routConfig);
	return <div className="App dark:bg-gray-500 dark:text-white bg-gray-300  h-full">{useRoutes(routes)}</div>;
};
const App = () => {
	const { theme: currentTheme, toggleTheme } = useTheme();
	useEffect(() => {
		const localTheme = Tools.setTheme();
		if (localTheme) {
			toggleTheme(localTheme as ETheme);
		}
	}, [toggleTheme]);
	return (
		<ConfigProvider
			theme={{ algorithm: currentTheme === ETheme.LIGHT ? theme.defaultAlgorithm : theme.darkAlgorithm }}
		>
			<Temp />
		</ConfigProvider>
	);
};
export default App;
