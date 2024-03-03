module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
		},
		sourceType: "module",
	},
	plugins: [],
	rules: {
		semi: [2, "always"], //语句强制分号结尾
		"no-extra-semi": 2, //禁止多余的分号
		indent: ["error", 4], //使用4个空格进行缩进
		eqeqeq: ["error", "smart"], //必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
	},
};
