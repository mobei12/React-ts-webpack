import React from 'react';
import { Navigate } from 'react-router-dom';

import User from 'src/pages/User';
import Login from 'src/pages/User/Login';
import Register from 'src/pages/User/Register';

import NotFind from 'src/pages/404';
import Home from 'src/pages/Layout';
import PageTemplate from 'src/pages/Layout/PageTemplate';
import ToDoList from 'src/pages/Layout/ToDoList';
import Welcome from 'src/pages/Layout/Welcome';
import AuthorityManagement from 'src/pages/Layout/UserManagement/AuthorityManagement';
import { ExtendedRouteObject } from './type';

/* ---HomeEnd---*/
const routConfig: ExtendedRouteObject[] = [
	{
		path: '/home',
		element: <Home />,
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
		element: <User />,
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
		element: <NotFind />,
	},
];
export default routConfig;
