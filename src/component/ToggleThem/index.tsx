import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { Tools } from 'src/utils';
import { TTheme } from 'src/utils/tools';

const ToggleTheme = () => {
	const options = [
		{ value: 'auto', label: '系统' },
		{ value: 'dark', label: '暗色' },
		{ value: 'light', label: '亮色' },
	];
	const [theme, setTheme] = useState('auto');
	useEffect(() => {
		const defaultChecked = localStorage.getItem('theme') || 'auto';
		setTheme(defaultChecked);
	}, []);
	const handleChange = (value:string) => {
		Tools.setTheme(value as TTheme);
		setTheme(value);
	};
	return (
		<Select onChange={handleChange} defaultValue="lucy" style={{ width: 120 }} value={theme} options={options} />
	);
};
export default ToggleTheme;
