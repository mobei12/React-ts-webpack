import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import './App.scss';
import useGuard from './router/routesConfig';

const App: FC = () => {
	return <div className="App bg-gray-700 h-full">{useRoutes(useGuard())}</div>;
};
export default App;
