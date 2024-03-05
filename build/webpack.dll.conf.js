const path = require('path');
const webpack = require('webpack');
module.exports = {
	mode: 'production',
	entry: {
		vendor: ['react', 'react-dom'], // 将你想要打包的第三方库列在这里
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, 'dist'),
		library: '[name]_dll', // 将输出的 DLL 模块名设为全局变量
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]_dll',
			path: path.resolve(__dirname, 'dist', '[name].manifest.json'),
		}),
	],
};
