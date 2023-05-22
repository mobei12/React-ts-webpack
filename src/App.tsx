import type { FC } from "react";
import "antd/dist/reset.css";
import "./App.css";
import Element from "./router/Element";
import routesConfig from "./router/routesConfig";

const App: FC = () => {
	return (
		<div className="App">
			<Element routesConfig={routesConfig} />
		</div>
	);
};

export default App;
