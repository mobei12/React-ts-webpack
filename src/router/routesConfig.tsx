import { Navigate } from 'react-router-dom';

import { AuthorityManagement, Home, Login, PageTemplate, Register, ToDoList, Welcome, NotFind, User } from './page';
import { ExtendedRouteObject } from './type';
import { elementSuspenseWrapper } from './Tool';

const routConfig: ExtendedRouteObject[] = [
	{
		path: '/home',
		element: elementSuspenseWrapper(Home),
		needAuth: false,
		children: [
			{
				path: 'Welcome',
				title: '欢迎页面',
				element: <Welcome />,
			},
			{
				path: 'PageTemplate',
				title: '模板页面',
				element: <PageTemplate />,
			},
			{
				path: 'ToDoList',
				title: 'ToDoList',
				element: <ToDoList />,
			},
			{
				path: 'UserManagement',
				title: '用户管理',
				children: [
					{
						title: '用户权限管理',
						path: 'AuthorityManagement',
						element: <AuthorityManagement />,
					},
				],
			},
			{
				path: '',
				title: 'AuthorityManagement',
				element: <Navigate to="Welcome" replace />,
			},
		],
	},
	{
		path: '/user',
		element: elementSuspenseWrapper(User),
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
			{
				path: '',
				element: <Navigate to="login" replace />,
			},
		],
	},
	{
		path: '*',
		element: elementSuspenseWrapper(NotFind),
	},
];
export default routConfig;
