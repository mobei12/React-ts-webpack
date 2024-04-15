import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { setTheme as setLocalTheme } from 'src/utils';
import { TTheme } from 'src/utils/tools';
import { ETheme, useTheme } from 'src/context/Theme';

const ToggleTheme = () => {
	const { toggleTheme } = useTheme();
	const options = [
		{ value: 'system', label: '系统' },
		{ value: 'dark', label: '暗色' },
		{ value: 'light', label: '亮色' },
	];
	const [theme, setTheme] = useState('auto');
	useEffect(() => {
		const defaultChecked = localStorage.getItem('theme') || 'auto';
		setTheme(defaultChecked);
	}, []);
	const handleChange = (value: string) => {
		setLocalTheme(value as TTheme);
		setTheme(value);
		toggleTheme(value as ETheme);
	};
	return (
		<Select onChange={handleChange} style={{ width: 160 }} value={`主题：${theme}`} options={options} />
	);
};
export default ToggleTheme;
