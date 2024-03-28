import { useRoutes } from 'react-router-dom';
import './App.scss';
import routesWithGuard from 'src/router/routesConfig';

const App = () => {
	const routes = routesWithGuard();
	return <div className="App bg-gray-500  h-full">{useRoutes(routes)}</div>;
};
export default App;
