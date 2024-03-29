/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'selector',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			screens: {
				sm: '480px',
				md: '768px',
				lg: '976px',
				xl: '1440px',
				xxl: '1920px',
			},
			extend: {
				spacing: {
					128: '32rem',
					144: '36rem',
				},
				borderRadius: { '4xl': '2rem' },
			},
		},
	},
	plugins: [],
};
