module.exports = {
	env: {
	  browser: true, // 浏览器端
	  commonjs: true, // 支持CJS
	  es2021: true, // 支持ES2021及之前的所有语法
	},
	extends: [
	  'eslint:recommended',
	  'airbnb-base',
	  'plugin:@typescript-eslint/recommended',
	  'plugin:prettier/recommended', // 使用 Prettier 来自动格式化代码
	  'prettier', // 使用 Prettier 来自动格式化代码
	],
	parser: '@babel/eslint-parser',
	plugins: ['import', '@typescript-eslint', 'prettier'],
	overrides: [
	  {
		files: ['*.ts', '*.tsx'],
		parser: '@typescript-eslint/parser',
	  },
	],
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
		node: { extensions: ['.js', '.jsx', '.tsx', '.ts'] },
		alias: {
		  map: [['src', './src']],
		  extensions: ['.js', '.jsx', '.tsx', '.ts'],
		},
	  },
	},
	rules: {
	  // 添加你的规则
	  'no-extra-semi': 'error', // 禁止多余的分号
	  'no-tabs': ['error', { allowIndentationTabs: true }],
	  indent: ['error', 'tab', { SwitchCase: 1 }], // 使用tab缩进
	  eqeqeq: ['error', 'smart'], // 强制使用 === 和 !==
	  'arrow-parens': ['error', 'always'], // 强制箭头函数参数使用括号
	  quotes: ['error', 'single'], // 强制使用单引号
	  'arrow-body-style': 'off', // 关闭箭头函数体必须使用大括号的规则
	  'object-curly-newline': ['error', { multiline: true }], // 多行对象大括号换行
	  'implicit-arrow-linebreak': 'off', // 关闭隐式箭头函数体的换行规则
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
	  'comma-dangle': 'off', // 关闭逗号结尾规则
	  'linebreak-style': 'off', // 关闭换行风格规则
	  'object-curly-spacing': 'off', // 关闭对象大括号内的空格规则
	  'no-shadow': 'off', // 关闭变量声明遮蔽检查
	  'default-param-last': 'off', // 关闭默认参数在最后的规则
	  'prettier/prettier': ['error'], // 启用 Prettier 规则
	},
  };
  