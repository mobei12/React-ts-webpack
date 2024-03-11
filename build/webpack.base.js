const path = require('path');// 路径
const webpack = require('webpack');
//const WebpackBar  = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');//  生成HTML文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// css压缩
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 打包清理,删除dist目录
const dotenv = require('dotenv');
// 获取环境变量，projectRoot当前目录
const projectRoot = process.cwd();
const shared = {
	include: path.resolve(projectRoot, 'src'),
	exclude: /node_modules/,
};
// 解析env配置文件，设置环境变量
try {
	dotenv.config({ path: 'base.env' }); // 加载 .env 文件
	if (process.env.NODE_ENV === 'development') {
		dotenv.config({ path: 'dev.env' });
	} else {
		dotenv.config({ path: 'prod.env' });
	}
} catch (error) {
	throw new Error(`读取环境变量文件失败${error}`);
}
module.exports = {
	entry: `${projectRoot}/src/index.tsx`,
	cache: {
		type: 'filesystem',// 使用文件缓存
	},
	output: {
		filename: '[name].[chunkhash:8].js', // 打包后的文件名称
		path: path.resolve(projectRoot, './dist'), // 打包后的目录
		clean: true,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			src: path.resolve(projectRoot, 'src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
				...shared,
			},
			{
				test: /.js$/,
				use: 'babel-loader',
				...shared,
				issuer: /\.[tj]sx?$/,
			},
			{
				test: /\.s[ac]ss|css$/i,
				...shared,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				issuer: /\.[tj]sx?$/,
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				...shared,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				type: 'asset/resource',
				...shared,
			},
		],
	},
	plugins: [
		//new WebpackBar(),
		/* 根据模板生成HTML文件，模板可不传 */
		new HtmlWebpackPlugin({
			template: `${projectRoot}/public/index.html`,
		}),
		/* css 文件合并  */
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:8].css',
		}),
		// 定义环境变量,在项目文件中使用
		new webpack.DefinePlugin({
			'process.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL),
			'process.env.MODE': JSON.stringify(process.env.MODE),
		}),
		new CleanWebpackPlugin(),
		function errorPlugin() {
			// 打包错误提示
			this.hooks.done.tap('done', stats => {
				/* 打包错误  */
				if (
					stats.compilation.errors &&
					stats.compilation.errors.length &&
					process.argv.indexOf('--watch') === -1
				) {
					console.error(stats.compilation.errors); // 错误信息
					process.exit(2);
				}
			});
		},
	],
	stats: 'errors-only',
};
