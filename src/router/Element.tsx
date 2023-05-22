import Guard from "./Guard";
import { useRoutes } from "react-router-dom";
import { ExtendedRouteObject } from "./type";

export default function Element({ routesConfig }: { routesConfig: ExtendedRouteObject[] }) {
	const guard = new Guard(routesConfig);
	const reactRoutes = guard.transformRoutes();
	return useRoutes(reactRoutes);
}
