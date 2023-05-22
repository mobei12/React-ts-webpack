import { createElement, useLayoutEffect, useRef, useState } from "react";

import { HashRouterProps, Router } from "react-router-dom";
import hashHistory from "./History";
import { HashHistory } from "history";

export function HashRouter({ basename, children }: HashRouterProps): JSX.Element {
	let historyRef = useRef<HashHistory>();

	if (historyRef.current == null) {
		historyRef.current = hashHistory;
	}
	let history = historyRef.current;
	let [state, setState] = useState({
		action: history!.action,
		location: history!.location,
	});
	useLayoutEffect(() => history!.listen(setState), [history]);

	return /*#__PURE__*/ createElement(Router, {
		basename: basename,
		children: children,
		location: state.location,
		navigationType: state.action,
		navigator: history!,
	});
}
