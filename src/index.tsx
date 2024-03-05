// import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	// <StrictMode>
	<HashRouter>
		<App />
	</HashRouter>,
	// </StrictMode>
);
