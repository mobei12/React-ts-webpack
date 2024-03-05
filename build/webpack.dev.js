const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
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
