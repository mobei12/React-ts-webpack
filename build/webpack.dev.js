const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const dotenv = require('dotenv');
try {
	dotenv.config({ path: 'dev.env' }); // 加载 .env 文件
} catch (error) {
	throw new Error(`读取环境变量文件失败${error}`);
}
const defConfig = merge(baseConfig, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		proxy: [
			{
				context: ['/api', '/aa'],//代理
				target: process.env.TEST_SERVER_URL,
				changeOrigin: true,
				pathRewrite: { '^/api': '/api' },
			},
		],
	},
});
module.exports = defConfig;
