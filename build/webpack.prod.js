const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const dotenv = require('dotenv');
const TerserPlugin = require('terser-webpack-plugin');
//使用dll，必须在打包前先生成manifest webpack --config .\build\webpack.dll.conf.js
const manifest = require('./dist/vendor.manifest.json');
dotenv.config({ path: 'prod.env' });
const { FileListPlugin } = require('../plugin.js');
module.exports = merge(baseConfig, {
	mode: 'production',
	/* cdn分离依赖包 */
	/*externals: {
	 react: 'React',
	 'react-dom': 'ReactDOM',
	 },*/
	optimization: {
		minimizer: [new TerserPlugin({
			minify: TerserPlugin.swcMinify,//需要添加yarn add --dev @swc/core
			terserOptions: {},
		})],
		splitChunks: {
			minSize: 10, // 当文件大小小于该值时，不会生成单独的chunk文件
			cacheGroups: {
				commons: {
					// 对使用的公共文件进行抽离
					name: 'commons',
					chunks: 'all',
					minChunks: 2, // 最小公共次数
				},
			},
		},
	},
	plugins: [
		// 生成dll
		new webpack.DllReferencePlugin({
			context: __dirname,
			// manifest 就是之前打包出来的 json 文件
			manifest,
		}),
		// 定义环境变量,在项目文件中使用
		new webpack.DefinePlugin({
			'process.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL),
			'process.env.MODE': JSON.stringify('production'),
		}),
		new FileListPlugin(),
		/* css压缩 */
		new CssMinimizerPlugin({
			test: /\.css$/,
		}),
	],
});
