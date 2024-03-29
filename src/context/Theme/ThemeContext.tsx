import React, { createContext } from 'react';

export enum ETheme {
	LIGHT = 'light',
	DARK = 'dark',
}

type ThemeContextProps = {
	theme: ETheme;
	toggleTheme: (prop: ETheme) => void;
};
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
/**
 * 创建一个主题提供者组件，将其包裹的子组件包裹在一个主题上下文中。
 *
 * @param {Object} props - 组件的属性。
 * @param {React.ReactNode} props.children - 需要被包裹在主题提供者中的子组件。
 * @return {JSX.Element} 主题提供者组件。
 */
const ThemeProvider = (props: { children: React.ReactNode }): JSX.Element => {
	const [theme, setTheme] = React.useState<ETheme>(ETheme.LIGHT);
	const toggleTheme = (prop: ETheme) => {
		setTheme(prop);
	};
	const value: ThemeContextProps = {
		toggleTheme,
		theme,
	};
	return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
};
export default ThemeProvider;
