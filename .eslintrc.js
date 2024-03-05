module.exports = {
	env: {
		browser: true, // 浏览器端
		commonjs: true, // 支持CJS
		es2021: true, // 支持ES2021及之前的所有语法
	},
	extends: ['eslint:recommended', 'eslint-config-airbnb-base', 'plugin:@typescript-eslint/recommended'], // Airbnb的校验规则
	parser: '@typescript-eslint/parser',
	plugins: ['eslint-plugin-import', '@typescript-eslint'],
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	settings: {
		'import/extensions': ['.js', '.jsx', '.tsx', '.ts'],
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.tsx', '.ts'],
			},
			alias: {
				map: [['src', './src']],
				extensions: ['.js', '.jsx', '.tsx', '.ts'],
			},
		},
	},
	rules: {
		semi: 'off', // 语句强制分号结尾
		'no-extra-semi': 2, // 禁止多余的分号
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: ['error', 'tab', { SwitchCase: 1 }], // 使用tab进
		eqeqeq: ['error', 'smart'], // 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
		'arrow-parens': ['error', 'always'], // 箭头函数参数的括号按需
		quotes: ['error', 'single'],
		'arrow-body-style': ['error', 'always'],
		'object-curly-newline': ['error', { multiline: true }],
		'implicit-arrow-linebreak': ['error', 'below'],
		'max-len': [
			'error',
			{
				code: 120,
				ignoreComments: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
			},
		],
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'comma-dangle': 'off',
	},
};
