const path = require('path');// 路径
const HtmlWebpackPlugin = require('html-webpack-plugin');//  生成HTML文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// css压缩
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 打包清理,删除dist目录
const dotenv = require('dotenv');
const projectRoot = process.cwd();
// 解析env配置文件，设置环境变量
try {
	dotenv.config({ path: 'base.env' }); // 加载 .env 文件
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
				include: path.resolve(projectRoot, 'src'),
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /.js$/,
				include: path.resolve(projectRoot, 'src'),
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss|css$/i,
				include: path.resolve(projectRoot, 'src'),
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				include: path.resolve(projectRoot, 'src'),
				exclude: /node_modules/,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				type: 'asset/resource',
				include: path.resolve(projectRoot, 'src'),
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
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
				/* istanbul ignore if  */
				if (
					stats.compilation.errors &&
					stats.compilation.errors.length &&
					process.argv.indexOf('--watch') === -1
				) {
					console.error(stats.compilation.errors); //eslint-disable-line
					process.exit(2);
				}
			});
		},
	],
	stats: 'errors-only',
};
