// import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'src/context/Theme';
import App from './App';
import './index.scss';

document.title = process.env.CUSTOMIZE_APP_TITLE || 'My App - Development';
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	// <StrictMode>
	<BrowserRouter>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</BrowserRouter>,
	// </StrictMode>
);
