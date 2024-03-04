import {
	createElement, useLayoutEffect, useRef, useState
} from 'react';

import { HashRouterProps, Router } from 'react-router-dom';
import { HashHistory } from 'history';
import hashHistory from './History';

function HashRouter({ basename, children }: HashRouterProps): JSX.Element {
	const historyRef = useRef<HashHistory>();

	if (historyRef.current == null) {
		historyRef.current = hashHistory;
	}
	const history = historyRef.current;
	const [state, setState] = useState({
		action: history!.action,
		location: history!.location,
	});
	useLayoutEffect(() =>
history!.listen(setState), [history]);

	return /* #__PURE__ */ createElement(Router, {
		basename,
		children,
		location: state.location,
		navigationType: state.action,
		navigator: history!,
	});
}

export default HashRouter;
