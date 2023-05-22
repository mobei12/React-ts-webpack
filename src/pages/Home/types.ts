export interface IFormsData {
	name: string;
	label: string;
	component:
		| "Input"
		| "InputNumber"
		| "switch"
		| "datePicker"
		| "textArea"
		| "InputNumberLng"
		| "InputNumberLat"
		| "select"
		| "radio";
	required: boolean;
	options?: { label: string; value: string }[];
	rules?: any;
}

export type TPagination = {
	total: number;
	current: number;
	pageSize: number;
};

export interface IRowConfig<T> {
	title: string;
	key: T;
	component: IFormsData["component"] | boolean;
	rules?: any;
	options?: { label: string; value: string }[];
	required?: boolean;
}

export type TypeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
