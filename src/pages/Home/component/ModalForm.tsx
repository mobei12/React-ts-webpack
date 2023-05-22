import React, { ReactElement } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Radio, Select, Switch } from "antd";

import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";

import { IFormsData } from "../types";

interface IProps<T> {
	saveData: (data: T) => void;
	dataSource: T;
	formsData: IFormsData[];
}

const formItemLayout = {
	labelCol: {
		xs: { span: 20 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 20 },
	},
};

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 22,
			offset: 0,
		},
		sm: {
			span: 20,
			offset: 8,
		},
	},
};
const ModalForm = <T extends object>({ saveData, dataSource, formsData }: IProps<T>): ReactElement => {
	const [form] = Form.useForm();
	const onFinish = (values: any) => {
		saveData(Object.assign({}, dataSource, values));
	};
	return (
		<Form
			{...formItemLayout}
			form={form}
			name="model"
			onFinish={onFinish}
			initialValues={{ ...dataSource }}
			style={{ maxWidth: 600 }}
			scrollToFirstError
		>
			{formsData.map((item, index) => {
				return (
					<Form.Item
						key={index}
						name={item.name}
						label={item.label}
						rules={
							item.rules || [
								{
									required: item.required,
									message: `请输入${item.label}!`,
								},
							]
						}
					>
						{item.component === "Input" && <Input placeholder={item.label} />}
						{item.component === "InputNumber" && <InputNumber placeholder={item.label} />}
						{item.component === "textArea" && <Input.TextArea rows={3} placeholder={item.label} />}
						{item.component === "InputNumberLng" && (
							<InputNumber step={0.1} precision={2} min={-180} max={180} placeholder={item.label} />
						)}
						{item.component === "InputNumberLat" && (
							<InputNumber step={0.1} precision={2} min={-90} max={90} placeholder={item.label} />
						)}
						{item.component === "datePicker" && (
							<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" locale={locale} />
						)}
						{item.component === "select" && item.options && <Select options={item.options} />}
						{item.component === "radio" && item.options && <Radio.Group options={item.options} />}
						{item.component === "switch" && <Switch />}
					</Form.Item>
				);
			})}
			<Form.Item {...tailFormItemLayout}>
				<Button type="primary" htmlType="submit">
					保存
				</Button>
			</Form.Item>
		</Form>
	);
};

export default ModalForm;
