import { Component, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Props<T> {
	url: string;
	loading?: ReactNode;
	error?: ReactNode;
	children: (data: T) => ReactNode;
}

interface State<T> {
	data: T;
	component: ReactNode;
}

export default class Get<T> extends Component<Props<T>, State<T>> {
	state: State<T> = {
		data: {} as T,
		component: this.props.loading || null,
	};

	async componentDidMount() {
		const { url, children, error } = this.props;
		try {
			const result: AxiosResponse<T> = await axios.get(url);
			this.setState({ data: result.data, component: children(result.data) });
		} catch (e) {
			this.setState({ component: error || 'error' });
			throw e;
		}
	}

	render() {
		return this.state.component;
	}
}
