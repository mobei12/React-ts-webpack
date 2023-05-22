import {Breadcrumb} from "antd";
import {FC, ReactElement} from "react";

interface IProps {
	Breadcrumbs: {
		key: string
		title: string
	}[]
}

const BreadcrumbContainer: FC<IProps> = ({Breadcrumbs}): ReactElement => {
	return <Breadcrumb items={Breadcrumbs} style={{margin: '16px 0'}}/>
}
export default BreadcrumbContainer