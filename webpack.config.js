const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { FileListPlugin } = require("./plugin.js");
module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true,
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader','sass-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			src: path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		/*new FileListPlugin()*/
	],
	devServer: {
		proxy: [
			{
				context: ['/api'],//代理
				target: 'http://localhost:8000',
				changeOrigin: true,
				pathRewrite: { '^/api': '/api' },
			},
		],
	}
}
