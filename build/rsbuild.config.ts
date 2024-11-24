import path from 'path';// 路径
import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginReact } from '@rsbuild/plugin-react';
import { ProvidePlugin, DefinePlugin } from '@rspack/core';
import dotenv from 'dotenv';
import { generateEnv } from './common';
//根据当前运行的环境，动态导入环境变量
const envs = process.env.NODE_ENV === 'production' ? ['.env', '.env.prod'] : ['.env', '.env.dev'];
const devEnv = dotenv.config({ path: envs, override: true });
const projectRoot = process.cwd();
export default defineConfig({
	html:{
		favicon: 'src/assets/img/AoYeh.svg',
	},
	source: {
		entry: {
			index: 'src/index.tsx',
		},
		alias: {
			'src': path.resolve(projectRoot, 'src'),
		},
	},
	server: {//和webpack大差不差
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				pathRewrite: (path) => path.replace(/^\/api/, ''),
			},
			'/wsApi': {
				target: 'http://localhost:3000', // 将会代理到 ws://localhost:3000/rsbuild-hmr
				ws: true,
			},
		},
	},
	tools: {//使用rspack的插件，或者以前webpack的插件在这里调用
		rspack: {
			plugins: [
				new ProvidePlugin({
					process: [require.resolve('process/browser')],
				}),
				new DefinePlugin(generateEnv(devEnv.parsed ?? {}) as any),
			],
		},
	},
	plugins: [
		//官方插件调用
		pluginReact(),
		pluginBabel({
			include: 'src/**/*',
			exclude: /[\\/]node_modules[\\/]/,
		}),
		pluginSass({
			sassLoaderOptions: {
				sourceMap: true,
				additionalData: `@import "src/assets/css/theme-light.scss";`,
				sassOptions: {
					silenceDeprecations: ['import'],
				},
			},
			exclude: /[\\/]node_modules[\\/]/,
		}),
	],
});
