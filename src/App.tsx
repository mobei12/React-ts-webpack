import { FC } from 'react';
import './App.scss';
import { useRoutes } from 'react-router-dom';
import useGuard from './router/routesConfig';

const App: FC = () => {
	return <div className="App bg-gray-700 h-full">{useRoutes(useGuard())}</div>;
};
export default App;
