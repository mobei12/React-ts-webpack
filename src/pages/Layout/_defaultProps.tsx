import { CrownFilled, SmileFilled } from '@ant-design/icons';

export default {
	route: {
		path: '/',
		routes: [
			{
				path: '/welcome',
				name: '欢迎',
				icon: <SmileFilled />,
				component: './Welcome',
			},
			{
				path: '/home',
				name: '信息',
				icon: <CrownFilled />,
				access: 'canAdmin',
				component: './Admin',
				routes: [
					{
						path: '/home/PageTemplate',
						name: 'PageTemplate',
						icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
						component: './PageTemplate',
					},
					{
						path: '/home/ToDoList',
						name: 'ToDoList',
						icon: <CrownFilled />,
						component: './ToDoList',
					},
				],
			},
		],
	},
	location: { pathname: '/' },
};
