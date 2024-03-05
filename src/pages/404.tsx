import { Button, Result } from 'antd';
import { FC } from 'react';

const NoFoundPage: FC = () => {
	const goBack = (): void => {
		window.history.back();
	};
	return (
		<Result
			status="404"
			title="404啊"
			subTitle="没有找到您访问的页面"
			extra={
				<Button type="primary" onClick={goBack}>
					返回
				</Button>
			}
		/>
	);
};

export default NoFoundPage;
