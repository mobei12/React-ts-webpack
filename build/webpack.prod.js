const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const TerserPlugin = require('terser-webpack-plugin');
const { generateEnv } = require('./common');
//使用dll，必须在打包前先生成manifest webpack --config .\build\webpack.dll.conf.js
//const manifest = require('./dist/vendor.manifest.json');
const dotenv = require('dotenv');
const prodEnv = dotenv.config({ path: ['prod.env','base.env'], override: true });
const prodConfig = merge(baseConfig, {
	mode: 'production',
	/* cdn分离依赖包 */
	/*externals: {
	 react: 'React',
	 'react-dom': 'ReactDOM',
	 },*/
	optimization: {
		minimizer: [new TerserPlugin({//使用terser进行压缩
			minify: TerserPlugin.swcMinify,
			terserOptions: {},
		})],
		splitChunks: {
			minSize: 10, // 当文件大小小于该值时，不会生成单独的chunk文件
			cacheGroups: {
				commons: {
					// 对使用的公共文件进行抽离
					name: 'commons',
					chunks: 'all',
					minChunks: 2, // 最小公共次数1
				},
			},
		},
	},
	plugins: [
		// 生成dll
		/* new webpack.DllReferencePlugin({
			context: __dirname,
			manifest,// manifest 就是之前打包出来的 json 文件
		}), */
		/* css压缩 */
		new webpack.DefinePlugin(generateEnv(prodEnv?.parsed)),
		new CssMinimizerPlugin({
			test: /\.css$/,
		}),
	],
})
module.exports = prodConfig;
