const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const defConfig = merge(baseConfig, {
	mode: 'development',
	devtool: 'source-map',//开启sourceMap，方便调试
	devServer: {
		proxy: [
			{
				context: ['/api', '/aa'],//代理
				target: process.env.TEST_SERVER_URL,//在dev.env中配置
				changeOrigin: true,
				pathRewrite: { '^/api': '/api' },//根据自己后台配置
			},
		],
	},
});
module.exports = defConfig;
