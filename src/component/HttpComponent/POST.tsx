import { Component, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Props<T> {
	url: string;
	condition: unknown;
	loading?: ReactNode;
	children: (data: T) => ReactNode;
	dataOperate: (data: T) => T;
	error?: ReactNode;
}

interface State<T> {
	data: T;
	component: ReactNode;
}

export default class POST<T> extends Component<Props<T>, State<T>> {
	state: State<T> = {
		data: {} as T,
		component: this.props.loading || '',
	};

	async componentDidMount() {
		const { url, error, condition, children, dataOperate } = this.props;
		try {
			const result: AxiosResponse<T> = await axios.post(url, condition);
			const processedData: T = dataOperate(result.data);
			this.setState({
				data: processedData,
				component: children(processedData),
			});
		} catch (e) {
			this.setState({ component: error || 'error' });
			throw e;
		}
	}

	render() {
		return this.state.component;
	}
}
