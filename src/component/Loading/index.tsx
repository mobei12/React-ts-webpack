import { FC, ReactElement } from "react";
import { Skeleton } from "antd";

const Loading: FC = (): ReactElement => {
	return <Skeleton active />;
};
export default Loading;
