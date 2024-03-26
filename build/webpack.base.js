const path = require('path');// 路径
const HtmlWebpackPlugin = require('html-webpack-plugin');//  生成HTML文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// css压缩
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 打包清理,删除dist目录
// 获取环境变量，projectRoot当前目录
const projectRoot = process.cwd();
const shared = {
	include: path.resolve(projectRoot, 'src'),
	exclude: /node_modules/,
};
// 解析env配置文件，设置环境变量

module.exports = {
	entry: `${projectRoot}/src/index.tsx`,
	cache: {
		type: 'filesystem',// 使用文件缓存
	},
	output: {
		filename: '[name].[chunkhash:8].js', // 打包后的文件名称
		path: path.resolve(projectRoot, './dist'), // 打包后的目录
		clean: true,
		publicPath: '/',
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
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
