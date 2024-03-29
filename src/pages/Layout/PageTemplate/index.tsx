import { FC, useEffect, useState } from 'react';
import './index.scss';
import { userHook } from 'src/hooks';
import { Interaction } from 'src/utils';
import { IUser } from 'src/hooks/userHook';

const PageTemplate: FC = () => {
	const { getUserList } = userHook;
	const [dataList, setDataList] = useState<IUser[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const { code, message, data } = await getUserList();
			if (code === 200) {
				setDataList(data);
			} else {
				Interaction.showMessage(message, Interaction.EMessageType.warning);
			}
		};
		fetchData();
	}, []);
	if (dataList.length === 0) {
		return <p className="page text-center">暂无数据</p>;
	}
	return (
		<div className="page">
			{dataList.map((item, i) => {
				return (
					<p key={i}>
						username: {item.username}---level: {item.level}
					</p>
				);
			})}
		</div>
	);
};
export default PageTemplate;
