import {Button, Result} from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => {
	const goBack = (): void => {
		window.history.back();
	}
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button type="primary" onClick={goBack}>
					返回
				</Button>
			}
		/>
	)
};

export default NoFoundPage;
